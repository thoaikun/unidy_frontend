'use client'

import createCache from '@emotion/cache'
import { useServerInsertedHTML } from 'next/navigation'
import { CacheProvider } from '@emotion/react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Readex_Pro } from 'next/font/google'
import { useState } from 'react'

const readexPro = Readex_Pro({ subsets: ['latin'] })

declare module '@mui/material/styles' {
  interface PaletteColor {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  }

  interface TypeText {
    contrast: string;
    light: string;
  }

  interface Palette {
    momo: Palette['primary'];
  }

  interface PaletteOptions {
    momo?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    momo: true;
  }
}

const breakpoints = {
  lg: 1199,
}

const theme = createTheme({
  palette: {
    background: {
      default: '#eef2fc',
    },
    primary: {
      main: '#537ee4',
      '50': '#eef2fc',
      '100': '#cad7f7',
      '200': '#b0c4f3',
      '300': '#8ca9ed',
      '400': '#7598e9',
      '500': '#537ee4',
      '600': '#4c73cf',
      '700': '#3b59a2',
      '800': '#2e457d',
      '900': '#233560',
    },
    secondary: {
      main: '#d1d4d7',
    },
    error: {
      main: '#cc4e2e',
      '50': '#ffefeb',
      '100': '#ffe7e1',
      '200': '#ffcec2',
      '300': '#ff613a',
      '400': '#e65734',
      '500': '#cc4e2e',
      '600': '#bf492c',
      '700': '#993a23',
      '800': '#732c1a',
      '900': '#592214',
    },
    warning: {
      main: '#f7c333',
      '50': '#fef9eb',
      '100': '#fdecc0',
      '200': '#fbe3a1',
      '300': '#fad776',
      '400': '#f9cf5c',
      '500': '#f7c333',
      '600': '#e1b12e',
      '700': '#af8a24',
      '800': '#886b1c',
      '900': '#685215',
    },
    success: {
      main: '#7bb70c',
      '50': '#f2f8e7',
      '100': '#d6e9b4',
      '200': '#c2de8f',
      '300': '#a7cf5c',
      '400': '#95c53d',
      '500': '#7bb70c',
      '600': '#70a70b',
      '700': '#578209',
      '800': '#446507',
      '900': '#344d05',
    },
    info: {
      main: '#4e9aca',
      '50': '#eff9ff',
      '100': '#e7f6ff',
      '200': '#ceecfe',
      '300': '#62c1fc',
      '400': '#58aee3',
      '500': '#4e9aca',
      '600': '#4a91bd',
      '700': '#3b7497',
      '800': '#2c5771',
      '900': '#224458',
    },
    text: {
      primary: '#26292c',
      secondary: '#6c757d',
      disabled: '#d1d4d7',
      contrast: '#ffffff',
      light: '#f0f1f2',
    },
    momo: {
      main: '#a50064'
    },
  },
  typography: {
    fontFamily: readexPro.style.fontFamily,
    h2: {
      fontSize: '2.375rem',
      fontWeight: 700,
      [`@media (max-width:${breakpoints.lg}px)`]: {
        fontSize: '1.5rem',
      },
    },
    h3: {
      fontSize: '2rem', // 32px
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.25rem', // 20px
      [`@media (max-width:${breakpoints.lg}px)`]: {
        fontSize: '1rem',
      },
    },
    h5: {
      fontSize: '1.125rem', // 18px
      fontWeight: 600,
    },
    h6: {
      fontSize: '1rem', // 16px
      fontWeight: 500,
      [`@media (max-width:${breakpoints.lg}px)`]: {
        fontSize: '0.875rem',
      },
    },
    body1: {
      fontSize: '0.875rem', // 14px
      color: '#26292c',
    },
    body2: {
      fontSize: '0.75rem', // 12px
      color: '#d1d4d7',
    },
    caption: {
      fontSize: '0.625rem', // 10px
      color: '#6c757d',
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
  },
})

// This implementation is from emotion-js
// https://github.com/emotion-js/emotion/issues/2928#issuecomment-1319747902
export default function CustomThemeProvider(props: { options: any; children: any; }) {
  const { options, children } = props;

  const [{ cache, flush }] = useState(() => {
    const cache = createCache(options);
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted: string[] = [];
    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) {
      return null;
    }
    let styles = ''
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    );
  });

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}