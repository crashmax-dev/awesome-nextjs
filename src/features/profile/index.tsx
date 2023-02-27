import { Button, Flex, Group, Text } from '@mantine/core'
import { useAction, useAtom } from '@reatom/npm-react'
import { fetchProfile, lastRequestTimeAtom, profileIdAtom } from './model'

export function Profile() {
  const [lastRequestTime] = useAtom(lastRequestTimeAtom)
  const [profile] = useAtom(fetchProfile.dataAtom)
  const [isLoading] = useAtom(fetchProfile.pendingAtom)
  const [page] = useAtom(profileIdAtom)
  const prev = useAction(profileIdAtom.prev)
  const next = useAction(profileIdAtom.next)

  return (
    <Flex
      align="center"
      direction="column"
    >
      <pre>{JSON.stringify(profile, null, 2)}</pre>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <Text fz="sm">
          Id: {page}/10 Loaded: {lastRequestTime}ms
        </Text>
      )}
      <Group>
        <Button onClick={() => prev()}>Prev</Button>
        <Button onClick={() => next()}>Next</Button>
      </Group>
    </Flex>
  )
}
