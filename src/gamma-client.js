/**
 * Gamma API Client
 *
 * Provides integration with Gamma.app API v1.0
 * Requires VITE_GAMMA_API_KEY environment variable
 *
 * Documentation: https://developers.gamma.app/docs/getting-started
 */

const GAMMA_API_URL = import.meta.env.VITE_GAMMA_API_URL || 'https://api.gamma.app/v1.0'
const GAMMA_API_KEY = import.meta.env.VITE_GAMMA_API_KEY

/**
 * Make a request to the Gamma API
 * @param {string} endpoint - API endpoint (e.g., '/cards')
 * @param {object} options - Fetch options
 * @returns {Promise<object>} API response
 */
async function gammaRequest(endpoint, options = {}) {
  if (!GAMMA_API_KEY) {
    throw new Error('VITE_GAMMA_API_KEY environment variable is not set')
  }

  const url = `${GAMMA_API_URL}${endpoint}`

  const response = await fetch(url, {
    ...options,
    headers: {
      'X-API-KEY': GAMMA_API_KEY,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Unknown error' }))
    throw new Error(`Gamma API error: ${error.message || response.statusText}`)
  }

  return response.json()
}

/**
 * Generate a new card (presentation/document)
 * @param {object} params - Generation parameters
 * @param {string} params.text - Input text for generation
 * @param {string} [params.themeId] - Theme ID to use
 * @returns {Promise<object>} Generated card data
 */
export async function generateCard({ text, themeId }) {
  return gammaRequest('/cards', {
    method: 'POST',
    body: JSON.stringify({
      text,
      themeId,
    }),
  })
}

/**
 * List available themes
 * @returns {Promise<object>} List of themes
 */
export async function listThemes() {
  return gammaRequest('/themes')
}

/**
 * Get card details
 * @param {string} cardId - Card ID
 * @returns {Promise<object>} Card details
 */
export async function getCard(cardId) {
  return gammaRequest(`/cards/${cardId}`)
}

/**
 * Check if Gamma API is configured
 * @returns {boolean} True if API key is set
 */
export function isGammaConfigured() {
  return !!GAMMA_API_KEY
}

export default {
  generateCard,
  listThemes,
  getCard,
  isGammaConfigured,
}
