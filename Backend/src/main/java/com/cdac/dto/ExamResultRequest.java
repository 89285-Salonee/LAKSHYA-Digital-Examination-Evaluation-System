package com.cdac.dto;

import lombok.Getter;
import lombok.Setter;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;


@Getter
@Setter
public class ExamResultRequest {
    @NotBlank
    private String subject;

    @Min(0)
    private int score;

    @Min(1)
    private int totalQuestions;
}
