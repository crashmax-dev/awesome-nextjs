type Layout = typeof import('./en/layout.json')
type Profile = typeof import('./en/profile.json')

type Messages = {
  layout: Layout //! GLOBAL
  profile: Profile
}

// Use type safe message keys with `next-intl`
declare interface IntlMessages extends Messages {}
