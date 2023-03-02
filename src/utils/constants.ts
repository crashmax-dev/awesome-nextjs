export const oneYear = 60 * 60 * 24 * 365
export const isDev = () => process.env.NODE_ENV === 'development'
export const isServer = () => typeof window === 'undefined'
