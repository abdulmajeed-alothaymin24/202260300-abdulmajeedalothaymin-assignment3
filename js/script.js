// ============================================
// SCROLL FADE-IN
// ============================================

const fadeSections = document.querySelectorAll(".section-block");

fadeSections.forEach((section) => section.classList.add("fade-hidden"));

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("fade-hidden");
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

fadeSections.forEach((section) => fadeObserver.observe(section));

// ============================================
// NAVBAR ACTIVE LINK
// ============================================

const navLinks = document.querySelectorAll(".nav-links a");
const navSections = document.querySelectorAll("section[id]");

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => link.classList.remove("active-link"));
        const match = document.querySelector(
          `.nav-links a[href="#${entry.target.id}"]`
        );
        if (match) match.classList.add("active-link");
      }
    });
  },
  { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
);

navSections.forEach((section) => navObserver.observe(section));

// ============================================
// SITE GUIDE TOGGLE
// ============================================

const guideToggle = document.getElementById("guide-toggle");
const guideSteps  = document.getElementById("guide-steps");
const storageKeys = {
  theme: "theme",
  guideOpen: "guideOpen",
  projectFilter: "projectFilter",
  projectSort: "projectSort",
  projectLevel: "projectLevel",
  visitorName: "visitorName"
};

if (guideToggle && guideSteps) {
  const savedGuideOpen = localStorage.getItem(storageKeys.guideOpen) === "true";

  guideToggle.setAttribute("aria-expanded", String(savedGuideOpen));
  guideSteps.hidden = !savedGuideOpen;

  guideToggle.addEventListener("click", () => {
    const isOpen = guideToggle.getAttribute("aria-expanded") === "true";
    guideToggle.setAttribute("aria-expanded", String(!isOpen));
    guideSteps.hidden = isOpen;
    localStorage.setItem(storageKeys.guideOpen, String(!isOpen));
  });
}

// ============================================
// THEME TOGGLE
// ============================================

// Select the theme toggle button from the DOM
const themeToggleBtn = document.getElementById("theme-toggle");

// Check if the user previously saved a theme preference
const savedTheme = localStorage.getItem(storageKeys.theme);

// If dark mode was saved, apply it on page load
if (savedTheme === "dark") {
  document.body.classList.add("dark");
}

// Listen for toggle button click
themeToggleBtn.addEventListener("click", () => {

  // Switch between light and dark mode
  document.body.classList.toggle("dark");

  // Save the selected theme to localStorage
  if (document.body.classList.contains("dark")) {
    localStorage.setItem(storageKeys.theme, "dark");
  } else {
    localStorage.setItem(storageKeys.theme, "light");
  }
});

// ============================================
// PROJECT FILTER
// ============================================

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const noProjectsMsg = document.getElementById("no-projects");
const projectSort = document.getElementById("project-sort");
const projectLevel = document.getElementById("project-level");
const projectsGrid = document.querySelector(".projects-grid");
const projectsSummary = document.getElementById("projects-summary");
let activeProjectFilter = localStorage.getItem(storageKeys.projectFilter) || "all";

if (projectSort) {
  projectSort.value = localStorage.getItem(storageKeys.projectSort) || "featured";
}

if (projectLevel) {
  projectLevel.value = localStorage.getItem(storageKeys.projectLevel) || "all";
}

filterButtons.forEach((button) => {
  button.classList.toggle("active", button.getAttribute("data-filter") === activeProjectFilter);
});

function sortProjectCards(cards, sortValue) {
  const sortedCards = [...cards];

  sortedCards.sort((firstCard, secondCard) => {
    const firstTitle = firstCard.querySelector("h3").textContent.trim();
    const secondTitle = secondCard.querySelector("h3").textContent.trim();
    const firstDate = new Date(firstCard.dataset.date);
    const secondDate = new Date(secondCard.dataset.date);
    const firstFeatured = Number(firstCard.dataset.featured);
    const secondFeatured = Number(secondCard.dataset.featured);

    if (sortValue === "title-asc") {
      return firstTitle.localeCompare(secondTitle);
    }

    if (sortValue === "title-desc") {
      return secondTitle.localeCompare(firstTitle);
    }

    if (sortValue === "date-desc") {
      return secondDate - firstDate;
    }

    if (sortValue === "date-asc") {
      return firstDate - secondDate;
    }

    return firstFeatured - secondFeatured;
  });

  return sortedCards;
}

function updateProjectsSummary(visibleCount, filterValue, levelValue, sortValue) {
  const filterLabel = filterValue === "all" ? "projects from all categories" : `${filterValue} projects`;
  const levelLabel = levelValue === "all" ? "for all visitors" : `for ${levelValue} visitors`;
  const sortLabels = {
    featured: "featured order",
    "title-asc": "title A to Z",
    "title-desc": "title Z to A",
    "date-desc": "newest first",
    "date-asc": "oldest first"
  };

  if (projectsSummary) {
    projectsSummary.textContent = `Showing ${visibleCount} ${filterLabel}, filtered ${levelLabel}, sorted by ${sortLabels[sortValue]}.`;
  }
}

function applyProjectControls() {
  const sortValue = projectSort ? projectSort.value : "featured";
  const levelValue = projectLevel ? projectLevel.value : "all";
  const sortedCards = sortProjectCards(projectCards, sortValue);
  let visibleCount = 0;

  localStorage.setItem(storageKeys.projectFilter, activeProjectFilter);
  localStorage.setItem(storageKeys.projectSort, sortValue);
  localStorage.setItem(storageKeys.projectLevel, levelValue);

  sortedCards.forEach((card) => {
    const matchesCategory =
      activeProjectFilter === "all" || card.dataset.category === activeProjectFilter;
    const matchesLevel =
      levelValue === "all" || card.dataset.level === levelValue;

    if (matchesCategory && matchesLevel) {
      card.classList.remove("hidden");
      card.classList.remove("card-pop");
      void card.offsetWidth;
      card.classList.add("card-pop");
      visibleCount++;
    } else {
      card.classList.add("hidden");
    }

    if (projectsGrid) {
      projectsGrid.appendChild(card);
    }
  });

  if (noProjectsMsg) {
    noProjectsMsg.style.display = visibleCount === 0 ? "block" : "none";
  }

  updateProjectsSummary(visibleCount, activeProjectFilter, levelValue, sortValue);
}

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((button) => button.classList.remove("active"));
    btn.classList.add("active");
    activeProjectFilter = btn.getAttribute("data-filter");
    applyProjectControls();
  });
});

if (projectSort) {
  projectSort.addEventListener("change", applyProjectControls);
}

if (projectLevel) {
  projectLevel.addEventListener("change", applyProjectControls);
}

applyProjectControls();

// ============================================
// CONTACT FORM VALIDATION
// ============================================

const contactForm = document.getElementById("contact-form");
const nameField = document.getElementById("contact-name");
const emailField = document.getElementById("contact-email");
const messageField = document.getElementById("contact-message");
const successMsg = document.getElementById("form-success");
const errorMsg = document.getElementById("form-error");
const submitButton = document.getElementById("submit-button");
const nameHint = document.getElementById("name-hint");
const emailHint = document.getElementById("email-hint");
const messageHint = document.getElementById("message-hint");
const messageCount = document.getElementById("message-count");
const visitorNameInput = document.getElementById("visitor-name");
const saveVisitorButton = document.getElementById("save-visitor");
const clearVisitorButton = document.getElementById("clear-visitor");
const visitorGreeting = document.getElementById("visitor-greeting");
const timeOnSite = document.getElementById("time-on-site");

function renderVisitorGreeting(name) {
  if (!visitorGreeting) {
    return;
  }

  if (name) {
    visitorGreeting.textContent = `Welcome back, ${name}. Your project preferences are being remembered on this device.`;
  } else {
    visitorGreeting.textContent = "Welcome. Your preferences can be saved on this device.";
  }
}

if (visitorNameInput && saveVisitorButton && clearVisitorButton) {
  const savedVisitorName = localStorage.getItem(storageKeys.visitorName) || "";

  visitorNameInput.value = savedVisitorName;
  renderVisitorGreeting(savedVisitorName);

  saveVisitorButton.addEventListener("click", () => {
    const trimmedName = visitorNameInput.value.trim();

    localStorage.setItem(storageKeys.visitorName, trimmedName);
    renderVisitorGreeting(trimmedName);
  });

  clearVisitorButton.addEventListener("click", () => {
    visitorNameInput.value = "";
    localStorage.removeItem(storageKeys.visitorName);
    renderVisitorGreeting("");
  });
}

function formatTimeOnSite(totalSeconds) {
  if (totalSeconds < 60) {
    return `${totalSeconds} second${totalSeconds === 1 ? "" : "s"}`;
  }

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  if (minutes < 60) {
    return `${minutes} minute${minutes === 1 ? "" : "s"} and ${seconds} second${seconds === 1 ? "" : "s"}`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return `${hours} hour${hours === 1 ? "" : "s"}, ${remainingMinutes} minute${remainingMinutes === 1 ? "" : "s"}, and ${seconds} second${seconds === 1 ? "" : "s"}`;
}

if (timeOnSite) {
  let elapsedSeconds = 0;

  timeOnSite.textContent = "You have been exploring this portfolio for 0 seconds.";

  const timerId = window.setInterval(() => {
    elapsedSeconds += 1;
    timeOnSite.textContent = `You have been exploring this portfolio for ${formatTimeOnSite(elapsedSeconds)}.`;
  }, 1000);

  window.addEventListener("beforeunload", () => {
    window.clearInterval(timerId);
  });
}

function updateFormStatus() {
  if (!contactForm || !nameField || !emailField || !messageField || !submitButton) {
    return false;
  }

  const trimmedName = nameField.value.trim();
  const trimmedEmail = emailField.value.trim();
  const trimmedMessage = messageField.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const isNameValid = trimmedName.length >= 2;
  const isEmailValid = emailRegex.test(trimmedEmail);
  const isMessageLengthValid = trimmedMessage.length >= 20;
  const isMessageWithinLimit = trimmedMessage.length <= 300;
  const isValid = isNameValid && isEmailValid && isMessageLengthValid && isMessageWithinLimit;
  const hasNameInput = trimmedName.length > 0;
  const hasEmailInput = trimmedEmail.length > 0;
  const hasMessageInput = trimmedMessage.length > 0;

  if (nameHint) {
    if (!hasNameInput) {
      nameHint.textContent = "Please enter your name so I know who is reaching out.";
      nameHint.classList.remove("is-error");
    } else if (isNameValid) {
      nameHint.textContent = "Name looks good.";
      nameHint.classList.remove("is-error");
    } else {
      nameHint.textContent = "Please enter at least 2 characters for your name.";
      nameHint.classList.add("is-error");
    }
  }

  if (emailHint) {
    if (!hasEmailInput) {
      emailHint.textContent = "Please enter your email address so I can reply.";
      emailHint.classList.remove("is-error");
    } else if (isEmailValid) {
      emailHint.textContent = "Email format looks good.";
      emailHint.classList.remove("is-error");
    } else {
      emailHint.textContent = "Please enter a valid email address.";
      emailHint.classList.add("is-error");
    }
  }

  if (messageCount) {
    messageCount.textContent = `${trimmedMessage.length} / 300`;
    messageCount.classList.toggle("is-error", !isMessageWithinLimit);
  }

  if (messageHint) {
    if (!hasMessageInput) {
      messageHint.textContent = "Please enter a short message with enough detail to help me understand.";
      messageHint.classList.remove("is-error");
    } else if (!isMessageWithinLimit) {
      messageHint.textContent = "Please keep your message at 300 characters or fewer.";
      messageHint.classList.add("is-error");
    } else if (!isMessageLengthValid) {
      messageHint.textContent = "Please enter at least 20 characters so your message is clear.";
      messageHint.classList.add("is-error");
    } else {
      messageHint.textContent = "Message length looks good.";
      messageHint.classList.remove("is-error");
    }
  }

  submitButton.disabled = !isValid;
  return isValid;
}

[nameField, emailField, messageField].forEach((field) => {
  if (field) {
    field.addEventListener("input", updateFormStatus);
  }
});

updateFormStatus();

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Clear previous error styles
  nameField.classList.remove("input-error");
  emailField.classList.remove("input-error");
  messageField.classList.remove("input-error");

  const trimmedName = nameField.value.trim();
  const trimmedEmail = emailField.value.trim();
  const trimmedMessage = messageField.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let isValid = true;

  // Validate each field
  if (trimmedName.length < 2) {
    nameField.classList.add("input-error");
    isValid = false;
  }
  if (!emailRegex.test(trimmedEmail)) {
    emailField.classList.add("input-error");
    isValid = false;
  }
  if (trimmedMessage.length < 20 || trimmedMessage.length > 300) {
    messageField.classList.add("input-error");
    isValid = false;
  }

  if (!isValid) {
    // Show error, hide success
    errorMsg.style.display = "block";
    successMsg.style.display = "none";
    return;
  }

  // All fields valid — show success and reset
  errorMsg.style.display = "none";
  successMsg.style.display = "block";
  contactForm.reset();
  updateFormStatus();

  // Auto-hide success message after 5 seconds
  setTimeout(() => {
    successMsg.style.display = "none";
  }, 5000);
});

// ============================================
// GITHUB API INTEGRATION
// ============================================

const githubReposContainer = document.getElementById("github-repos");
const githubStatus = document.getElementById("github-status");
const githubUsername = "abdulmajeed-alothaymin24";
const githubApiUrl = `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=6&type=owner`;

function formatRepoDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

function renderGithubRepos(repositories) {
  githubReposContainer.innerHTML = repositories.map((repo) => `
    <article class="repo-card">
      <h3>${repo.name}</h3>
      <p>${repo.description || "No description provided for this repository yet."}</p>
      <div class="repo-meta">
        <span class="repo-badge">${repo.language || "Mixed stack"}</span>
        <span class="repo-badge">Updated ${formatRepoDate(repo.updated_at)}</span>
        <span class="repo-badge">${repo.stargazers_count} stars</span>
      </div>
      <a class="repo-link" href="${repo.html_url}" target="_blank" rel="noopener noreferrer">View Repository →</a>
    </article>
  `).join("");
}

async function loadGithubRepos() {
  if (!githubReposContainer || !githubStatus) {
    return;
  }

  try {
    githubStatus.textContent = "Loading repositories...";
    githubStatus.classList.remove("is-error");

    const response = await fetch(githubApiUrl);

    if (!response.ok) {
      throw new Error("GitHub request failed");
    }

    const repositories = await response.json();
    const filteredRepos = repositories
      .filter((repo) => !repo.fork)
      .slice(0, 4);

    if (filteredRepos.length === 0) {
      githubStatus.textContent = "No public repositories are available to show right now.";
      githubReposContainer.innerHTML = "";
      return;
    }

    renderGithubRepos(filteredRepos);
    githubStatus.textContent = "Live repository data loaded successfully.";
  } catch (error) {
    githubStatus.textContent = "GitHub data could not be loaded right now. Please try again later.";
    githubStatus.classList.add("is-error");
    githubReposContainer.innerHTML = "";
  }
}

loadGithubRepos();
