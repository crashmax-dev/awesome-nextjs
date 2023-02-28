import {
  atom,
  mapPayload,
  mapState,
  onConnect,
  onUpdate,
  reatomAsync,
  sample,
  withAbort,
  withCache,
  withDataAtom,
  withReducers
} from '@reatom/framework'
import fetcher from '@/libs/fetcher'

interface Profile {
  id: number
  name: string
  username: string
}

export const fetchProfile = reatomAsync(
  (ctx) =>
    fetcher<Profile>(
      `https://jsonplaceholder.typicode.com/users/${ctx.get(profileIdAtom)}`,
      ctx.controller
    ),
  'fetchProfile'
).pipe(withDataAtom(), withAbort())
onConnect(fetchProfile.dataAtom, fetchProfile)

export const profileIdAtom = atom(1, 'profileIdAtom').pipe(
  withReducers({
    reset: () => 1,
    next: (state) => Math.min(10, state + 1),
    prev: (state) => Math.max(1, state - 1)
  })
)
onUpdate(profileIdAtom, fetchProfile)

export const lastRequestTimeAtom = fetchProfile.pipe(
  mapPayload(0, () => Date.now(), 'fetchProfileStart'),
  sample(fetchProfile.onSettle),
  mapState((ctx, start) => start && Date.now() - start, 'lastRequestTimeAtom')
)
