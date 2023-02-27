import { action, atom } from '@reatom/core'

export const counterAtom = atom(0, 'counterAtom')

export const incrementAction = action(
  (ctx) => counterAtom(ctx, (counter) => counter + 1),
  'incrementCounter'
)

export const decrementAction = action(
  (ctx) => counterAtom(ctx, (counter) => counter - 1),
  'decrementCounter'
)
