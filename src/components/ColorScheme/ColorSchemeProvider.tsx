import { useEffect, useMemo } from 'react'
import {
  ColorScheme,
  ColorSchemeProvider as MantineColorSchemeProvider,
  MantineProvider
} from '@mantine/core'
import { useColorScheme } from '@mantine/hooks'
import { useCookie, useCookieController } from '@/libs/cookie'
import { oneYear } from '@/utils/constants'

export function ColorSchemeProvider({ children }: React.PropsWithChildren) {
  const cookie = useCookie()
  const cookieController = useCookieController()
  const prefersColorScheme = useColorScheme(undefined, {
    getInitialValueInEffect: true
  })

  const colorScheme = useMemo<ColorScheme>(() => {
    return cookie.color_scheme ?? prefersColorScheme
  }, [cookie.color_scheme, prefersColorScheme])

  const toggleColorScheme = (value?: ColorScheme): void => {
    const newColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark')
    cookieController.set('color_scheme', newColorScheme, { maxAge: oneYear })
  }

  useEffect(() => {
    if (!cookie.color_scheme) {
      toggleColorScheme(prefersColorScheme)
    }
  }, [cookie.color_scheme, prefersColorScheme])

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
