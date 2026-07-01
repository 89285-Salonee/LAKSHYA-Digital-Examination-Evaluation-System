package com.cdac.dao;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.cdac.entities.OnlineExam;

public interface OnlineExamDao extends JpaRepository<OnlineExam, Long> {

    @Query("select distinct o.subject from OnlineExam o")
    List<String> findDistinctSubject();

    List<OnlineExam> findBySubject(String subject);
}
