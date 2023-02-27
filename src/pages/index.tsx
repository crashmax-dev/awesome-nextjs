import { Box, Group } from '@mantine/core'
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle'
import { LocaleToggle } from '@/components/LocaleToggle'
import { Welcome } from '@/components/Welcome'

export default function IndexRoute() {
  return (
    <Box>
      <Welcome />
      <Group
        position="center"
        mt="xl"
      >
        <ColorSchemeToggle />
        <LocaleToggle />
      </Group>
    </Box>
  )
}
