package com.exam.service;

import com.exam.model.Vote;
import com.exam.repository.VoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.List;

@Service
public class VotingService {

    @Autowired
    private VoteRepository repository;

    public Vote submitVote(Long sessionId, Vote vote) {
        vote.setSessionId(sessionId);

        // простая "анонимизация"
        String encrypted = Base64.getEncoder()
                .encodeToString(vote.getEncryptedValue().getBytes());

        vote.setEncryptedValue(encrypted);

        return repository.save(vote);
    }

    public List<Vote> getResults(Long sessionId) {
        return repository.findAll()
                .stream()
                .filter(v -> v.getSessionId().equals(sessionId))
                .toList();
    }
}