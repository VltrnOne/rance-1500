# Gamma Embed Integration - Usage Guide

This integration allows you to embed Gamma presentations **without using the API**. Perfect for showcasing presentations in your portfolio!

## How It Works

- **No API Key Required** - Works with any public Gamma presentation
- **Modal Viewer** - Opens presentations in a beautiful fullscreen modal
- **Auto-initialization** - Finds all elements with `data-gamma` attribute
- **Keyboard Support** - ESC key to close presentations
- **Responsive** - Works perfectly on mobile and desktop

## Quick Start

### Method 1: Using Data Attributes (Recommended)

Add the `data-gamma` attribute to any element:

```html
<button data-gamma="https://gamma.app/docs/your-presentation-id">
  View Presentation
</button>

<a href="#" data-gamma="https://gamma.app/docs/another-presentation">
  <img src="thumbnail.jpg" alt="Project">
</a>
```

The script automatically finds these elements and adds click handlers!

### Method 2: Programmatic API

Use JavaScript to open presentations:

```javascript
import { openGammaPresentation } from './gamma-embed.js'

// Open a presentation
document.querySelector('#my-button').addEventListener('click', () => {
  openGammaPresentation('https://gamma.app/docs/your-presentation-id')
})
```

## Integration Examples

### Portfolio Grid Integration

Add Gamma presentations to your portfolio items:

```html
<div class="works-item">
  <a
    href="#"
    class="works-link"
    data-image="thumbnail.jpg"
    data-gamma="https://gamma.app/docs/case-study-123"
  >
    <div class="media-container">
      <img src="thumbnail.jpg" alt="Project">
    </div>
    <div class="project-info">
      <h2>Amazing Project</h2>
      <p>View Full Case Study</p>
    </div>
  </a>
</div>
```

### Thumbnail Strip Integration

Add presentations to your hero thumbnails:

```html
<a
  href="#"
  class="thumbnail-item"
  data-image="preview.jpg"
  data-gamma="https://gamma.app/docs/presentation-456"
>
  <img src="preview.jpg" alt="Preview">
</a>
```

### Button Integration

Add presentation viewers to buttons:

```html
<button
  class="view-presentation-btn"
  data-gamma="https://gamma.app/docs/slides-789"
>
  View Slides
</button>
```

## Getting Your Gamma URLs

1. Create your presentation at https://gamma.app
2. Click **Share** button in top right
3. Toggle **"Anyone with the link can view"**
4. Copy the share URL (format: `https://gamma.app/docs/xxxxx`)
5. Use that URL in your `data-gamma` attribute

## URL Formats

The integration automatically handles these URL formats:

✅ **Docs URL**: `https://gamma.app/docs/abc123`
✅ **Embed URL**: `https://gamma.app/embed/abc123`
✅ **Public Share**: `https://gamma.app/public/abc123`

All formats work - the script converts them automatically!

## Advanced Usage

### Manual Initialization

```javascript
import { initGammaEmbeds } from './gamma-embed.js'

// Re-initialize after dynamically adding elements
initGammaEmbeds()
```

### Add Link Programmatically

```javascript
import { addGammaLink } from './gamma-embed.js'

const element = document.querySelector('.my-element')
addGammaLink(element, 'https://gamma.app/docs/presentation-id')
```

### Create Custom Viewer

```javascript
import { createGammaViewer } from './gamma-embed.js'

// Create a custom modal viewer
const modal = createGammaViewer()
// Modal is automatically added to DOM
```

## Styling

The modal is fully styled with:
- Dark overlay background
- Centered modal with rounded corners
- Close button with hover effects
- Responsive sizing for mobile
- Smooth animations

To customize, override these CSS classes:
- `.gamma-modal` - Main container
- `.gamma-modal-overlay` - Dark background
- `.gamma-modal-content` - Presentation container
- `.gamma-modal-close` - Close button
- `.gamma-embed-frame` - iframe element

## Tips & Best Practices

1. **Thumbnail Preview**: Use the same image for cursor reveal and Gamma link
2. **Loading State**: Presentations may take a moment to load
3. **Mobile**: Works great on mobile - fullscreen by default
4. **Multiple Presentations**: Add `data-gamma` to as many elements as you want
5. **Analytics**: Consider tracking presentation views with events

## Example: Complete Portfolio Item

```html
<div class="works-item">
  <!-- This item has both cursor reveal AND Gamma presentation -->
  <a
    href="#"
    class="works-link"
    data-image="https://picsum.photos/1200/800"
    data-gamma="https://gamma.app/docs/my-case-study"
  >
    <div class="media-container">
      <img src="https://picsum.photos/1200/800" alt="Project">
      <div class="shader"></div>
    </div>
    <div class="project-info">
      <h2>Client Name</h2>
      <p>Click to view full case study presentation</p>
    </div>
  </a>
</div>
```

## Troubleshooting

**Presentation not loading?**
- Check that the Gamma URL is public (not private)
- Verify the URL format is correct
- Check browser console for errors

**Modal not appearing?**
- Ensure `initGammaEmbeds()` is called after DOM loads
- Check that element has `data-gamma` attribute
- Verify JavaScript is loading correctly

**ESC key not working?**
- The modal must be active (open) for ESC to work
- Check for JavaScript errors that might prevent event listeners

## Browser Support

Works in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- iOS Safari
- Chrome for Android

No IE11 support (uses modern JavaScript).

## Performance

- **Lazy Loading**: iframes only load when presentation is opened
- **No API Calls**: Direct embed, no server requests needed
- **Lightweight**: ~5KB minified JavaScript
- **Fast**: Instant modal appearance, presentation loads from Gamma's CDN

---

**Ready to showcase your work?** Just add `data-gamma` attributes and let the magic happen! 🎨✨
