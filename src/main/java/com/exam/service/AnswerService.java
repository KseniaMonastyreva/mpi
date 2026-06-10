package com.exam.service;

import com.exam.model.Answer;
import com.exam.repository.AnswerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnswerService {

    @Autowired
    private AnswerRepository repository;

    public Answer saveAnswer(Long sessionId, Long userId, Answer answer) {
        answer.setSessionId(sessionId);
        answer.setUserId(userId);
        return repository.save(answer);
    }

    public Answer updateAnswer(Long sessionId, Long id, Answer updated) {
        Answer answer = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Answer not found"));

        answer.setText(updated.getText());
        return repository.save(answer);
    }

    public List<Answer> getAnswers(Long sessionId) {
        return repository.findAll()
                .stream()
                .filter(a -> a.getSessionId().equals(sessionId))
                .toList();
    }
}