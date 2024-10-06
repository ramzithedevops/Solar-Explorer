document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".auth-form form");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!validateEmail(email)) {
            alert("Введите корректный email.");
            return;
        }

        if (password.length < 6) {
            alert("Пароль должен содержать минимум 6 символов.");
            return;
        }

        const data = { email, password };

        fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = "profile.html";
            } else {
                alert(data.message || "Ошибка входа.");
            }
        })
        .catch(error => {
            console.error("Ошибка:", error);
        });
    });

    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
        return re.test(String(email).toLowerCase());
    }
});
