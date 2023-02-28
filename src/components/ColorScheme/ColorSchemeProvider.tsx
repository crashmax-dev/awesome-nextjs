import { useEffect, useMemo } from 'react'
import {
  ColorScheme,
  ColorSchemeProvider as MantineColorSchemeProvider,
  MantineProvider
} from '@mantine/core'
import { useCookie, useCookieController } from '@/libs/cookie'

export function ColorSchemeProvider({ children }: React.PropsWithChildren) {
  const cookie = useCookie()
  const cookieController = useCookieController()

  const colorScheme = useMemo(() => {
    return cookie.color_scheme!
  }, [cookie.color_scheme])

  const getColorScheme = (value?: ColorScheme | boolean): ColorScheme => {
    const isMatches = typeof value === 'boolean'
    return isMatches
      ? value
        ? 'dark'
        : 'light'
      : value === 'dark'
      ? 'light'
      : 'dark'
  }

  const toggleColorScheme = (value?: ColorScheme | boolean): void => {
    cookieController.set('color_scheme', getColorScheme(value ?? colorScheme), {
      maxAge: 60 * 60 * 24 * 30
    })
  }

  useEffect(() => {
    const prefersColorScheme = window.matchMedia('(prefers-color-scheme: dark)')
    if (!colorScheme) {
      toggleColorScheme(prefersColorScheme.matches)
    }

    const togglePrefersColorScheme = (event: MediaQueryListEvent): void => {
      toggleColorScheme(event.matches)
    }

    prefersColorScheme.addEventListener('change', togglePrefersColorScheme)
    return () => {
      prefersColorScheme.removeEventListener('change', togglePrefersColorScheme)
    }
  }, [])

  return (
    <MantineColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        {children}
      </MantineProvider>
    </MantineColorSchemeProvider>
  )
}
