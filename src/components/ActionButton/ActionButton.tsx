import { PropsWithChildren } from 'react'
import { ActionIcon } from '@mantine/core'
import useStyles from './ActionButton.styles'
import type { ActionIconProps } from '@mantine/core'

type Props = PropsWithChildren<
  ActionIconProps & React.HTMLAttributes<HTMLButtonElement>
>

export function ActionButton({ children, ...rest }: Props) {
  const { classes } = useStyles()

  return (
    <ActionIcon
      {...rest}
      size="xl"
      className={classes.button}
    >
      {children}
    </ActionIcon>
  )
}
