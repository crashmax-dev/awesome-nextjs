import {
  atom,
  mapPayload,
  mapState,
  onConnect,
  onUpdate,
  reatomAsync,
  sample,
  withAbort,
  withDataAtom,
  withErrorAtom,
  withReducers
} from '@reatom/framework'
import { fetcher, FetchError } from '@/libs/fetcher'

interface Profile {
  id: number
  name: string
  username: string
}

export const fetchProfile = reatomAsync(async (ctx) => {
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000))
  return await fetcher<Profile>(
    `https://jsonplaceholder.typicode.com/users/${ctx.get(profileIdAtom)}`,
    ctx.controller
  )
}, 'fetchProfile').pipe(
  withDataAtom(),
  withAbort(),
  withErrorAtom((ctx, error) => {
    return error instanceof FetchError ? error : undefined
  })
)
onConnect(fetchProfile.dataAtom, fetchProfile)

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
