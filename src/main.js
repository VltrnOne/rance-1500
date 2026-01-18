import './style.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hls from 'hls.js'
import Lenis from 'lenis'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

// ============================================================================
// SMOOTH SCROLLING WITH LENIS
// ============================================================================
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

// Sync ScrollTrigger with Lenis
lenis.on('scroll', ScrollTrigger.update)

// ============================================================================
// CUSTOM CURSOR (GRANYON STYLE)
// ============================================================================
function initCustomCursor() {
  const cursorWrapper = document.querySelector('.cursor-wrapper')
  const cursorCircle = document.querySelector('.cursor-circle')
  const cursorText = document.querySelector('.cursor-text')

  if (!cursorWrapper || !cursorCircle || !cursorText) {
    console.warn('Cursor elements not found')
    return
  }

  // Check if device supports hover (not touch device)
  const isTouchDevice = window.matchMedia('(hover: none)').matches
  if (isTouchDevice) {
    cursorWrapper.style.display = 'none'
    return
  }

  // Move cursor wrapper with mouse using GSAP quickSetter for maximum performance
  const setCursorX = gsap.quickSetter(cursorWrapper, 'x', 'px')
  const setCursorY = gsap.quickSetter(cursorWrapper, 'y', 'px')

  document.addEventListener('mousemove', (e) => {
    setCursorX(e.clientX)
    setCursorY(e.clientY)
  })

  // Add hover effects for links and project items
  const hoverTargets = document.querySelectorAll('a, .works-item')

  hoverTargets.forEach((target) => {
    target.addEventListener('mouseenter', () => {
      gsap.to(cursorCircle, {
        width: 'var(--cursor-hover-size)',
        height: 'var(--cursor-hover-size)',
        backgroundColor: '#fff',
        duration: 0.3,
        ease: 'power2.out',
      })
      gsap.to(cursorText, { opacity: 1, duration: 0.3 })
    })

    target.addEventListener('mouseleave', () => {
      gsap.to(cursorCircle, {
        width: 'var(--cursor-size)',
        height: 'var(--cursor-size)',
        backgroundColor: '#1a1a1a',
        duration: 0.3,
        ease: 'power2.out',
      })
      gsap.to(cursorText, { opacity: 0, duration: 0.3 })
    })
  })
}

// ============================================================================
// CURSOR REVEAL EFFECT (PREVIEW OVERLAY)
// ============================================================================
function initCursorReveal() {
  const previewOverlay = document.querySelector('.preview-overlay')
  const previewImage = document.querySelector('.preview-image')
  const cursorText = document.querySelector('.cursor-text')

  // Select both thumbnail items (opening page) and work links (portfolio grid)
  const revealTargets = document.querySelectorAll('.thumbnail-item, .works-link')

  if (!previewOverlay || !previewImage) {
    console.warn('Preview overlay elements not found')
    return
  }

  // Check if device supports hover (not touch device)
  const isTouchDevice = window.matchMedia('(hover: none)').matches
  if (isTouchDevice) {
    previewOverlay.style.display = 'none'
    return
  }

  // Use GSAP quickSetter for maximum performance (no lag)
  const setPreviewX = gsap.quickSetter(previewOverlay, 'x', 'px')
  const setPreviewY = gsap.quickSetter(previewOverlay, 'y', 'px')

  // Move preview overlay with mouse
  document.addEventListener('mousemove', (e) => {
    setPreviewX(e.clientX)
    setPreviewY(e.clientY)
  })

  // Add hover effects for all reveal targets
  revealTargets.forEach((target) => {
    target.addEventListener('mouseenter', () => {
      // Get the image URL from data attribute
      const imageUrl = target.getAttribute('data-image')

      if (imageUrl) {
        // Set the preview image source
        previewImage.src = imageUrl

        // Show the preview overlay
        previewOverlay.classList.add('active')

        // Update cursor text
        if (cursorText) {
          cursorText.textContent = 'View Case'
        }
      }
    })

    target.addEventListener('mouseleave', () => {
      // Hide the preview overlay
      previewOverlay.classList.remove('active')

      // Reset cursor text
      if (cursorText) {
        cursorText.textContent = 'View'
      }
    })
  })
}

// ============================================================================
// SCROLL REVEAL WITH INTERSECTION OBSERVER (GRANYON STYLE)
// ============================================================================
function initScrollReveal() {
  const observerOptions = {
    threshold: 0.1, // Trigger when 10% of the item is visible
    rootMargin: '0px 0px -100px 0px', // Start animation slightly before element enters viewport
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add visible class to trigger CSS transition
        entry.target.classList.add('is-visible')
        // Stop observing once animation is triggered
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  // Observe all works items
  const items = document.querySelectorAll('.works-item')
  items.forEach((item) => {
    observer.observe(item)
  })
}

// ============================================================================
// HLS VIDEO STREAMING SETUP
// ============================================================================
function initVideoStreaming() {
  const video = document.querySelector('.background-video')

  if (!video) {
    console.warn('Background video element not found')
    return
  }

  // HLS stream URL
  const videoSrc = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'

  if (Hls.isSupported()) {
    const hls = new Hls({
      enableWorker: true,
      lowLatencyMode: true,
    })

    hls.loadSource(videoSrc)
    hls.attachMedia(video)

    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      console.log('HLS manifest loaded, video ready to play')
      video.play().catch((error) => {
        console.error('Video autoplay failed:', error)
      })
    })

    hls.on(Hls.Events.ERROR, (event, data) => {
      if (data.fatal) {
        console.error('Fatal HLS error:', data)
        switch (data.type) {
          case Hls.ErrorTypes.NETWORK_ERROR:
            console.log('Network error, attempting to recover...')
            hls.startLoad()
            break
          case Hls.ErrorTypes.MEDIA_ERROR:
            console.log('Media error, attempting to recover...')
            hls.recoverMediaError()
            break
          default:
            hls.destroy()
            break
        }
      }
    })
  } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    // Native HLS support (Safari)
    video.src = videoSrc
    video.addEventListener('loadedmetadata', () => {
      video.play().catch((error) => {
        console.error('Video autoplay failed:', error)
      })
    })
  } else {
    console.error('HLS is not supported in this browser')
  }

  // Initialize project videos (if any)
  const projectVideos = document.querySelectorAll('.project-video')
  projectVideos.forEach((projectVideo) => {
    if (projectVideo.src && projectVideo.src.includes('.m3u8')) {
      if (Hls.isSupported()) {
        const projectHls = new Hls()
        projectHls.loadSource(projectVideo.src)
        projectHls.attachMedia(projectVideo)
        projectHls.on(Hls.Events.MANIFEST_PARSED, () => {
          projectVideo.play().catch((error) => {
            console.error('Project video autoplay failed:', error)
          })
        })
      }
    }
  })
}

// ============================================================================
// GSAP SCROLL ANIMATIONS (ENHANCED)
// ============================================================================
function initScrollAnimations() {
  // Hero section fade in with tag animation
  gsap.from('.tag', {
    opacity: 0,
    scale: 0.8,
    duration: 0.6,
    delay: 0.3,
    ease: 'back.out(1.7)',
  })

  gsap.from('.hero-title', {
    opacity: 0,
    y: 50,
    duration: 1,
    delay: 0.5,
    ease: 'power3.out',
  })

  gsap.from('.hero-subtitle', {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 0.7,
    ease: 'power3.out',
  })

  // Tech list stagger animation
  const techItems = gsap.utils.toArray('.tech-item')

  gsap.from(techItems, {
    scrollTrigger: {
      trigger: '.content-section',
      start: 'top 70%',
      toggleActions: 'play none none reverse',
    },
    opacity: 0,
    x: -50,
    stagger: 0.15,
    duration: 0.8,
    ease: 'power3.out',
  })

  // Video overlay parallax
  gsap.to('.video-overlay', {
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
    opacity: 1,
    ease: 'none',
  })

  // Navbar background on scroll
  ScrollTrigger.create({
    start: 'top -80',
    end: 99999,
    toggleClass: {
      className: 'navbar--scrolled',
      targets: '.navbar',
    },
  })
}

// ============================================================================
// SMOOTH ANCHOR SCROLLING
// ============================================================================
function initSmoothAnchors() {
  const anchors = document.querySelectorAll('a[href^="#"]')

  anchors.forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault()
      const targetId = anchor.getAttribute('href').substring(1)
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        lenis.scrollTo(targetElement, {
          offset: -100,
          duration: 1.5,
        })
      }
    })
  })
}

// ============================================================================
// INITIALIZE ON DOM READY
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Rance 1500 initialized')

  // Initialize all systems
  initCustomCursor()
  initCursorReveal()
  initScrollReveal()
  initVideoStreaming()
  initScrollAnimations()
  initSmoothAnchors()

  // Log installed libraries
  console.log('✅ GSAP version:', gsap.version)
  console.log('✅ HLS.js supported:', Hls.isSupported())
  console.log('✅ Lenis initialized:', !!lenis)
  console.log('✅ Custom cursor active')
  console.log('✅ Cursor reveal active')
  console.log('✅ Scroll reveal active')
})
