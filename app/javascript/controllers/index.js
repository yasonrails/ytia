// Import and register all your controllers from the importmap via controllers/**/*_controller
import { application } from "controllers/application"
import { eagerLoadControllersFrom } from "@hotwired/stimulus-loading"
eagerLoadControllersFrom("controllers", application)


const pLayers = [
  { el: document.getElementById('pg'),    speed: 0.10 },  // grille — très lente
  { el: document.getElementById('pd'),    speed: 0.15 },  // dots
  { el: document.getElementById('pb1'),   speed: 0.28 },  // blob bleu
  { el: document.getElementById('pb2'),   speed: 0.38 },  // blob teal
  { el: document.getElementById('pb3'),   speed: 0.22 },  // blob rouge
  { el: document.getElementById('pdi'),   speed: 0.14 },  // diagonale
  { el: document.getElementById('pdeco'), speed: 0.50 },  // grand texte IA — le plus rapide
]

// Visuals des blocs expertise — parallax intérieur subtil
const visEls = document.querySelectorAll('[data-xv]')

let rafId = null

function applyParallax() {
  const sy = window.scrollY
  pLayers.forEach(({ el, speed }) => {
    if (el) el.style.transform = `translateY(${sy * speed}px)`
  })

  // Inner parallax sur les visuels expertise
  visEls.forEach(el => {
    const rect  = el.getBoundingClientRect()
    const mid   = window.innerHeight / 2
    const delta = (rect.top + rect.height / 2 - mid) * 0.07
    el.style.transform = `translateY(${delta}px)`
  })

  rafId = null
}

window.addEventListener('scroll', () => {
  if (!rafId) rafId = requestAnimationFrame(applyParallax)
}, { passive: true })

applyParallax() // init immédiat


// ════════════════════════════════════════════════════
//  NAV — fond au scroll
// ════════════════════════════════════════════════════
const navEl = document.getElementById('nav')
window.addEventListener('scroll', () => {
  navEl.classList.toggle('bg', window.scrollY > 64)
}, { passive: true })


// ════════════════════════════════════════════════════
//  BURGER mobile
// ════════════════════════════════════════════════════
const burgerBtn = document.getElementById('burger')
const mobileMenu = document.getElementById('mobile')
if (burgerBtn && mobileMenu) {
  burgerBtn.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open')
    burgerBtn.classList.toggle('open', open)
    burgerBtn.setAttribute('aria-expanded', open)
  })
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mobileMenu.classList.remove('open')
    burgerBtn.classList.remove('open')
    burgerBtn.setAttribute('aria-expanded', 'false')
  }))
}


// ════════════════════════════════════════════════════
//  SCROLL REVEAL
// ════════════════════════════════════════════════════
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target) }
  })
}, { threshold: .07, rootMargin: '0px 0px -32px 0px' })
document.querySelectorAll('[data-r]').forEach(el => io.observe(el))


// ════════════════════════════════════════════════════
//  SMOOTH ANCHORS
// ════════════════════════════════════════════════════
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'))
    if (!t) return; e.preventDefault()
    t.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
})