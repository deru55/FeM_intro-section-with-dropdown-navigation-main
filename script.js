const dropdownsBtns = document.querySelectorAll(".btn--dropdown");
const navToggle = document.querySelector(".mobile-nav-toggle");
const primaryNav = document.querySelector(".primary-navigation");
const wrapperHeader = document.querySelector(".wrapper-header");
var windowWidth = window.matchMedia("(max-width: 1025px)");

dropdownsBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const dropdownContent =
      e.currentTarget.parentElement.querySelector(".dropdown-content");
    const dropdownVisible = document.querySelectorAll(
      ".dropdown-content[data-visible]"
    );

    dropdownContent.toggleAttribute("data-visible");

    if (!windowWidth.matches) {
      dropdownVisible.forEach((item) => {
        item.removeAttribute("data-visible");
      });
    }

    dropdownExpanded();
  });
});

window.onclick = function (event) {
  if (windowWidth.matches) {
    if (event.target.matches(".shadow")) {
      toggleBtnFn();
      preventScroll();
    }
  } else {
    if (!event.target.closest(".dropdown")) {
      const dropdowns = document.querySelectorAll(".dropdown-content");

      for (let i = 0; i < dropdowns.length; i++) {
        let openDropdown = dropdowns[i];
        if (openDropdown.hasAttribute("data-visible")) {
          openDropdown.removeAttribute("data-visible");
        }
      }
    }
  }

  dropdownExpanded();
};

const dropdownExpanded = () => {
  const dropdowns = document.querySelectorAll(".dropdown-content");

  dropdowns.forEach((item) => {
    const parentElement = item.parentElement;
    const dropdownBtn = parentElement.querySelector(".btn--dropdown");

    if (item.hasAttribute("data-visible")) {
      dropdownBtn.setAttribute("aria-expanded", true);
      item.style.maxHeight = item.scrollHeight + "px";
    } else {
      dropdownBtn.setAttribute("aria-expanded", false);
      item.style.maxHeight = null;
    }
  });
};

navToggle.addEventListener("click", () => {
  topFunction();
  preventScroll();
  toggleBtnFn();
});

const toggleBtnFn = () => {
  primaryNav.toggleAttribute("data-visible");
  if (primaryNav.hasAttribute("data-visible")) {
    navToggle.setAttribute("aria-expanded", true);
    wrapperHeader.classList.add("shadow");
  } else {
    navToggle.setAttribute("aria-expanded", false);
    wrapperHeader.classList.remove("shadow");
  }
};

const topFunction = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};

const preventScroll = () => {
  document.body.toggleAttribute("data-scroll");
};
