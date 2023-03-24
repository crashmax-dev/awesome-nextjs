import { Welcome } from '@/components/Welcome'
import { getI18nProps } from '@/libs/i18n'
import type { GetServerSideProps } from 'next'

export default function IndexRoute() {
  return <Welcome />
}

export const getStaticProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      ...(await getI18nProps(ctx))
    }
  }
}
