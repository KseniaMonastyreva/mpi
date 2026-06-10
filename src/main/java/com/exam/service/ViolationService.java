package com.exam.service;

import com.exam.model.Violation;
import com.exam.repository.ViolationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ViolationService {

    @Autowired
    private ViolationRepository repository;

    public Violation reportViolation(Violation violation) {
        violation.setTime(LocalDateTime.now());
        return repository.save(violation);
    }

    public List<Violation> getViolationsBySession(Long sessionId) {
        return repository.findAll()
                .stream()
                .filter(v -> v.getSessionId().equals(sessionId))
                .toList();
    }
}