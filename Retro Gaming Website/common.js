// Theme variables
const themes = {
  pixel: {
    '--primary': '#00ff00',
    '--secondary': '#0000ff',
    '--accent': '#ffff00',
    '--bg-dark': '#000000',
    '--bg-darker': '#000000',
    '--text': '#ffffff'
  },
  neon: {
    '--primary': '#ff00c8',
    '--secondary': '#3f00b5',
    '--accent': '#0ff',
    '--bg-dark': '#0c0c24',
    '--bg-darker': '#07071a',
    '--text': '#fff'
  },
  vaporwave: {
    '--primary': '#ff00ff',
    '--secondary': '#00ffff',
    '--accent': '#ff00ff',
    '--bg-dark': '#000033',
    '--bg-darker': '#000022',
    '--text': '#ffffff'
  },
  cyberpunk: {
    '--primary': '#ff0000',
    '--secondary': '#ffff00',
    '--accent': '#00ffff',
    '--bg-dark': '#000000',
    '--bg-darker': '#000000',
    '--text': '#ffffff'
  }
};

// Add popup notification styles
const popupStyle = document.createElement('style');
popupStyle.textContent = `
  .settings-popup {
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: var(--bg-dark);
    color: var(--text);
    padding: 15px 25px;
    border-radius: 5px;
    border: 2px solid var(--primary);
    box-shadow: 0 0 10px var(--primary);
    z-index: 1000;
    transform: translateX(150%);
    transition: transform 0.3s ease-in-out;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .settings-popup.show {
    transform: translateX(0);
  }

  .settings-popup .icon {
    font-size: 1.2rem;
    color: var(--accent);
  }
`;
document.head.appendChild(popupStyle);

// Function to show settings popup
function showSettingsPopup(message) {
  // Remove existing popup if any
  const existingPopup = document.querySelector('.settings-popup');
  if (existingPopup) {
    existingPopup.remove();
  }

  // Create new popup
  const popup = document.createElement('div');
  popup.className = 'settings-popup';
  popup.innerHTML = `
    <span class="icon">✓</span>
    <span>${message}</span>
  `;
  document.body.appendChild(popup);

  // Show popup
  setTimeout(() => {
    popup.classList.add('show');
  }, 10);

  // Hide and remove popup after 3 seconds
  setTimeout(() => {
    popup.classList.remove('show');
    setTimeout(() => {
      popup.remove();
    }, 300);
  }, 3000);
}

// Apply theme
function applyTheme(themeName) {
  const theme = themes[themeName];
  if (!theme) return;
  
  Object.entries(theme).forEach(([property, value]) => {
    document.documentElement.style.setProperty(property, value);
  });
  
  localStorage.setItem('theme', themeName);
}

// Initialize theme and mobile menu
document.addEventListener('DOMContentLoaded', () => {
  // Apply saved theme
  const savedTheme = localStorage.getItem('theme') || 'pixel';
  applyTheme(savedTheme);
  
  // Add event listener for save changes button
  const saveChangesBtn = document.querySelector('.save-changes-btn');
  if (saveChangesBtn) {
    saveChangesBtn.addEventListener('click', () => {
      // Get the selected theme
      const themeSelect = document.querySelector('select[name="theme"]');
      if (themeSelect) {
        const selectedTheme = themeSelect.value;
        applyTheme(selectedTheme);
        showSettingsPopup('Settings saved successfully!');
      }
    });
  }
  
  // Mobile menu functionality
  const menuBtn = document.querySelector('.menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuBtn && navLinks) {
    // Add mobile menu styles
    const style = document.createElement('style');
    style.textContent = `
      @media (max-width: 768px) {
        .nav-links {
          position: fixed;
          top: 60px;
          left: 0;
          width: 100%;
          height: calc(100vh - 60px);
          background-color: rgba(0, 0, 0, 0.95);
          flex-direction: column;
          padding: 5px;
          border-bottom: 2px solid var(--primary);
          z-index: 999;
          display: none;
          overflow-y: auto;
        }
        
        .nav-links.active {
          display: flex;
        }
        
        .nav-links li {
          margin: 5px 0;
          width: 100%;
          text-align: center;
          opacity: 0;
          transform: translateY(-20px);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        
        .nav-links.active li {
          opacity: 1;
          transform: translateY(0);
        }
        
        .nav-links li:nth-child(1) { transition-delay: 0.1s; }
        .nav-links li:nth-child(2) { transition-delay: 0.2s; }
        .nav-links li:nth-child(3) { transition-delay: 0.3s; }
        .nav-links li:nth-child(4) { transition-delay: 0.4s; }
        .nav-links li:nth-child(5) { transition-delay: 0.5s; }
        .nav-links li:nth-child(6) { transition-delay: 0.6s; }
        
        .nav-links a {
          display: block;
          padding: 6px;
          font-size: 0.8rem;
          color: var(--text);
          text-transform: uppercase;
          letter-spacing: 1px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .nav-links a:hover {
          color: var(--accent);
          background-color: rgba(255, 255, 255, 0.1);
        }
        
        .menu-btn {
          display: block;
          background: none;
          border: none;
          color: var(--text);
          font-size: 1.5rem;
          cursor: pointer;
          padding: 10px;
          z-index: 1000;
          transition: transform 0.3s ease;
        }
        
        .menu-btn:hover {
          transform: scale(1.1);
        }

        /* Settings section styles */
        .settings-section {
          display: flex;
          flex-direction: column;
          gap: 15px;
          padding: 20px;
        }

        .settings-section h3 {
          color: var(--accent);
          margin-bottom: 15px;
          font-size: 1.2rem;
        }

        .settings-option {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px;
          background-color: rgba(255, 255, 255, 0.05);
          border-radius: 5px;
          border: 1px solid var(--primary);
        }

        .settings-option label {
          color: var(--text);
          font-size: 0.9rem;
          flex: 1;
        }

        .settings-option select,
        .settings-option input {
          background-color: var(--bg-darker);
          color: var(--text);
          border: 1px solid var(--primary);
          padding: 5px 10px;
          border-radius: 3px;
          font-size: 0.9rem;
          width: 150px;
        }

        .settings-option select:focus,
        .settings-option input:focus {
          outline: none;
          border-color: var(--accent);
        }

        .settings-option .checkbox-container {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .settings-option .checkbox-container input[type="checkbox"] {
          width: auto;
          margin: 0;
        }
      }
    `;
    document.head.appendChild(style);
    
    // Toggle menu function
    function toggleMenu() {
      navLinks.classList.toggle('active');
      menuBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    }
    
    // Close menu function
    function closeMenu() {
      navLinks.classList.remove('active');
      menuBtn.textContent = '☰';
    }
    
    // Event listeners
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });
    
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav-container') && navLinks.classList.contains('active')) {
        closeMenu();
      }
    });
    
    navLinks.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        closeMenu();
      }
    });
    
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        closeMenu();
      }
    });
    
    // Initialize menu state
    closeMenu();
  }
});

// Add theme styles
const style = document.createElement('style');
style.textContent = `
    .theme-neon {
        --primary: #ff00c8;
        --secondary: #3f00b5;
        --accent: #0ff;
        --bg-dark: #0c0c24;
        --bg-darker: #07071a;
        --text: #fff;
    }
    
    .theme-pixel {
        --primary: #00ff00;
        --secondary: #0000ff;
        --accent: #ffff00;
        --bg-dark: #000000;
        --bg-darker: #000000;
        --text: #ffffff;
    }
    
    .theme-vaporwave {
        --primary: #ff00ff;
        --secondary: #00ffff;
        --accent: #ff00ff;
        --bg-dark: #000033;
        --bg-darker: #000022;
        --text: #ffffff;
    }
    
    .theme-cyberpunk {
        --primary: #ff0000;
        --secondary: #ffff00;
        --accent: #00ffff;
        --bg-dark: #000000;
        --bg-darker: #000000;
        --text: #ffffff;
    }
    
    .high-contrast {
        --primary: #ffffff;
        --secondary: #000000;
        --accent: #ffff00;
        --bg-dark: #000000;
        --bg-darker: #000000;
        --text: #ffffff;
    }
    
    .color-blind {
        --primary: #0072B2;
        --secondary: #D55E00;
        --accent: #009E73;
        --bg-dark: #000000;
        --bg-darker: #000000;
        --text: #ffffff;
    }
    
    .motion-reduced * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
    
    .motion-minimal * {
        animation-duration: 0.1ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.1ms !important;
        scroll-behavior: auto !important;
    }
    
    .crt-effect {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(rgba(18, 16, 16, 0.1) 50%, rgba(0, 0, 0, 0.25) 50%);
        background-size: 100% 4px;
        z-index: 1000;
        pointer-events: none;
    }
    
    .scanline-effect {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(rgba(18, 16, 16, 0.1) 50%, rgba(0, 0, 0, 0.25) 50%);
        background-size: 100% 4px;
        z-index: 1000;
        pointer-events: none;
    }

    .nav-links {
        display: flex;
        list-style: none;
        flex-wrap: wrap;
        gap: 5px;
        justify-content: center;
        align-items: center;
    }

    .nav-links li {
        margin: 0;
    }

    .nav-links a {
        padding: 3px 8px;
        font-size: 0.65rem;
        white-space: nowrap;
    }

    .nav-container {
        flex-wrap: wrap;
        gap: 10px;
        padding: 10px;
        height: auto;
    }
`;

document.head.appendChild(style); 