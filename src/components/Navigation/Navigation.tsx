import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { Anchor } from '@mantine/core'

export function Navigation() {
  const t = useTranslations('layout.navigation')

  return (
    <>
      <Anchor
        component={Link}
        href="/"
      >
        {t('home')}
      </Anchor>
      <Anchor
        component={Link}
        href="/profile"
      >
        {t('profile')}
      </Anchor>
      <Anchor
        component={Link}
        href="/counter"
      >
        {t('counter')}
      </Anchor>
      <Anchor
        component={Link}
        href="/posts"
      >
        {t('posts')}
      </Anchor>
    </>
  )
}
