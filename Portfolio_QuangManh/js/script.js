var menuToggle = document.getElementById("menuToggle");
var navMenu = document.getElementById("navMenu");
var navLinks = document.querySelectorAll(".nav-link");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", function () {

        navMenu.classList.toggle("show");

        if (navMenu.classList.contains("show")) {
            menuToggle.innerHTML = "✕";
            menuToggle.setAttribute("aria-expanded", "true");
        } else {
            menuToggle.innerHTML = "☰";
            menuToggle.setAttribute("aria-expanded", "false");
        }

    });
    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navMenu.classList.remove("show");
            menuToggle.innerHTML = "☰";
            menuToggle.setAttribute("aria-expanded", "false");

        });

    });

}

var themeToggle = document.getElementById("themeToggle");
var savedTheme = localStorage.getItem("portfolioTheme");
if (savedTheme === "light") {

    document.body.classList.add("light-mode");

}

if (themeToggle) {

    themeToggle.innerHTML =
        document.body.classList.contains("light-mode")
            ? "☾"
            : "☀";
    themeToggle.addEventListener("click", function () {

        document.body.classList.toggle("light-mode");

        if (document.body.classList.contains("light-mode")) {

            themeToggle.innerHTML = "☾";
            localStorage.setItem("portfolioTheme", "light");

        } else {

            themeToggle.innerHTML = "☀";
            localStorage.setItem("portfolioTheme", "dark");

        }

    });

}

var sections = document.querySelectorAll("main section");

function updateActiveNavigation() {

    var currentSection = "";

    sections.forEach(function (section) {

        var sectionTop = section.offsetTop - 130;
        var sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection = section.getAttribute("id");

        }

    });

    navLinks.forEach(function (link) {

        link.classList.remove("active");

        if (
            link.getAttribute("href") === "#" + currentSection
        ) {

            link.classList.add("active");

        }

    });

}

window.addEventListener("scroll", updateActiveNavigation);

updateActiveNavigation();
var revealElements = document.querySelectorAll(
    ".section-heading, " +
    ".hero-text, " +
    ".hero-image, " +
    ".about-gallery, " +
    ".about-text, " +
    ".goal-card, " +
    ".skills-intro, " +
    ".skills-list, " +
    ".timeline-item, " +
    ".academic-achievement, " +
    ".achievement-card, " +
    ".gallery-grid img, " +
    ".interest-card, " +
    ".personal-note, " +
    ".contact-info, " +
    ".contact-form"
);
revealElements.forEach(function (element) {

    element.classList.add("reveal");

});
if ("IntersectionObserver" in window) {

    var revealObserver = new IntersectionObserver(
        function (entries, observer) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(function (element) {

        revealObserver.observe(element);

    });

} else {
    revealElements.forEach(function (element) {

        element.classList.add("show");

    });

}

var contactForm = document.getElementById("contactForm");
var formMessage = document.getElementById("formMessage");

if (contactForm && formMessage) {

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();
        var name = document.getElementById("name").value.trim();
        var email = document.getElementById("email").value.trim();
        var subject = document.getElementById("subject").value.trim();
        var message = document.getElementById("message").value.trim();
        if (
            name === "" ||
            email === "" ||
            subject === "" ||
            message === ""
        ) {

            formMessage.textContent =
                "Vui lòng nhập đầy đủ thông tin!";

            return;

        }
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            formMessage.textContent =
                "Địa chỉ email không hợp lệ!";

            return;

        }
        var emailBody =
            "Họ và tên: " + name + "\n" +
            "Email: " + email + "\n\n" +
            "Nội dung:\n" + message;
        var mailtoLink =
            "mailto:quangmanh01032006@gmail.com" +
            "?subject=" + encodeURIComponent(subject) +
            "&body=" + encodeURIComponent(emailBody);
        formMessage.textContent =
            "Thông tin hợp lệ! Đang mở ứng dụng email...";
        window.location.href = mailtoLink;

    });

}

var backToTop = document.querySelector(".back-to-top");

if (backToTop) {

    backToTop.addEventListener("click", function (event) {

        event.preventDefault();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}

var detailButtons = document.querySelectorAll(".project-detail-btn");
var projectModals = document.querySelectorAll(".project-modal");
var closeButtons = document.querySelectorAll(".project-modal-close");
function openModal(modalId) {

    var modal = document.getElementById(modalId);

    if (!modal) {
        return;
    }

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

}
function closeModal(modal) {

    if (!modal) {
        return;
    }

    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

}
detailButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        openModal(button.dataset.project);

    });

});
closeButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        var modal = button.closest(".project-modal");

        closeModal(modal);

    });

});
projectModals.forEach(function (modal) {

    modal.addEventListener("click", function (event) {

        if (event.target === modal) {

            closeModal(modal);

        }

    });

});
document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        projectModals.forEach(function (modal) {

            if (modal.classList.contains("active")) {

                closeModal(modal);

            }

        });

    }

});