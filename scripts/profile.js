document.addEventListener("DOMContentLoaded", function () {
    const editProfileBtn = document.getElementById("edit-profile-btn");
    const profileEdit = document.getElementById("profile-edit");
    const profileInfo = document.querySelector(".profile-info");
    const cancelEditBtn = document.getElementById("cancel-edit-btn");
    const editProfileForm = document.getElementById("edit-profile-form");
    const profileDropdown = document.querySelector(".profile-dropdown");

    // Открытие/закрытие бар-профиля
    window.toggleDropdown = function () {
        profileDropdown.classList.toggle("active");
    };

    // Показ формы редактирования
    editProfileBtn.addEventListener("click", function () {
        profileInfo.style.display = "none";
        profileEdit.style.display = "block";
    });

    // Отмена редактирования
    cancelEditBtn.addEventListener("click", function (e) {
        e.preventDefault();
        profileEdit.style.display = "none";
        profileInfo.style.display = "flex";
    });

    // Сохранение изменений профиля
    editProfileForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const newName = document.getElementById("name").value;
        const newEmail = document.getElementById("email").value;
        const newDescription = document.getElementById("description").value;

        document.getElementById("user-name").textContent = newName;
        document.getElementById("user-email").textContent = newEmail;
        document.getElementById("user-description").textContent = newDescription;

        profileEdit.style.display = "none";
        profileInfo.style.display = "flex";
    });
});
