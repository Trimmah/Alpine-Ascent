
$(function () {
    // Always start at the top when the website reloads
if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}
$("html").css("scroll-behavior", "auto");
window.scrollTo(0, 0);

  // Current year and browser-specific visitor counter
  $("#currentYear").text(new Date().getFullYear());

  const visits = Number(localStorage.getItem("alpineAscentVisits") || 0) + 1;
  localStorage.setItem("alpineAscentVisits", visits);
  $("#visitorCount").text(visits);

  // Restore and toggle the saved theme
  const $body = $("body");

  const savedTheme = localStorage.getItem("alpineAscentTheme");

if (savedTheme === "dark") {
    $body.addClass("dark-theme");
} else {
    $body.removeClass("dark-theme");
}

  function updateTheme() {
    const dark = $body.hasClass("dark-theme");

    $("#themeIcon").attr(
      "class",
      dark ? "bi bi-sun-fill" : "bi bi-moon-stars-fill"
    );

    $("#themeToggle").attr(
      "aria-label",
      dark ? "Switch to light theme" : "Switch to dark theme"
    );
  }

  updateTheme();

  $("#themeToggle").on("click", function () {
    $body.toggleClass("dark-theme");

    localStorage.setItem(
      "alpineAscentTheme",
      $body.hasClass("dark-theme") ? "dark" : "light"
    );

    updateTheme();
  });

  // Live date and time
  function updateClock() {
    $("#tickerDateTime").text(new Date().toLocaleString());
  }

  updateClock();
  setInterval(updateClock, 1000);

  // Reveal sections as they enter the viewport
  function revealSections() {
    $(".reveal").each(function () {
      if (this.getBoundingClientRect().top < window.innerHeight - 50) {
        $(this).addClass("is-visible");
      }
    });
  }

  // Highlight the current navigation section
  function updateNavigation() {
    let current = "home";

    $("main section[id]").each(function () {
      if (this.getBoundingClientRect().top < 150) current = this.id;
    });

    $(".site-navbar .nav-link")
      .removeClass("active")
      .filter('[data-page="' + current + '"]')
      .addClass("active");
  }

  $(window).on("scroll", function () {
    revealSections();
    updateNavigation();
  });

  revealSections();
  updateNavigation();

  // Smooth navigation and mobile menu closing
  $("[data-page]").on("click", function (event) {
    const target = document.getElementById($(this).data("page"));
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });

    const menu = document.getElementById("mainNav");

    if (menu && menu.classList.contains("show")) {
      bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }
  });

  // Destination detail modal
  $(".destination-detail").on("click", function () {
    const $button = $(this);
    const location = $button.data("location");

    $("#destinationModalTitle").text($button.data("title"));
    $("#destinationModalLocation").text(location);
    $("#destinationModalDescription").text($button.data("description"));

    $("#destinationMapLink").attr(
      "href",
      "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent(location)
    );

    bootstrap.Modal.getOrCreateInstance(
      document.getElementById("destinationModal")
    ).show();
  });

 
$(document).ready(function () {

    // Submit the contact form
    $("#contactForm").on("submit", function (event) {
        event.preventDefault();

        const name = $("#contactName").val().trim();
        const email = $("#contactEmail").val().trim();
        const subject = $("#contactSubject").val().trim();
        const message = $("#contactMessage").val().trim();

        // Clear previous feedback
        $("#formFeedback")
            .removeClass("text-success")
            .addClass("text-danger")
            .text("");

        // Validate the name
        const namePattern = /^[\p{L}][\p{L}\p{M}\s'-]*$/u;

        if (name.length < 2 || name.length > 60 ||
            !namePattern.test(name)) {
            $("#formFeedback").text(
                "Please enter a valid name using letters, spaces, apostrophes or hyphens."
            );
            $("#contactName").trigger("focus");
            return;
        }

        // Validate the email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            $("#formFeedback").text(
                "Please enter a valid email address."
            );
            $("#contactEmail").trigger("focus");
            return;
        }

        // Validate the subject
        if (subject.length < 3 || subject.length > 100) {
            $("#formFeedback").text(
                "The subject must contain between 3 and 100 characters."
            );
            $("#contactSubject").trigger("focus");
            return;
        }

        // Validate the message
        if (message.length < 10 || message.length > 1000) {
            $("#formFeedback").text(
                "Your message must contain between 10 and 1000 characters."
            );
            $("#contactMessage").trigger("focus");
            return;
        }

        // Show the success response
        $("#successMessage").text(
            "Thank you, " + name +
            "! Your response has been submitted successfully."
        );

        // Clear all four fields after successful submission
        this.reset();

        // Hide the form and show the confirmation
        $(this).prop("hidden", true);
        $("#submissionSuccess").prop("hidden", false);

        // Move the visitor's focus to the confirmation
        $("#submissionSuccess h3").attr("tabindex", "-1").trigger("focus");
    });

    // Start another submission
    $("#submitAnother").on("click", function () {
        $("#submissionSuccess").prop("hidden", true);

        $("#contactForm")
            .prop("hidden", false)
            .trigger("reset");

        $("#formFeedback").text("");

        // Return to the form
        $("#contactName").trigger("focus");
    });

    // Finish and keep the confirmation visible
    $("#finishSubmission").on("click", function () {
        $("#submissionSuccess").html(`
            <div class="success-icon">
                <i class="bi bi-check-circle-fill"></i>
            </div>
            <h3 tabindex="-1">Thank You!</h3>
            <p>
                Thank you for visiting Alpine Ascent.
                We hope you enjoy exploring the mountains!
            </p>
        `);

        $("#submissionSuccess h3").trigger("focus");
    });

});


});
