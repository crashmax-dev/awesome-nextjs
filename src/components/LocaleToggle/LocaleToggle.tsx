import { useRouter } from 'next/router'
import { Text } from '@mantine/core'
import { ActionButton } from '../ActionButton'

export function LocaleToggle() {
  const router = useRouter()

  const toggleLocale = () => {
    const { pathname, asPath, locale } = router
    const nextLocale = locale === 'en' ? 'ru' : 'en'
    router.push({ pathname }, asPath, { locale: nextLocale })
  }

  return (
    <ActionButton onClick={() => toggleLocale()}>
      <Text fz="lg">
        {router.locale!.charAt(0).toUpperCase() + router.locale!.slice(1)}
      </Text>
    </ActionButton>
  )
}
