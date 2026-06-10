const API_URL = "http://localhost:8080";

function sanitizeResponse(data) {
  const copy = JSON.parse(JSON.stringify(data));

  if (copy.data && copy.data.encryptedValue) {
    copy.data.encryptedValue = "[hidden]";
  }

  if (copy.encryptedValue) {
    copy.encryptedValue = "[hidden]";
  }

  if (copy.token) {
    copy.token = "[hidden]";
  }

  return copy;
}

function showResult(data) {
  const safeData = sanitizeResponse(data);
  document.getElementById("result").textContent = JSON.stringify(safeData, null, 2);
}

/* PAGE NAVIGATION */

function showPage(pageId) {
  document.querySelectorAll(".page").forEach(page => {
    page.style.display = "none";
  });

  const page = document.getElementById(pageId);

  if (page) {
    page.style.display = "block";
  }
}

/* AUTH HELPERS */

function getAuthHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + token
  };
}

function getJsonHeaders() {
  return {
    "Content-Type": "application/json"
  };
}

async function request(path, method = "GET", body = null) {
  try {
    const options = {
      method: method,
      headers: getAuthHeaders()
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

    if (response.status === 401 || response.status === 403) {
      showResult({
        status: response.status,
        ok: false,
        message: "Access denied. Сначала войдите в систему или проверьте роль пользователя."
      });
    }

  } catch (error) {
    showResult({
      error: true,
      message: error.message
    });
  }
}

/* AUTH */

async function login() {
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: getJsonHeaders(),
      body: JSON.stringify({
        username: username,
        password: password
      })
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();

    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
    localStorage.setItem("loginUsername", username);

    document.getElementById("login-status").innerText =
      `Logged in as ${username} (${data.role})`;

    showResult({
      message: "Login successful",
      username: username,
      role: data.role
    });

    showPage("page-dashboard");

  } catch (error) {
    console.error(error);

    document.getElementById("login-status").innerText =
      "Login failed. Check username/password.";

    showResult({
      error: true,
      message: "Login failed. Check username/password."
    });
  }
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("loginUsername");

  document.getElementById("login-status").innerText = "Not logged in";

  showResult({
    message: "Logged out"
  });

  showPage("page-login");
}

function updateLoginStatus() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const username = localStorage.getItem("loginUsername");

  if (token && role && username) {
    document.getElementById("login-status").innerText =
      `Logged in as ${username} (${role})`;
  } else {
    document.getElementById("login-status").innerText = "Not logged in";
  }
}

/* ROLE TEST */

async function testStudent() {
  await testRoleEndpoint("/student/test");
}

async function testExaminer() {
  await testRoleEndpoint("/examiner/test");
}

async function testAdmin() {
  await testRoleEndpoint("/admin/test");
}

async function testRoleEndpoint(path) {
  try {
    const response = await fetch(`${API_URL}${path}`, {
      method: "GET",
      headers: getAuthHeaders()
    });

    const text = await response.text();

    if (!response.ok) {
      document.getElementById("role-test-result").innerText =
        `Access denied or error: ${response.status}`;

      showResult({
        status: response.status,
        ok: response.ok,
        message: text || "Access denied"
      });

      return;
    }

    document.getElementById("role-test-result").innerText = text;

    showResult({
      status: response.status,
      ok: response.ok,
      data: text
    });
  } catch (error) {
    console.error(error);

    document.getElementById("role-test-result").innerText =
      "Request failed. Check backend connection.";

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

/* STUBS */

function showStub(featureName) {
  showResult({
    status: 501,
    ok: false,
    feature: featureName,
    message: "Not implemented. This feature is planned for the next iteration."
  });
}

/* INITIALIZATION */

document.addEventListener("DOMContentLoaded", () => {
  updateLoginStatus();

  const token = localStorage.getItem("token");

  if (token) {
    showPage("page-dashboard");
  } else {
    showPage("page-login");
  }
});