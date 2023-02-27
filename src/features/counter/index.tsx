import { ActionButton } from '@/components/ActionButton'
import { Text, Group } from '@mantine/core'
import { useAtom, useAction } from '@reatom/npm-react'
import { IconPlus, IconMinus } from '@tabler/icons'
import { counterAtom, incrementAction, decrementAction } from './model'

export function Counter() {
  const [counter] = useAtom(counterAtom)
  const increment = useAction(incrementAction)
  const decrement = useAction(decrementAction)

  return (
    <Group position="center" mt="xl">
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
