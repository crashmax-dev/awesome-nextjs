import { Counter } from '@/features/counter'
import { getI18nProps } from '@/libs/i18n'
import type { GetServerSideProps } from 'next'

export default function CounterRoute() {
  return <Counter />
}

export const getStaticProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      ...(await getI18nProps(ctx))
    }
  }
}
