import { Box, Group } from '@mantine/core'
import { ColorSchemeToggle } from '../ColorScheme'
import { LocaleToggle } from '../LocaleToggle'
import { Navigation } from '../Navigation'
import type { PropsWithChildren } from 'react'

export function Layout({ children }: PropsWithChildren) {
  return (
    <Box>
      {children}
      <Group
        position="center"
        mt="xl"
      >
        <Navigation />
        <ColorSchemeToggle />
        <LocaleToggle />
      </Group>
    </Box>
  )
}
