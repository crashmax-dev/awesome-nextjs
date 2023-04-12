import {
  atom,
  effect,
  mapPayload,
  mapState,
  onConnect,
  onUpdate,
  reatomAsync,
  sample,
  withAbort,
  withCache,
  withDataAtom,
  withReducers,
  withStatusesAtom
} from '@reatom/framework'
import { fetcher } from '@/libs/fetcher'

interface Profile {
  id: number
  name: string
  username: string
}

export const fetchProfile = reatomAsync(async (ctx) => {
  return await fetcher<Profile>(
    `https://jsonplaceholder.typicode.com/users/${ctx.get(profileIdAtom)}`,
    ctx.controller
  )
}, 'fetchProfile').pipe(
  withAbort({ strategy: 'last-in-win' }),
  withCache(),
  withDataAtom(),
  withStatusesAtom()
)
onConnect(fetchProfile.dataAtom, fetchProfile)

fetchProfile.statusesAtom.pipe(
  // select needed property
  mapState((ctx, { isEverSettled }) => isEverSettled),
  // react to the changes
  effect((ctx, isEverSettled) => {
    if (isEverSettled) console.log('The first loading occurs')
  }),
  // activate this chain
  onUpdate
)

export const profileIdAtom = atom(1, 'profileIdAtom').pipe(
  withReducers({
    next: (state) => Math.min(10, state + 1),
    // next: (state) => state + 1,
    prev: (state) => Math.max(1, state - 1)
  })
)
onUpdate(profileIdAtom, fetchProfile)

export const lastRequestTimeAtom = fetchProfile.pipe(
  mapPayload(0, () => Date.now(), 'fetchProfileStart'),
  sample(fetchProfile.onSettle),
  mapState((ctx, start) => start && Date.now() - start, 'lastRequestTimeAtom')
)
