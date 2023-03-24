import { createContext, useContext } from 'react'
import {
  Cookie as CookieClient,
  createRealTimeCookie
} from '@cookie-baker/browser'
import { Cookie as CookieServer } from '@cookie-baker/node'
import { createUseCookie } from '@cookie-baker/react'
import type { CookieController, RealTimeCookie } from '@cookie-baker/core'
import type { useCookie as useCookieType } from '@cookie-baker/react'
import type { ColorScheme } from '@mantine/core'
import type { IncomingMessage, ServerResponse } from 'node:http'

export type CookieModel = {
  color_scheme: ColorScheme
  locale: string
}

type CookieContextModel = {
  cookie: CookieController<CookieModel>
  realTimeCookie: RealTimeCookie<Partial<CookieModel>>
  useCookie: useCookieType<CookieModel>
}

const createCookie = (
  cookie: CookieClient<CookieModel> | CookieServer<CookieModel>
): CookieContextModel => {
  const realTimeCookie = createRealTimeCookie(cookie)
  const useCookie = createUseCookie(cookie, realTimeCookie)
  return { cookie, realTimeCookie, useCookie }
}

export const createCookieClient = (): CookieContextModel => {
  const cookie = new CookieClient<CookieModel>()
  return createCookie(cookie)
}

export const createCookieServer = (ctx: {
  req: IncomingMessage
  res: ServerResponse
}): CookieContextModel => {
  const cookie = new CookieServer<CookieModel>(ctx)
  return createCookie(cookie)
}

const CookieContext = createContext<CookieContextModel | null>(null)

export const CookieProvider = CookieContext.Provider

export const useCookieController = () => {
  return useContext(CookieContext)!.cookie
}

export const useCookie = () => {
  return useContext(CookieContext)!.useCookie()
}
