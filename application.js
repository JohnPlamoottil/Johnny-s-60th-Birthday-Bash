// YouTube modal logic
document.addEventListener("DOMContentLoaded", function () {
  var ytOpen = document.getElementById("youtube-modal-open");
  var ytModal = document.getElementById("youtube-modal");
  var ytClose = document.getElementById("youtube-modal-close");
  var ytIframe = document.getElementById("youtube-iframe");
  var ytUrl = "https://www.youtube.com/embed/NSkenY-fVN8?autoplay=1";
  if (ytOpen && ytModal && ytClose && ytIframe) {
    ytOpen.addEventListener("click", function (e) {
      e.preventDefault();
      ytModal.classList.add("open");
      ytIframe.src = ytUrl;
    });
    ytClose.addEventListener("click", function () {
      ytModal.classList.remove("open");
      ytIframe.src = "";
    });
    ytModal.addEventListener("click", function (e) {
      if (e.target === ytModal) {
        ytModal.classList.remove("open");
        ytIframe.src = "";
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        ytModal.classList.remove("open");
        ytIframe.src = "";
      }
    });
  }
});
// Mute/Unmute music button logic
document.addEventListener("DOMContentLoaded", function () {
  var bgMusic = document.getElementById("bg-music");
  var toggleBtn = document.getElementById("music-toggle");
  var toggleIcon = document.getElementById("music-toggle-icon");
  if (bgMusic && toggleBtn && toggleIcon) {
    var updateIcon = function () {
      toggleIcon.textContent = bgMusic.muted ? "🔇" : "🔊";
    };
    toggleBtn.addEventListener("click", function () {
      bgMusic.muted = !bgMusic.muted;
      updateIcon();
    });
    // Set initial icon
    updateIcon();
  }
});
// Attempt to play background music on page load (with user gesture fallback)
document.addEventListener("DOMContentLoaded", function () {
  var bgMusic = document.getElementById("bg-music");
  if (bgMusic) {
    var playMusic = function () {
      bgMusic.play().catch(function () {});
      document.removeEventListener("click", playMusic);
      document.removeEventListener("keydown", playMusic);
    };
    // Try to play immediately
    playMusic();
    // Fallback: play on first user interaction if blocked
    document.addEventListener("click", playMusic);
    document.addEventListener("keydown", playMusic);
  }
});
// Expand venue and folders images on click
document.addEventListener("DOMContentLoaded", function () {
  var expandableImages = document.querySelectorAll(
    ".venue-image, .folders-image"
  );
  expandableImages.forEach(function (img) {
    img.addEventListener("click", function (e) {
      img.classList.toggle("expanded");
    });
  });
  // Close expanded image on outside click or Escape
  document.addEventListener("click", function (e) {
    expandableImages.forEach(function (img) {
      if (
        img.classList.contains("expanded") &&
        !img.contains(e.target) &&
        !e.target.classList.contains("venue-image") &&
        !e.target.classList.contains("folders-image")
      ) {
        img.classList.remove("expanded");
      }
    });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      expandableImages.forEach(function (img) {
        img.classList.remove("expanded");
      });
    }
  });
});
// Accordion dropdown functionality (multi-section support)
document.addEventListener("DOMContentLoaded", function () {
  var toggles = document.querySelectorAll(".accordion-toggle");
  toggles.forEach(function (toggle) {
    var content = toggle.nextElementSibling;
    var icon = toggle.querySelector(".accordion-icon");
    if (content && content.classList.contains("accordion-content")) {
      toggle.addEventListener("click", function () {
        // Close all other accordions
        toggles.forEach(function (otherToggle) {
          var otherContent = otherToggle.nextElementSibling;
          var otherIcon = otherToggle.querySelector(".accordion-icon");
          if (
            otherToggle !== toggle &&
            otherContent &&
            otherContent.classList.contains("open")
          ) {
            otherContent.classList.remove("open");
            if (otherIcon) otherIcon.textContent = "+";
          }
        });
        // Toggle this one
        var isOpen = content.classList.toggle("open");
        if (icon) {
          icon.textContent = isOpen ? "-" : "+";
        }
      });
      // Set initial icon state
      if (icon) {
        icon.textContent = content.classList.contains("open") ? "-" : "+";
      }
    }
  });
});
let poll = {
  question: "RSVP?",
  answers: ["Attending", "Maybe", "Not Attending"],
  pollCount: 20,
  answersWeight: [4, 4, 2],
  selectedAnswer: -1,
};

let pollDOM = {
  question: document.querySelector(".poll .question"),
  answers: document.querySelector(".poll .answers"),
};

pollDOM.question.innerText = poll.question;
