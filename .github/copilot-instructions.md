# Copilot Instructions - Trending Sneakers

## Project Overview
**Trending Sneakers** is a React-based e-commerce application featuring a modern, animated UI for browsing and purchasing sneakers. It combines cutting-edge animations, particle effects, voice search, and a shopping cart system with localStorage persistence.

## Architecture & Component Structure

### Core App Flow (`src/App.js`)
- **Root state management**: Manages cart (localStorage), modal visibility, dark mode, search term, and infinite scroll
- **Key hooks**: `useState` for UI state, `useScroll`/`useTransform` for parallax scroll effects
- **Data source**: `sneakersData` array (hardcoded—extend with API when needed)
- **Particle background**: Initialized with `react-tsparticles` (respects dark mode toggle)

### Component Responsibilities
- **Header** (`src/components/Header.js`): Navigation, search bar, voice search (Web Speech API), dark mode toggle, cart button
- **Hero** (`src/components/Hero.js`): Landing section (check file for content)
- **SneakersGrid** (`src/components/SneakersGrid.js`): Wraps `react-infinite-scroll-component` for lazy loading
- **SneakerCard** (`src/components/SneakerCard.js`): Individual product card with 3D flip animation (framer-motion), rating display
- **CartModal** (`src/components/CartModal.js`): Modal overlay for cart management, Stripe integration stub
- **DetailModal** (`src/components/DetailModal.js`): Product details with 3D model viewer (react-three-fiber + @react-three/drei)
- **Footer** (`src/components/Footer.js`): Check for footer content

## Key Technical Patterns

### State Management & Data Flow
1. **Cart persistence**: Uses `localStorage` for cart data (serialized JSON)
   ```javascript
   useEffect(() => {
     localStorage.setItem('cart', JSON.stringify(cart));
   }, [cart]);
   ```
2. **Filtering**: Search term filters `sneakersData` in real-time via `setFilteredSneakers`
3. **Quantity updates**: `updateQuantity()` removes items when quantity reaches 0

### Animation Framework
- **Framer Motion**: Primary animation library
  - `motion.div`, `motion.img` for entrance/hover animations
  - `whileHover` for card 3D rotations, scale effects
  - `useScroll` + `useTransform` for parallax effects
- **Example pattern**: SneakerCard uses `whileHover={{ rotateY: 15, scale: 1.05 }}` for 3D card flip

### UI/Styling Conventions
- **Glassmorphism**: Cards/modals use `backdrop-filter: blur(10px)` + semi-transparent backgrounds
- **Dark mode**: `.dark` class on root `<div>` toggles body background/color
- **Icon library**: `react-icons` (FaStar, FaMicrophone, FaMoon, FaSun, FaTrash)
- **Toast notifications**: `react-toastify` for feedback (e.g., "Added to cart!")

### External Integrations
- **Stripe**: Payment gateway stub in `CartModal.js` (uses `@stripe/stripe-js`)
  - Current state: Placeholder alert; update `pk_test_your_stripe_publishable_key` and implement actual checkout flow
- **3D Models**: `DetailModal.js` uses `@react-three/fiber` + `@react-three/drei` (expects `.glb` model URLs)
- **Voice Search**: Web Speech API in `Header.js` (browser-native, no library dependency)

## Developer Workflows

### Development Server
```bash
npm start
```
- Runs on `http://localhost:3000` (hot reload enabled)
- File changes trigger automatic reload and ESLint warnings in console

### Build for Production
```bash
npm run build
```
- Creates optimized bundle in `build/` folder with hashed filenames
- Run this before deployment

### Testing
```bash
npm test
```
- Runs test suite in watch mode using Jest + React Testing Library
- See `setupTests.js` for configuration

### Common Tasks

**Add new product feature**: 
- Add object to `sneakersData` array in `App.js` (id, name, price, img, popularity, rating, reviews)
- Component rendering is automatic via `.map()` in `SneakersGrid`

**Modify animations**: 
- Update `whileHover`/`initial`/`animate` props in component's `motion.*` elements
- Reference Framer Motion docs for timing/easing properties

**Style changes**: 
- Edit `src/styles/App.css` (global) or add inline styles to components
- Dark mode: Use `.dark` selector or check `darkMode` prop for conditional styling

## Dependencies & Versions
| Package | Version | Purpose |
|---------|---------|---------|
| `react` | ^19.2.3 | Core framework |
| `framer-motion` | ^12.25.0 | Animations |
| `react-tsparticles` | ^2.12.2 | Particle background |
| `react-icons` | ^5.5.0 | Icon components |
| `react-infinite-scroll-component` | ^6.1.1 | Lazy loading grid |
| `@stripe/stripe-js` | ^8.6.1 | Payment processing |
| `@react-three/fiber` | ^6.0.13 | 3D rendering |
| `react-toastify` | ^11.0.5 | Toast notifications |

## Important Notes for AI Agents
- **Data**: Currently uses hardcoded `sneakersData`. To integrate an API, replace the array with `fetch()` or `axios` calls in a `useEffect`
- **Stripe**: Requires environment variable setup (store API keys in `.env` file, not in code)
- **3D Models**: Canvas rendering in `DetailModal.js` requires valid `.glb` URLs; test with real model files
- **localStorage**: Cart data is plain JSON; consider adding validation if extending beyond quantity/id tracking
- **Voice Search**: Only works in browsers supporting Web Speech API; test in Chrome/Edge

## File Structure Reference
```
src/
├── App.js                 # Root component + state management
├── index.js              # Entry point
├── index.css             # Base styles
├── styles/
│   └── App.css           # Global styles (animations, dark mode, glassmorphism)
└── components/
    ├── Header.js         # Navigation + search + voice search
    ├── Hero.js           # Landing section
    ├── SneakersGrid.js    # Infinite scroll wrapper
    ├── SneakerCard.js     # Card component (3D animations)
    ├── CartModal.js       # Cart overlay + Stripe stub
    ├── DetailModal.js     # Product details + 3D viewer
    └── Footer.js          # Footer content
```
