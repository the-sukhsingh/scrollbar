# 🎨 Scrollbar Customizer

A modern, sleek, and intuitive React-based web application for designing and customizing beautiful scrollbars in real-time. Create stunning scrollbar styles that apply globally across your entire website with live preview functionality.

## ✨ Features

### 🔧 Core Functionality
- **Real-time Global Scrollbar Updates** - See your changes instantly applied across the entire application
- **Live CSS Injection** - Dynamic styling updates without page refresh
- **Comprehensive Customization** - Control every aspect of your scrollbar design

### 🎨 Customization Options
- **Colors**: Thumb color, track color, and hover effects
- **Dimensions**: Width, height, and border radius controls
- **Visibility**: Auto, hidden, or always visible modes
- **Advanced Styling**: Fine-tune every detail of your scrollbar

### 🎛️ User Experience
- **10 Beautiful Presets** - Including Dark Mode, Neon, Glassmorphism, Ocean Breeze, Cyberpunk, and more
- **Randomize Feature** - Generate creative scrollbar designs for inspiration
- **Code Export** - Get CSS, SCSS, or JavaScript code snippets
- **Local Storage** - Automatically save your configurations
- **Responsive Design** - Works perfectly on all device sizes

### 🌙 Design & Theming
- **Light/Dark Mode Toggle** - Seamless theme switching
- **Glassmorphism UI** - Modern frosted glass design elements
- **Smooth Animations** - Powered by Framer Motion
- **Clean Typography** - Using Inter, Sora, and Manrope fonts

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd scrollbar-customizer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful icons

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── ColorPicker.tsx  # Color selection component
│   ├── Controls.tsx     # Main control panel
│   ├── Presets.tsx      # Preset selection
│   ├── CodeExport.tsx   # Code generation and export
│   ├── Styles.tsx       # Advanced styling options
│   └── TabNavigation.tsx # Tab navigation
├── hooks/              # Custom React hooks
│   └── useScrollbarConfig.ts # Scrollbar state management
├── types/              # TypeScript definitions
│   └── index.ts        # Type definitions
├── utils/              # Utility functions
│   ├── presets.ts      # Predefined scrollbar presets
│   └── scrollbar.ts    # Scrollbar utility functions
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles and CSS variables
```

## 🎨 Available Presets

1. **Default** - Clean and minimal
2. **Dark Mode** - Perfect for dark themes
3. **Neon** - Electric and vibrant
4. **Glassmorphism** - Translucent and modern
5. **Ocean Breeze** - Calm and refreshing
6. **Cyberpunk** - Futuristic and bold
7. **Sunset** - Warm and inviting
8. **Forest** - Natural and earthy
9. **Lavender** - Soft and elegant
10. **Invisible** - Minimal and hidden

## 🔧 How It Works

The application uses CSS custom properties (CSS variables) combined with `::-webkit-scrollbar` pseudo-elements to create custom scrollbar styles. The styles are applied globally using `document.documentElement.style.setProperty()` for real-time updates.

## 📱 Browser Support

- Chrome/Chromium (full support)
- Safari (full support)
- Firefox (partial support - basic styling)
- Edge (full support)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 💝 Created with Love

Created with ❤️ to make your scroll smooth.

---

*Make your websites stand out with beautiful, custom scrollbars that enhance user experience and add that extra touch of polish to your designs.*
