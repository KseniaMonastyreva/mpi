package com.exam.service;

import com.exam.model.ExamSession;
import com.exam.repository.ExamSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ExamService {

    @Autowired
    private ExamSessionRepository repository;

    public ExamSession createSession(ExamSession session) {
        session.setActive(false);
        return repository.save(session);
    }

    public ExamSession startSession(Long id) {
        ExamSession session = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Session not found"));

        session.setActive(true);
        session.setStartTime(LocalDateTime.now());

        return repository.save(session);
    }

    public ExamSession endSession(Long id) {
        ExamSession session = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Session not found"));

        session.setActive(false);
        session.setEndTime(LocalDateTime.now());

        return repository.save(session);
    }

    public ExamSession getSession(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Session not found"));
    }
}