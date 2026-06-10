const API_URL = "http://localhost:8080";

function showResult(data) {
  document.getElementById("result").textContent = JSON.stringify(data, null, 2);
}

async function request(path, method = "GET", body = null) {
  try {
    const options = {
      method: method,
      headers: {
        "Content-Type": "application/json"
      }
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(API_URL + path, options);
    const text = await response.text();

    let data;
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      data = text;
    }

    showResult({
      status: response.status,
      ok: response.ok,
      data: data
    });
  } catch (error) {
    showResult({
      error: true,
      message: error.message
    });
  }
}

/* USERS */

function createUser() {
  const body = {
    username: document.getElementById("username").value,
    password: document.getElementById("password").value,
    role: document.getElementById("role").value
  };

  request("/users/create", "POST", body);
}

function getUsers() {
  request("/users", "GET");
}

/* EXAM SESSION */

function createExam() {
  const body = {
    title: document.getElementById("examTitle").value,
    active: false
  };

  request("/exam/session/create", "POST", body);
}

function getExam() {
  const id = document.getElementById("sessionId").value;
  request(`/exam/session/${id}`, "GET");
}

function startExam() {
  const id = document.getElementById("sessionId").value;
  request(`/exam/session/start/${id}`, "POST");
}

function endExam() {
  const id = document.getElementById("sessionId").value;
  request(`/exam/session/end/${id}`, "POST");
}

/* ANSWERS */

function sendAnswer() {
  const sessionId = document.getElementById("answerSessionId").value;
  const userId = document.getElementById("answerUserId").value;

  const body = {
    sessionId: Number(sessionId),
    userId: Number(userId),
    questionId: Number(document.getElementById("questionId").value),
    text: document.getElementById("answerText").value
  };

  request(`/exam/${sessionId}/answer?userId=${userId}`, "POST", body);
}

function getAnswers() {
  const sessionId = document.getElementById("answerSessionId").value;
  request(`/exam/${sessionId}/answers`, "GET");
}

/* VIOLATIONS */

function reportViolation() {
  const body = {
    sessionId: Number(document.getElementById("violationSessionId").value),
    userId: Number(document.getElementById("violationUserId").value),
    description: document.getElementById("violationDescription").value,
    evidencePath: document.getElementById("evidencePath").value
  };

  request("/violations/report", "POST", body);
}

function getViolations() {
  const sessionId = document.getElementById("violationSessionId").value;
  request(`/violations/session/${sessionId}`, "GET");
}

/* VOTING */

function sendVote() {
  const sessionId = document.getElementById("voteSessionId").value;

  const body = {
    sessionId: Number(sessionId),
    encryptedValue: document.getElementById("encryptedValue").value
  };

  request(`/vote/${sessionId}`, "POST", body);
}

function getVoteResults() {
  const sessionId = document.getElementById("voteSessionId").value;
  request(`/vote/${sessionId}/results`, "GET");
}