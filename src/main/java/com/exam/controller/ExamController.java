package com.exam.controller;

import com.exam.model.ExamSession;
import com.exam.service.ExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/exam/session")
@CrossOrigin(origins = "*")
public class ExamController {

    @Autowired
    private ExamService examService;

    @PostMapping("/create")
    public ExamSession create(@RequestBody ExamSession session) {
        return examService.createSession(session);
    }

    @PostMapping("/start/{id}")
    public ExamSession start(@PathVariable Long id) {
        return examService.startSession(id);
    }

    @PostMapping("/end/{id}")
    public ExamSession end(@PathVariable Long id) {
        return examService.endSession(id);
    }

    @GetMapping("/{id}")
    public ExamSession get(@PathVariable Long id) {
        return examService.getSession(id);
    }
}