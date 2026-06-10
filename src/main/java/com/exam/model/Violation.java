package com.exam.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "violations")
public class Violation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long sessionId;

    private Long userId;

    private String description;

    private String evidencePath;

    private LocalDateTime time;

    public Violation() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getSessionId() {
        return sessionId;
    }

    public void setSessionId(Long sessionId) {
        this.sessionId = sessionId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getEvidencePath() {
        return evidencePath;
    }

    public void setEvidencePath(String evidencePath) {
        this.evidencePath = evidencePath;
    }

    public LocalDateTime getTime() {
        return time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }
}