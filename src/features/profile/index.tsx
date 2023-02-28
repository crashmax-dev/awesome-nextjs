import { useTranslations } from 'next-intl'
import { Flex, Group, Text } from '@mantine/core'
import { useAction, useAtom } from '@reatom/npm-react'
import { IconArrowLeft, IconArrowRight } from '@tabler/icons'
import { ActionButton } from '@/components/ActionButton'
import { fetchProfile, lastRequestTimeAtom, profileIdAtom } from './model'

export function Profile() {
  const t = useTranslations('profile')
  const [lastRequestTime] = useAtom(lastRequestTimeAtom)
  const [profile] = useAtom(fetchProfile.dataAtom)
  const [isLoading] = useAtom(fetchProfile.pendingAtom)
  // const [error] = useAtom(fetchProfile.errorAtom)
  const [page] = useAtom(profileIdAtom)
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
      <Text fz="sm">
        {isLoading
          ? t('loading')
          : `${page}/10 ${t('loaded', { lastRequestTime })}`}
      </Text>
      <Group mt="lg">
        <ActionButton onClick={() => previous()}>
          <IconArrowLeft />
        </ActionButton>
        <ActionButton onClick={() => next()}>
          <IconArrowRight />
        </ActionButton>
      </Group>
    </Flex>
  )
}
