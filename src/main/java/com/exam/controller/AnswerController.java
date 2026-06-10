package com.exam.controller;

import com.exam.model.Answer;
import com.exam.service.AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/exam")
@CrossOrigin(origins = "*")
public class AnswerController {

    @Autowired
    private AnswerService answerService;

    @PostMapping("/{sessionId}/answer")
    public Answer addAnswer(
            @PathVariable Long sessionId,
            @RequestParam Long userId,
            @RequestBody Answer answer
    ) {
        return answerService.saveAnswer(sessionId, userId, answer);
    }

    @PutMapping("/{sessionId}/answer/{id}")
    public Answer updateAnswer(
            @PathVariable Long sessionId,
            @PathVariable Long id,
            @RequestBody Answer answer
    ) {
        return answerService.updateAnswer(sessionId, id, answer);
    }

    @GetMapping("/{sessionId}/answers")
    public Object getAnswers(@PathVariable Long sessionId) {
        return answerService.getAnswers(sessionId);
    }
}