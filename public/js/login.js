document.addEventListener("DOMContentLoaded", function () {
  const loginFormHandler = async (e) => {
    e.preventDefault();

    const username = document.querySelector("username-login").value.trim();
    const password = document.querySelector("#password-login").value.trim();

    if (username && password) {
      const response = await fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify({
          username,
          password,
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        document.location.replace("/login");
      }
    }
  };
  document
    .querySelector(".login-form").addEventListener("submit", loginFormHandler);
});
