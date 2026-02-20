// Import and register all your controllers from the importmap via controllers/**/*_controller
import { application } from "controllers/application"
import { eagerLoadControllersFrom } from "@hotwired/stimulus-loading"
eagerLoadControllersFrom("controllers", application)

// app/javascript/pages/home.js
// YTIA · Home page interactions
// Rails 8 natif · Pas de dépendances externes

// ── Navbar scroll behaviour ──────────────────────────────────
(function () {
  const nav = document.querySelector('.main-nav')
  if (!nav) return

  let lastY = 0

  const tick = () => {
    const y = window.scrollY
    nav.classList.toggle('main-nav--scrolled', y > 40)
    nav.classList.toggle('main-nav--hidden', y > lastY + 8 && y > 120)
    nav.classList.remove('main-nav--hidden', lastY > y)
    lastY = y
  }

  window.addEventListener('scroll', tick, { passive: true })
  tick()
})()

// ── Scroll reveal ────────────────────────────────────────────
(function () {
  const els = document.querySelectorAll('[data-reveal]')
  if (!els.length) return

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible')
          obs.unobserve(e.target)
        }
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  )

  els.forEach((el) => obs.observe(el))
})()

// ── Smooth anchor scroll (fallback navigateurs) ──────────────
(function () {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'))
      if (!target) return
      e.preventDefault()
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  })
})()

// ── Contact form (Turbo compatible) ─────────────────────────
(function () {
  const form = document.querySelector('.contact-form')
  if (!form) return

  // Rails CSRF token récupéré automatiquement par Turbo
  // Ce bloc gère juste le feedback UX si besoin
  form.addEventListener('turbo:submit-end', (e) => {
    if (e.detail.success) {
      const btn = form.querySelector('[type="submit"]')
      if (btn) {
        btn.textContent = 'Message envoyé ✓'
        btn.disabled = true
        btn.style.background = '#16a34a'
      }
    }
  })
})()