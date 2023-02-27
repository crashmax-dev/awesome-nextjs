import Link from 'next/link'
import { Anchor } from '@mantine/core'

export function Navigation() {
  return (
    <>
      <Anchor
        component={Link}
        href="/"
      >
        Home
      </Anchor>
      <Anchor
        component={Link}
        href="/profile"
      >
        Profile
      </Anchor>
      <Anchor
        component={Link}
        href="/counter"
      >
        Counter
      </Anchor>
    </>
  )
}
