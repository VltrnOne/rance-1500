# Gamma Integration

This project includes **two ways** to integrate with Gamma.app:

## 1. Embed Integration (No API Required) ⭐ Recommended for Portfolios

Showcase Gamma presentations directly in your site with a beautiful modal viewer. No API key needed!

**Features:**
- 🎯 Click any element to open Gamma presentations
- 🎨 Beautiful fullscreen modal with animations
- 📱 Fully responsive (mobile & desktop)
- ⌨️ Keyboard support (ESC to close)
- ⚡ Auto-initialization with `data-gamma` attributes

**Quick Start:**
```html
<a href="#" data-gamma="https://gamma.app/docs/your-presentation">
  View Presentation
</a>
```

See **[GAMMA_EMBED_USAGE.md](GAMMA_EMBED_USAGE.md)** for complete documentation.

---

## 2. API Integration (Programmatic Generation)

This project also includes integration with Gamma.app API v1.0 for AI-powered presentation and document generation.

## Setup

### 1. Get Your API Key

1. Sign up for a Gamma Pro account at https://gamma.app
2. Navigate to Account Settings > API > Generate Key
3. Copy your API key (format: `sk-gamma-xxxxxxxx`)

### 2. Configure Environment Variables

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Edit `.env` and add your API key:

```env
VITE_GAMMA_API_KEY=sk-gamma-xxxxxxxx
VITE_GAMMA_API_URL=https://api.gamma.app/v1.0
```

### 3. Restart Development Server

```bash
npm run dev
```

## Usage

The Gamma API client is available at `src/gamma-client.js`:

```javascript
import { generateCard, listThemes, getCard } from './gamma-client.js'

// Generate a new presentation
const card = await generateCard({
  text: 'Create a presentation about modern web development',
  themeId: 'your-theme-id', // Optional
})

// List available themes
const themes = await listThemes()

// Get card details
const cardDetails = await getCard(card.id)
```

## API Features

### Generate Cards
Create AI-powered presentations and documents from text prompts.

**Input Limits:**
- 100,000 tokens per request
- Rate limits based on your plan tier

### Themes
Choose from pre-built themes or use your custom themes.

### Export Formats
Generated cards can be exported to:
- PDF
- PowerPoint
- Google Slides

## API Documentation

- [Getting Started](https://developers.gamma.app/docs/getting-started)
- [API Reference](https://developers.gamma.app/docs)
- [Changelog](https://developers.gamma.app/changelog)

## Important Notes

- **API v0.2 Deprecation:** The older API version (v0.2) will sunset on January 16, 2026
- **Authentication:** Uses `X-API-KEY` header (not Bearer tokens)
- **Requirements:** Requires Pro, Ultra, Team, or Business account
- **Usage Limits:** Generous limits based on your plan tier

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_GAMMA_API_KEY` | Yes | Your Gamma API key (sk-gamma-xxx) |
| `VITE_GAMMA_API_URL` | No | API base URL (defaults to v1.0) |

## Security

- Never commit `.env` files to version control
- API keys are gitignored automatically
- Use environment-specific keys for production

## Example Integration

```javascript
// Check if Gamma is configured
import { isGammaConfigured, generateCard } from './gamma-client.js'

if (isGammaConfigured()) {
  // Generate presentation on button click
  document.querySelector('#generate-btn').addEventListener('click', async () => {
    try {
      const card = await generateCard({
        text: 'Create a portfolio presentation',
      })
      console.log('Generated card:', card)
    } catch (error) {
      console.error('Gamma API error:', error)
    }
  })
} else {
  console.warn('Gamma API not configured')
}
```

## Troubleshooting

**"VITE_GAMMA_API_KEY environment variable is not set"**
- Make sure `.env` file exists in project root
- Verify the variable name starts with `VITE_`
- Restart the dev server after adding environment variables

**"Gamma API error: Unauthorized"**
- Check that your API key is correct
- Verify your Gamma account has Pro or higher plan
- Ensure API key hasn't been revoked

**Rate Limiting**
- Gamma has generous rate limits based on plan tier
- Implement exponential backoff for retries
- Cache generated cards when possible
