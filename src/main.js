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
// HLS VIDEO STREAMING SETUP
// ============================================================================
function initVideoStreaming() {
  const video = document.querySelector('.background-video')

  if (!video) {
    console.warn('Video element not found')
    return
  }

  // Example HLS stream URL (replace with your own)
  // For testing, you can use: https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8
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
}

// ============================================================================
// GSAP SCROLL ANIMATIONS
// ============================================================================
function initScrollAnimations() {
  // Hero section fade in
  gsap.from('.hero-content', {
    opacity: 0,
    y: 50,
    duration: 1,
    delay: 0.5,
    ease: 'power3.out',
  })

  // Works items scroll animations
  const worksItems = gsap.utils.toArray('.works-item')

  worksItems.forEach((item, index) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: 'top 80%',
        end: 'top 20%',
        scrub: 1,
        // markers: true, // Uncomment for debugging
      },
      scale: 0.8,
      opacity: 0,
      y: 100,
      rotation: -5,
      ease: 'power2.out',
    })
  })

  // Section title parallax effect
  gsap.to('.section-title', {
    scrollTrigger: {
      trigger: '.works-section',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
    },
    y: -100,
    ease: 'none',
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
    stagger: 0.2,
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
    opacity: 0.8,
    ease: 'none',
  })
}

// ============================================================================
// INITIALIZE ON DOM READY
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  console.log('Rance 1500 initialized')

  initVideoStreaming()
  initScrollAnimations()

  // Log installed libraries
  console.log('GSAP version:', gsap.version)
  console.log('HLS.js supported:', Hls.isSupported())
  console.log('Lenis initialized:', !!lenis)
})
