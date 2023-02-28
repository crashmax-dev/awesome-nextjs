import { useMantineColorScheme } from '@mantine/core'
import { IconMoonStars, IconSun } from '@tabler/icons'
import { ActionButton } from '../ActionButton'

export function ColorSchemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()

  return (
    <ActionButton onClick={() => toggleColorScheme()}>
      {colorScheme === 'dark' ? (
        <IconSun
          size={20}
          stroke={1.5}
        />
      ) : (
        <IconMoonStars
          size={20}
          stroke={1.5}
        />
      )}
    </ActionButton>
  )
}
