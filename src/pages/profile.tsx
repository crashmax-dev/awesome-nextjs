import { Profile } from '@/features/profile'
import { getI18nProps } from '@/libs/i18n'
import type { GetServerSideProps } from 'next'

export default function ProfileRoute() {
  return <Profile />
}

export const getStaticProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      ...(await getI18nProps(ctx, ['profile']))
    }
  }
}
