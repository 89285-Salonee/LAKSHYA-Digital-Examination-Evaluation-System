package com.cdac.dao;

import com.cdac.entities.ExamResult;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExamResultDao extends JpaRepository<ExamResult, Long> {

    // all attempts by a specific user (ordered newest first)
    List<ExamResult> findByUserIdOrderByAttemptedAtDesc(Long userId);

    // all attempts for a subject by a user
    List<ExamResult> findByUserIdAndSubjectOrderByAttemptedAtDesc(Long userId, String subject);
}
