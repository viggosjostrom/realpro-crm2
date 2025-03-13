'use client';

import React, { useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { StyledEngineProvider } from '@mui/material/styles';
import ClientOnly from '@/components/ClientOnly';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

// Create a theme instance with enhanced accessibility
const theme = createTheme({
  palette: {
    primary: {
      main: '#1a56db', // Darker blue for better contrast (4.5:1 ratio)
      light: '#3b82f6',
      dark: '#1e429f',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#047857', // Darker green for better contrast (4.5:1 ratio)
      light: '#10b981',
      dark: '#065f46',
      contrastText: '#ffffff',
    },
    error: {
      main: '#b91c1c', // Accessible red
      light: '#ef4444',
      dark: '#991b1b',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#92400e', // Accessible orange
      light: '#f59e0b',
      dark: '#78350f',
      contrastText: '#ffffff',
    },
    info: {
      main: '#1e40af', // Accessible blue
      light: '#3b82f6',
      dark: '#1e3a8a',
      contrastText: '#ffffff',
    },
    success: {
      main: '#065f46', // Accessible green
      light: '#10b981',
      dark: '#064e3b',
      contrastText: '#ffffff',
    },
    text: {
      primary: '#111827', // Very dark gray, almost black
      secondary: '#4b5563', // Dark enough for 4.5:1 contrast on white
      disabled: '#6b7280', // Meets 3:1 minimum for large text
    },
    background: {
      default: '#f9fafb',
      paper: '#ffffff',
    },
    divider: 'rgba(0, 0, 0, 0.12)',
  },
  typography: {
    fontFamily: [
      'var(--font-geist-sans)',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    // Increase base font size for better readability
    fontSize: 16,
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 600,
    },
    body1: {
      lineHeight: 1.5,
    },
    body2: {
      lineHeight: 1.5,
    },
    button: {
      fontWeight: 500,
      textTransform: 'none', // More readable than all-caps
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
          // Ensure buttons have sufficient size for touch targets
          minHeight: 44,
          minWidth: 44,
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: '#1e429f',
          },
        },
        outlinedPrimary: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'underline', // Always underline links for clarity
          fontWeight: 500,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600, // Increased from 500 for better readability
        },
        colorPrimary: {
          backgroundColor: '#1a56db', // Darker blue for better contrast
          color: '#ffffff',
        },
        colorSecondary: {
          backgroundColor: '#047857', // Darker green for better contrast
          color: '#ffffff',
        },
        colorSuccess: {
          backgroundColor: '#065f46', // Darker green for better contrast
          color: '#ffffff',
        },
        colorError: {
          backgroundColor: '#b91c1c', // Darker red for better contrast
          color: '#ffffff',
        },
        colorInfo: {
          backgroundColor: '#1e40af', // Darker blue for better contrast
          color: '#ffffff',
        },
        colorWarning: {
          backgroundColor: '#92400e', // Darker orange for better contrast
          color: '#ffffff',
        },
        outlined: {
          borderWidth: 2, // Thicker border for better visibility
        },
        label: {
          fontWeight: 600, // Bolder text for better readability
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        // Global styles for better accessibility
        body: {
          lineHeight: 1.5,
        },
        // Improve focus visibility
        '& :focus-visible': {
          outline: '3px solid #1a56db',
          outlineOffset: 2,
        },
        // Ensure skip links are available for keyboard users
        '& .skip-link': {
          position: 'absolute',
          top: -50,
          left: 0,
          background: '#1a56db',
          color: '#ffffff',
          padding: '8px 16px',
          zIndex: 9999,
          textDecoration: 'none',
          '&:focus': {
            top: 0,
          },
        },
      },
    },
  },
});

// Client-side only skip link component to avoid hydration errors
const SkipLinkContent = () => {
  return <a href="#main-content" className="skip-link">Skip to main content</a>;
};

// Create a custom cache for Emotion to prevent hydration mismatches
const createEmotionCache = () => {
  return createCache({ key: 'css', prepend: true });
};

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  // Create client-side cache after mount
  const [emotionCache, setEmotionCache] = useState<ReturnType<typeof createEmotionCache> | null>(null);
  
  useEffect(() => {
    // Only create the cache on the client side
    setEmotionCache(createEmotionCache());
  }, []);
  
  // Render a simple loading state or null during SSR
  if (!emotionCache) {
    // During SSR, return a simplified version without Emotion styles
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    );
  }

  // On the client, use the full version with Emotion cache
  return (
    <CacheProvider value={emotionCache}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ClientOnly>
            <SkipLinkContent />
          </ClientOnly>
          {children}
        </ThemeProvider>
      </StyledEngineProvider>
    </CacheProvider>
  );
} 