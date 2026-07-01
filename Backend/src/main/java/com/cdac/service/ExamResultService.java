package com.cdac.service;

import com.cdac.dto.ExamResultRequest;
import com.cdac.dto.ExamResultResponse;

import java.util.List;

public interface ExamResultService {

    // Save result after exam
    ExamResultResponse saveResult(String userEmail, ExamResultRequest dto);

    // Get all attempts by user
    List<ExamResultResponse> getResultsByUser(String userEmail);

    // Get attempts filtered by subject
    List<ExamResultResponse> getResultsByUserAndSubject(String userEmail, String subject);
}
