import { AppShell, Group } from '@mantine/core'
import { ColorSchemeToggle } from '../ColorScheme'
import { LocaleToggle } from '../LocaleToggle'
import { Navigation } from '../Navigation'
import type { PropsWithChildren } from 'react'

export function Layout({ children }: PropsWithChildren) {
  return (
    <AppShell
      header={
        <Group
          position="center"
          mt="lg"
        >
          <Navigation />
          <ColorSchemeToggle />
          <LocaleToggle />
        </Group>
      }
    >
      {children}
    </AppShell>
  )
}
