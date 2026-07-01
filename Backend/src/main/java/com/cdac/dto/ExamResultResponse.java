package com.cdac.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class ExamResultResponse {
    private Long id;
    private String subject;
    private int score;
    private int totalQuestions;
    private double percentage;
    private String grade;
    private LocalDateTime attemptedAt;
}
