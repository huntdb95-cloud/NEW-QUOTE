document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initSlider("hero", 5000);
  initSlider("reviews", 7000);
  initIdMasks();
});

function initMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}

/**
 * Simple fading slider
 * @param {"hero"|"reviews"} type
 * @param {number} intervalMs
 */
function initSlider(type, intervalMs) {
  const slider = document.querySelector(`[data-slider="${type}"]`);
  if (!slider) return;

  const slides = slider.querySelectorAll(".slide, .review-slide");
  if (slides.length <= 1) return;

  let current = 0;
  slides[current].classList.add("active");

  setInterval(() => {
    slides[current].classList.remove("active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("active");
  }, intervalMs);
}

  
function initIdMasks() {
// --- Auto-insert dashes for SSN + FEIN/EIN ---
function digitsOnly(s) {
    return (s || "").replace(/\D/g, "");
  }

  function formatSSN(d) {
    d = d.slice(0, 9);
    if (d.length <= 3) return d;
    if (d.length <= 5) return d.slice(0, 3) + "-" + d.slice(3);
    return d.slice(0, 3) + "-" + d.slice(3, 5) + "-" + d.slice(5);
  }

  function formatEIN(d) {
    d = d.slice(0, 9);
    if (d.length <= 2) return d;
    return d.slice(0, 2) + "-" + d.slice(2);
  }

  function attachMask(input, formatter) {
    if (!input) return;

    input.addEventListener("input", (e) => {
      const el = e.target;
      const start = el.selectionStart || 0;
      const before = el.value;

      const formatted = formatter(digitsOnly(before));
      el.value = formatted;

      // Try to keep cursor from jumping too badly
      const delta = formatted.length - before.length;
      const pos = Math.max(0, Math.min(formatted.length, start + delta));
      el.setSelectionRange(pos, pos);
    });

    // Optional: mobile numeric keypad
    input.setAttribute("inputmode", "numeric");
    input.setAttribute("autocomplete", "off");
  }

  // ✅ Update these selectors to match your actual fields:
  const ssnInput  = document.querySelector("#ssn, input[name='ssn'], input[name='ssn_tin']");
  const feinInput = document.querySelector("#fein, #ein, input[name='fein'], input[name='ein']");

  attachMask(ssnInput, formatSSN);
  attachMask(feinInput, formatEIN);
}
