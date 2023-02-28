import { useTranslations } from 'next-intl'
import { Button, Flex, Group, Text } from '@mantine/core'
import { useAction, useAtom } from '@reatom/npm-react'
import { fetchProfile, lastRequestTimeAtom, profileIdAtom } from './model'

export function Profile() {
  const t = useTranslations('profile')
  const [lastRequestTime] = useAtom(lastRequestTimeAtom)
  const [profile] = useAtom(fetchProfile.dataAtom)
  const [isLoading] = useAtom(fetchProfile.pendingAtom)
  const [page] = useAtom(profileIdAtom)
  const reset = useAction(profileIdAtom.reset)
  const previous = useAction(profileIdAtom.prev)
  const next = useAction(profileIdAtom.next)

  return (
    <Flex
      align="center"
      direction="column"
    >
      <pre style={{ fontSize: '14px', whiteSpace: 'pre-wrap' }}>
        {JSON.stringify(profile, null, 2)}
      </pre>
      {isLoading ? (
        <Text>{t('loading')}</Text>
      ) : (
        <Text fz="sm">
          {page}/10 {t('loaded', { lastRequestTime })}
        </Text>
      )}
      <Group mt="lg">
        <Button onClick={() => reset()}>{t('reset')}</Button>
        <Button onClick={() => previous()}>{t('previous')}</Button>
        <Button onClick={() => next()}>{t('next')}</Button>
      </Group>
    </Flex>
  )
}
