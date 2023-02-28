import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Text } from '@mantine/core'
import { useCookie, useCookieController } from '@/libs/cookie'
import { i18n } from '../../../next.config'
import { ActionButton } from '../ActionButton'

const DEFAULT_LOCALE = i18n!.defaultLocale

export function LocaleToggle() {
  const router = useRouter()
  const cookie = useCookie()
  const cookieController = useCookieController()

  const toggleLocale = () => {
    const nextLocale = cookie.locale === 'en' ? 'ru' : 'en'
    setCookieLocale(nextLocale)
  }

  const setCookieLocale = (locale = DEFAULT_LOCALE) => {
    cookieController.set('locale', locale)
  }

  useEffect(() => {
    if (!cookie.locale) {
      setCookieLocale()
    }

    if (i18n!.locales.includes(cookie.locale!)) {
      const { pathname, asPath, query } = router
      if (query.code || query.token) return
      router.push({ pathname, query }, asPath, { locale: cookie.locale })
    } else {
      setCookieLocale()
    }
  }, [cookie.locale])

  return (
    <ActionButton onClick={() => toggleLocale()}>
      <Text fz="lg">
        {router.locale!.charAt(0).toUpperCase() + router.locale!.slice(1)}
      </Text>
    </ActionButton>
  )
}
