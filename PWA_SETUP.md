# PWA Setup Guide - Emergency Landing Game

Your game is now configured as a Progressive Web App (PWA)! Here's what's been set up:

## ✅ What's Done

1. **Service Worker** (`/public/service-worker.js`)
   - Offline functionality
   - Network-first caching strategy
   - Auto-updates on new versions

2. **Web Manifest** (`/public/manifest.json`)
   - App metadata for Android/iOS
   - App icons configuration
   - Splash screens
   - App shortcuts

3. **HTML Meta Tags**
   - Mobile viewport settings
   - Apple iOS support
   - Theme colors
   - Social media sharing

4. **Service Worker Registration**
   - Automatic registration on app load
   - Console logging for debugging

## 📱 Installation on Android

### Method 1: Chrome Browser (Easiest)
1. Open your deployed site in Chrome on Android
2. Tap the menu (⋮) → "Install app"
3. Game appears on home screen as native app

### Method 2: Google Play Store
You'll need to submit as an Android app using:
- **Bubblewrap** (Google's official tool)
- **PWABuilder** (Microsoft's tool)
- Convert to APK and upload to Play Store

## 🍎 Installation on iOS

1. Open your site in Safari on iPhone
2. Tap Share → "Add to Home Screen"
3. Game appears on home screen

## 🚀 Deployment Requirements

For PWA to work properly, you need:
- ✅ HTTPS (required for service workers)
- ✅ Valid manifest.json
- ✅ Service worker registered
- ✅ App icons (see next section)

## 🎨 Add App Icons (IMPORTANT)

Replace placeholder icons in `/public/`:

1. **icon-192.png** - 192x192 PNG
2. **icon-512.png** - 512x512 PNG  
3. **icon-maskable-192.png** - 192x192 PNG (transparent background)
4. **icon-maskable-512.png** - 512x512 PNG (transparent background)

Use tools like:
- https://www.favicon-generator.org/
- https://realfavicongenerator.net/
- https://www.pwabuilder.com/

## 📸 Add Screenshots (Optional)

Add to `/public/`:
- **screenshot-540.png** - 540x720 (mobile)
- **screenshot-1280.png** - 1280x720 (tablet)

Screenshots appear in Play Store listing.

## 🔄 Deploy to Production

```bash
npm run build
# Deploy the dist/ folder to your hosting (Netlify, Vercel, etc.)
```

## 📊 Test PWA Locally

```bash
npm run build
npm run preview
```

Then open Chrome DevTools:
- Application tab → Service Workers
- Check "Offline" to test offline functionality

## 🎯 Convert to Google Play Store

### Option 1: Bubblewrap (Official Google Tool)
```bash
npx @bubblewrap/cli init
npx @bubblewrap/cli build
```

### Option 2: PWABuilder
Visit https://www.pwabuilder.com/ and upload your site

## ✨ Features

- **Offline Play** - Works without internet
- **Fast Loading** - Cached assets load instantly
- **App-like Feel** - Full screen, no browser UI
- **Home Screen** - Installable like native app
- **Push Notifications** - (Optional, can be added later)

## 🐛 Troubleshooting

**Service Worker not registering?**
- Check browser console for errors
- Ensure HTTPS is enabled
- Clear browser cache and reload

**App won't install?**
- Icons must be PNG format
- Manifest must be valid JSON
- HTTPS is required

**Offline not working?**
- Check service worker in DevTools
- Verify cache is populated
- Try offline mode in DevTools

## 📚 Resources

- [MDN PWA Guide](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [Google PWA Checklist](https://web.dev/pwa-checklist/)
- [PWABuilder](https://www.pwabuilder.com/)
