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

if (guideToggle && guideSteps) {
  guideToggle.addEventListener("click", () => {
    const isOpen = guideToggle.getAttribute("aria-expanded") === "true";
    guideToggle.setAttribute("aria-expanded", String(!isOpen));
    guideSteps.hidden = isOpen;
  });
}

// ============================================
// THEME TOGGLE
// ============================================

// Select the theme toggle button from the DOM
const themeToggleBtn = document.getElementById("theme-toggle");

// Check if the user previously saved a theme preference
const savedTheme = localStorage.getItem("theme");

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
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
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
let activeProjectFilter = "all";

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

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Clear previous error styles
  nameField.classList.remove("input-error");
  emailField.classList.remove("input-error");
  messageField.classList.remove("input-error");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let isValid = true;

  // Validate each field
  if (nameField.value.trim() === "") {
    nameField.classList.add("input-error");
    isValid = false;
  }
  if (!emailRegex.test(emailField.value.trim())) {
    emailField.classList.add("input-error");
    isValid = false;
  }
  if (messageField.value.trim() === "") {
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
