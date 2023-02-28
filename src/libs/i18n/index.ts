import type { GetServerSidePropsContext } from 'next'

export const getI18nProps = async <
  T extends keyof Omit<IntlMessages, 'layout'>
>(
  ctx: GetServerSidePropsContext,
  namespaces: T[] = []
) => {
  const locale = ctx.locale || ctx.defaultLocale
  const i18nTranslations: Record<string, any> = {}

  for (const namespace of ['layout', ...namespaces]) {
    const data = (await import(`../../locales/${locale}/${namespace}.json`))
      .default
    i18nTranslations[namespace] = data
  }

  return { i18n: i18nTranslations }
}
