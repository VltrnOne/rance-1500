/**
 * Gamma Embed Integration (No API Required)
 *
 * Allows embedding Gamma presentations directly in your site
 * Uses Gamma's public sharing URLs and iframe embeds
 */

/**
 * Create a Gamma presentation viewer modal
 */
export function createGammaViewer() {
  // Create modal overlay
  const modal = document.createElement('div')
  modal.className = 'gamma-modal'
  modal.innerHTML = `
    <div class="gamma-modal-overlay"></div>
    <div class="gamma-modal-content">
      <button class="gamma-modal-close" aria-label="Close presentation">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>
      <iframe class="gamma-embed-frame" frameborder="0" allowfullscreen></iframe>
    </div>
  `

  document.body.appendChild(modal)

  // Close button functionality
  const closeBtn = modal.querySelector('.gamma-modal-close')
  const overlay = modal.querySelector('.gamma-modal-overlay')

  const closeModal = () => {
    modal.classList.remove('active')
    setTimeout(() => {
      const iframe = modal.querySelector('.gamma-embed-frame')
      iframe.src = '' // Clear iframe when closed
    }, 300)
  }

  closeBtn.addEventListener('click', closeModal)
  overlay.addEventListener('click', closeModal)

  // ESC key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal()
    }
  })

  return modal
}

/**
 * Open a Gamma presentation in the viewer
 * @param {string} gammaUrl - Gamma presentation URL (e.g., https://gamma.app/docs/...)
 */
export function openGammaPresentation(gammaUrl) {
  let modal = document.querySelector('.gamma-modal')

  if (!modal) {
    modal = createGammaViewer()
  }

  // Convert Gamma URL to embed URL if needed
  const embedUrl = convertToEmbedUrl(gammaUrl)

  const iframe = modal.querySelector('.gamma-embed-frame')
  iframe.src = embedUrl

  modal.classList.add('active')
}

/**
 * Convert Gamma public URL to embed URL
 * @param {string} url - Gamma presentation URL
 * @returns {string} Embed-ready URL
 */
function convertToEmbedUrl(url) {
  // If already an embed URL, return as is
  if (url.includes('/embed/')) {
    return url
  }

  // Convert docs URL to embed URL
  // Example: https://gamma.app/docs/abc123 -> https://gamma.app/embed/abc123
  const urlObj = new URL(url)
  const path = urlObj.pathname.replace('/docs/', '/embed/')

  return `${urlObj.origin}${path}${urlObj.search}`
}

/**
 * Add Gamma link to element
 * @param {HTMLElement} element - Element to add click handler to
 * @param {string} gammaUrl - Gamma presentation URL
 */
export function addGammaLink(element, gammaUrl) {
  element.addEventListener('click', (e) => {
    e.preventDefault()
    openGammaPresentation(gammaUrl)
  })

  // Add data attribute for reference
  element.setAttribute('data-gamma-url', gammaUrl)
}

/**
 * Initialize Gamma embeds for all elements with data-gamma attribute
 */
export function initGammaEmbeds() {
  const elements = document.querySelectorAll('[data-gamma]')

  elements.forEach((element) => {
    const gammaUrl = element.getAttribute('data-gamma')
    if (gammaUrl) {
      addGammaLink(element, gammaUrl)
    }
  })

  console.log(`✅ Gamma embeds initialized for ${elements.length} elements`)
}

/**
 * Add CSS styles for Gamma modal
 */
export function addGammaStyles() {
  const styleId = 'gamma-modal-styles'

  // Don't add styles if already present
  if (document.getElementById(styleId)) {
    return
  }

  const style = document.createElement('style')
  style.id = styleId
  style.textContent = `
    /* Gamma Modal Overlay */
    .gamma-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 10000;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
    }

    .gamma-modal.active {
      opacity: 1;
      pointer-events: all;
    }

    .gamma-modal-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.9);
      cursor: pointer;
    }

    .gamma-modal-content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 90vw;
      height: 90vh;
      max-width: 1400px;
      max-height: 900px;
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }

    .gamma-modal-close {
      position: absolute;
      top: 1rem;
      right: 1rem;
      z-index: 10001;
      width: 40px;
      height: 40px;
      background: rgba(0, 0, 0, 0.7);
      border: none;
      border-radius: 50%;
      color: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
    }

    .gamma-modal-close:hover {
      background: rgba(0, 0, 0, 0.9);
      transform: scale(1.1);
    }

    .gamma-embed-frame {
      width: 100%;
      height: 100%;
      border: none;
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
      .gamma-modal-content {
        width: 95vw;
        height: 95vh;
        border-radius: 8px;
      }

      .gamma-modal-close {
        width: 36px;
        height: 36px;
        top: 0.5rem;
        right: 0.5rem;
      }
    }
  `

  document.head.appendChild(style)
}

// Auto-initialize when module is loaded
if (typeof document !== 'undefined') {
  // Add styles immediately
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addGammaStyles)
  } else {
    addGammaStyles()
  }
}

export default {
  createGammaViewer,
  openGammaPresentation,
  addGammaLink,
  initGammaEmbeds,
  addGammaStyles,
}
