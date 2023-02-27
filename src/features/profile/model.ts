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
  (ctx, profileId = 1) =>
    fetcher<Profile>(
      `https://jsonplaceholder.typicode.com/users/${profileId}`,
      ctx.controller
    ),
  'fetchProfile'
).pipe(
  // withCache(), // RangeError: Maximum call stack size exceeded
  withDataAtom(null, (ctx, data) => data),
  withAbort()
)
onConnect(fetchProfile.dataAtom, fetchProfile)

export const profileIdAtom = atom(1, 'profileId').pipe(
  withReducers({
    next: (state) => Math.min(10, state + 1),
    prev: (state) => Math.max(1, state - 1)
  })
)
onUpdate(profileIdAtom, fetchProfile)

export const lastRequestTimeAtom = fetchProfile.pipe(
  mapPayload(0, () => Date.now(), 'fetchStartAtom'),
  sample(fetchProfile.onSettle),
  mapState((ctx, start) => start && Date.now() - start, 'lastRequestTimeAtom')
)
