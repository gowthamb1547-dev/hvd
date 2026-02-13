# 💕 Valentine's Day Surprise

A romantic Valentine's Day surprise website built with React, TypeScript, and Vite.

## ✨ Features

- 🎬 Interactive proposal experience
- 🎉 Celebration screen with animations
- 💝 Memory photo wall
- 🎵 Background music with controls
- 🎮 Heart catcher game
- ⏰ Relationship clock
- 💌 Love letter section
- 📱 Fully responsive design
- 🎨 Beautiful animations and effects

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd eternal-love-shrine

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

## 📝 Environment Variables

Create a `.env.local` file from `.env.example` and configure:

```env
VITE_APP_TITLE="Valentine's Day Surprise"
VITE_APP_DESCRIPTION="A special Valentine's Day surprise"
VITE_AUDIO_URL="https://your-audio-url.mp3"
VITE_SITE_URL="https://your-domain.com"
```

## 🏗️ Build & Deploy

### Build for Production

```bash
# Build the application
npm run build

# Preview the build
npm run preview
```

### Deployment Options

#### 1. Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Or connect your GitHub repository to [Vercel](https://vercel.com) for automatic deployments.

#### 2. Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

Or connect your repository to [Netlify](https://netlify.com).

#### 3. AWS S3 + CloudFront

```bash
# Build and upload to S3
npm run build
aws s3 sync dist/ s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

#### 4. Traditional Hosting

1. Run `npm run build`
2. Upload the `dist` folder to your hosting provider
3. Ensure your server supports SPA routing (redirect all routes to index.html)

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run build:dev    # Build with development mode
npm run preview      # Preview production build
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run lint         # Run ESLint
npm run lint:fix     # Fix linting issues
npm run type-check   # Run TypeScript type checking
npm run clean        # Clean build artifacts
```

### Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── FloatingHearts.tsx
│   ├── ProposalScreen.tsx
│   └── ...
├── pages/              # Page components
│   ├── Index.tsx
│   └── NotFound.tsx
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── styles/             # Global styles
```

## 🎨 Customization

### Changing Colors

Edit `src/index.css` and modify the CSS variables:

```css
:root {
  --valentine-rose: 340 82% 52%;
  --valentine-pink: 330 70% 70%;
  --valentine-blush: 350 60% 85%;
}
```

### Adding Photos

Replace the placeholder images in the `PhotoMemoryWall` component with your own photos.

### Custom Audio

Replace the audio URL in your `.env.local` file or directly in the component.

## 🔧 Optimization

This project includes:

- ⚡ Code splitting and lazy loading
- 🗜️ Image optimization
- 📦 Bundle size optimization
- 🎯 Performance monitoring
- 🔒 Security headers
- 📱 Responsive design
- ♿ Accessibility features

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 💝 Made with Love

Created with ❤️ for someone special. Happy Valentine's Day!
