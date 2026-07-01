package com.cdac.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

/**
 * Stores the result of one exam attempt by a user.
 * One row per attempt — lets users see full history.
 */
@Entity
@Table(name = "exam_result")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ExamResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // who took the exam
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String subject;

    @Column(nullable = false)
    private int score;           // number of correct answers

    @Column(nullable = false)
    private int totalQuestions;  // total questions in that attempt

    @Column(nullable = false)
    private LocalDateTime attemptedAt;

    @PrePersist         // runs automatically before INSERT
    public void prePersist() {
        if (this.attemptedAt == null)
            this.attemptedAt = LocalDateTime.now();
    }
}
