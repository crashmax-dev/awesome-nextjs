import { Layout } from '@/components/Layout'
import { Welcome } from '@/components/Welcome'
import { getI18nProps } from '@/libs/i18n'
import type { GetServerSideProps } from 'next'

export default function IndexRoute() {
  return (
    <Layout>
      <Welcome />
    </Layout>
  )
}

export const getStaticProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      ...(await getI18nProps(ctx))
    }
  }
}
