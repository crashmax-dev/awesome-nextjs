import { Layout } from '@/components/Layout'
import { Profile } from '@/features/profile'
import { getI18nProps } from '@/libs/i18n'
import type { GetServerSideProps } from 'next'

export default function ProfileRoute() {
  return (
    <Layout>
      <Profile />
    </Layout>
  )
}

export const getStaticProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      ...(await getI18nProps(ctx, ['profile']))
    }
  }
}
