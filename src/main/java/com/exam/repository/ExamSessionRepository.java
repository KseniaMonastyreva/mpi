package com.exam.repository;

import com.exam.model.ExamSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExamSessionRepository extends JpaRepository<ExamSession, Long> {
}