package com.cdac.service;

import com.cdac.custom_exceptions.NotFoundException;
import com.cdac.dao.ExamResultDao;
import com.cdac.dao.UserDao;
import com.cdac.dto.ExamResultRequest;
import com.cdac.dto.ExamResultResponse;
import com.cdac.entities.ExamResult;
import com.cdac.entities.User;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class ExamResultServiceImpl implements ExamResultService {

    private final ExamResultDao examResultDao;
    private final UserDao userDao;

    @Override
    public ExamResultResponse saveResult(String userEmail, ExamResultRequest dto) {
        User user = userDao.findByEmail(userEmail)
                .orElseThrow(() -> new NotFoundException("User not found: " + userEmail));

        ExamResult result = new ExamResult();
        result.setUser(user);
        result.setSubject(dto.getSubject());
        result.setScore(dto.getScore());
        result.setTotalQuestions(dto.getTotalQuestions());

        ExamResult saved = examResultDao.save(result);
        return toResponse(saved);
    }

    @Override
    public List<ExamResultResponse> getResultsByUser(String userEmail) {
        User user = userDao.findByEmail(userEmail)
                .orElseThrow(() -> new NotFoundException("User not found: " + userEmail));
        return examResultDao.findByUserIdOrderByAttemptedAtDesc(user.getId())
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Override
    public List<ExamResultResponse> getResultsByUserAndSubject(String userEmail, String subject) {
        User user = userDao.findByEmail(userEmail)
                .orElseThrow(() -> new NotFoundException("User not found: " + userEmail));
        return examResultDao.findByUserIdAndSubjectOrderByAttemptedAtDesc(user.getId(), subject)
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    // ── helper ──
    private ExamResultResponse toResponse(ExamResult r) {
        double pct = r.getTotalQuestions() == 0 ? 0.0
                : (double) r.getScore() / r.getTotalQuestions() * 100;
        String grade = grade(pct);
        return new ExamResultResponse(
                r.getId(), r.getSubject(), r.getScore(),
                r.getTotalQuestions(), Math.round(pct * 10.0) / 10.0,
                grade, r.getAttemptedAt()
        );
    }

    private String grade(double pct) {
        if (pct >= 90) return "A+";
        if (pct >= 75) return "A";
        if (pct >= 60) return "B";
        if (pct >= 45) return "C";
        if (pct >= 35) return "D";
        return "F";
    }
}
