package com.cdac.controller;

import com.cdac.dto.ExamResultRequest;
import com.cdac.dto.ExamResultResponse;
import com.cdac.service.ExamResultService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/exam-results")
@AllArgsConstructor
public class ExamResultController {

    private final ExamResultService examResultService;

    /**
     * POST /exam-results/submit
     * Called after student finishes an exam.
     * Requires: Bearer token (student)
     */
    @PostMapping("/submit")
    public ResponseEntity<ExamResultResponse> submitResult(
            @Valid @RequestBody ExamResultRequest dto,
            Authentication authentication) {
        String email = authentication.getName();
        ExamResultResponse saved = examResultService.saveResult(email, dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    /**
     * GET /exam-results/my-history
     * Returns all past attempts for the logged-in user.
     */
    @GetMapping("/my-history")
    public ResponseEntity<List<ExamResultResponse>> getMyHistory(Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(examResultService.getResultsByUser(email));
    }

    /**
     * GET /exam-results/my-history/{subject}
     * Returns attempts for a specific subject.
     */
    @GetMapping("/my-history/{subject}")
    public ResponseEntity<List<ExamResultResponse>> getMyHistoryBySubject(
            @PathVariable String subject,
            Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(examResultService.getResultsByUserAndSubject(email, subject));
    }
}
