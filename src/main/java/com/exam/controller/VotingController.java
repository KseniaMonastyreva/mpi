package com.exam.controller;

import com.exam.model.Vote;
import com.exam.service.VotingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/vote")
@CrossOrigin(origins = "*")
public class VotingController {

    @Autowired
    private VotingService votingService;

    @PostMapping("/{sessionId}")
    public Vote vote(
            @PathVariable Long sessionId,
            @RequestBody Vote vote
    ) {
        return votingService.submitVote(sessionId, vote);
    }

    @GetMapping("/{sessionId}/results")
    public Object results(@PathVariable Long sessionId) {
        return votingService.getResults(sessionId);
    }
}