'use client';

import createCache from '@emotion/cache';
import { useServerInsertedHTML } from 'next/navigation';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Readex_Pro } from 'next/font/google';
import { useState } from 'react';

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
}

const theme = createTheme({
  palette: {
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
      main: '#d1d4d7'
    },
    text: {
      primary: '#26292c',
      secondary: '#6c757d',
      disabled: '#d1d4d7',
    }
  },
  typography: {
    fontFamily: readexPro.style.fontFamily,
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
    let styles = '';
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