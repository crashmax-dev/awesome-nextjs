import { Text, Title } from '@mantine/core'
import useStyles from './Welcome.styles'

export function Welcome() {
  const { classes } = useStyles()

  return (
    <Title
      className={classes.title}
      align="center"
    >
      Welcome to{' '}
      <Text
        inherit
        variant="gradient"
        component="span"
      >
        Mantine
      </Text>
    </Title>
  )
}
