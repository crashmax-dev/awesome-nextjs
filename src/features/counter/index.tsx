import { Group, Text } from '@mantine/core'
import { useAction, useAtom } from '@reatom/npm-react'
import { IconMinus, IconPlus } from '@tabler/icons'
import { ActionButton } from '@/components/ActionButton'
import { counterAtom, decrementAction, incrementAction } from './model'

export function Counter() {
  const [counter] = useAtom(counterAtom)
  const increment = useAction(incrementAction)
  const decrement = useAction(decrementAction)

  return (
    <Group
      position="center"
      mt="xl"
    >
      <Text>Counter: {counter}</Text>
      <ActionButton onClick={() => increment()}>
        <IconPlus />
      </ActionButton>
      <ActionButton onClick={() => decrement()}>
        <IconMinus />
      </ActionButton>
    </Group>
  )
}
