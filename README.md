# Rance 1500

A modern web project featuring advanced video streaming with HLS.js and smooth scroll animations with GSAP.

## Features

- 🎥 **HLS Video Streaming** - High-quality adaptive video streaming using HLS.js
- 🎨 **Smooth Animations** - GSAP-powered scroll-triggered animations
- 🌊 **Smooth Scrolling** - Buttery smooth scrolling experience with Lenis
- 🖱️ **Custom Cursor** - Granyon-style follow cursor with hover states
- 📜 **Scroll Reveal** - IntersectionObserver-based reveal animations
- 🎬 **Media Layers** - Video and image support with shader overlays
- 🎯 **Fixed Navigation** - Mix-blend-mode navigation that works over any background
- ⚡ **Fast Development** - Built with Vite for instant hot module replacement
- 📱 **Responsive Design** - Mobile-first approach with fluid layouts

## Tech Stack

- **Vite** - Next-generation frontend tooling
- **GSAP (GreenSock Animation Platform)** - Professional-grade animation library
- **HLS.js** - HTTP Live Streaming implementation for browsers
- **Lenis** - Smooth scroll library for fluid scrolling effects
- **Vanilla JavaScript** - No framework dependencies, pure performance

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/rance-1500.git
cd rance-1500
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The optimized build will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
rance-1500/
├── public/              # Static assets
├── src/
│   ├── main.js         # Main application entry point
│   └── style.css       # Global styles
├── index.html          # HTML template
├── package.json        # Project dependencies
└── vite.config.js      # Vite configuration
```

## Key Features Explained

### Granyon-Inspired Design

This project recreates the sophisticated interaction patterns found in award-winning agency websites like Granyon, including:

- **Custom Follow Cursor**: A smooth-tracking cursor that grows and displays text on hover
- **Scroll-to-Unfold**: Portfolio items scale and fade in as you scroll
- **Staggered Grid**: Alternating vertical offsets create visual rhythm
- **Media Layers**: Support for images, videos, and shader overlays
- **Mix-Blend-Mode Nav**: Navigation that adapts to any background color

### Custom Cursor

The custom cursor uses `translate3d` for hardware-accelerated performance and automatically detects touch devices to disable itself on mobile:

```javascript
// Cursor automatically hides on mobile/touch devices
const isTouchDevice = window.matchMedia('(hover: none)').matches
```

### Scroll Reveal with IntersectionObserver

Instead of relying solely on GSAP, the portfolio grid uses the native IntersectionObserver API for optimal performance:

```javascript
// Items reveal when 10% visible with 100px margin
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px',
}
```

This approach is more efficient for simple reveal animations and reduces JavaScript bundle size.

### HLS Video Streaming

The project uses HLS.js to stream high-quality video content efficiently. The video automatically adapts to network conditions and provides seamless playback across different devices.

```javascript
// Video streaming is initialized automatically
// Replace the video URL in src/main.js with your own HLS stream
const videoSrc = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'
```

### GSAP Scroll Animations

Multiple scroll-triggered animations are implemented:

- **Hero fade-in** - Content fades in on page load
- **Works items** - Scale and fade effects as you scroll
- **Parallax effects** - Section titles and overlays move at different speeds
- **Stagger animations** - List items animate in sequence

To add more animations, use the ScrollTrigger plugin:

```javascript
gsap.from('.your-element', {
  scrollTrigger: {
    trigger: '.your-element',
    start: 'top 80%',
    end: 'top 20%',
    scrub: true,
  },
  opacity: 0,
  y: 100,
})
```

### Smooth Scrolling with Lenis

Lenis provides a smooth, natural scrolling experience that feels premium and polished. The scroll behavior is automatically synced with GSAP ScrollTrigger for perfect coordination.

## Customization

### Changing the Video Source

Edit `src/main.js` and update the `videoSrc` variable:

```javascript
const videoSrc = 'YOUR_HLS_STREAM_URL.m3u8'
```

### Adjusting Animation Settings

All animations can be customized in `src/main.js`. Key parameters include:

- **duration** - Animation length
- **ease** - Easing function (e.g., 'power3.out', 'elastic')
- **scrub** - Whether animation is tied to scroll position
- **start/end** - When animation should trigger

### Styling

All styles are in `src/style.css`. The project uses CSS custom properties (variables) for easy theming:

```css
:root {
  --color-primary: #646cff;
  --color-secondary: #535bf2;
  --color-text: #ffffff;
  --color-bg: #0a0a0a;
}
```

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- iOS Safari (iOS 12+)
- Chrome for Android (latest)

## Performance Tips

1. **Optimize Video** - Use properly encoded HLS streams with multiple quality levels
2. **Lazy Loading** - Images and heavy content should load on demand
3. **Will-change** - Use sparingly for elements that will animate
4. **Debounce Scroll** - Already implemented with Lenis

## Deployment

### Vercel

```bash
npm run build
# Deploy the dist folder to Vercel
```

### Netlify

```bash
npm run build
# Deploy the dist folder to Netlify
```

### GitHub Pages

```bash
npm run build
# Deploy the dist folder to your gh-pages branch
```

## License

MIT

## Acknowledgments

- [GSAP](https://greensock.com/gsap/) - Professional animation library
- [HLS.js](https://github.com/video-dev/hls.js/) - Video streaming implementation
- [Lenis](https://lenis.studiofreight.com/) - Smooth scroll library
- [Vite](https://vitejs.dev/) - Build tool and dev server

---

Built with ❤️ using modern web technologies
