import { Card, createStyles, Group, Text } from '@mantine/core'

const useStyles = createStyles(() => ({
  toUpper: {
    ':first-letter': {
      textTransform: 'uppercase'
    }
  }
}))

interface Props {
  title: string
  body?: string
  children: React.ReactNode
}

export function CardWithButton(props: Props) {
  const { classes } = useStyles()

  return (
    <Card
      shadow="sm"
      radius="md"
      withBorder
    >
      <Group
        position="apart"
        mb="xs"
      >
        <Text
          className={classes.toUpper}
          weight={500}
        >
          {props.title}
        </Text>
      </Group>
      {props.body && (
        <Text
          className={classes.toUpper}
          size="sm"
          color="dimmed"
        >
          {props.body}
        </Text>
      )}
      {props.children}
    </Card>
  )
}
