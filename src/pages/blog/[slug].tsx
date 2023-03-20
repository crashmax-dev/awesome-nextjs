import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Card, Text } from '@mantine/core'
import { Layout } from '@/components/Layout'
import { getI18nProps } from '@/libs/i18n'
import { Blog, blogs } from '@/mock/blog'
import type { GetServerSideProps } from 'next/types'

interface Props {
  blog: Blog | undefined
}

export default function IndexRoute(props: Props) {
  const router = useRouter()

  return (
    <Layout>
      <Card
        mt="lg"
        mx="lg"
        shadow="sm"
        radius="md"
        withBorder
      >
        <Text>
          Blog ({props.blog!.id} / {props.blog!.slug})
        </Text>
        <pre>{JSON.stringify(props.blog, null, 2)}</pre>
        <Link href={{ pathname: '/blog' }}>Back to blog</Link>
      </Card>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const slug = Number(ctx.query.slug)
  const blog = (() => {
    if (Number.isNaN(slug)) {
      return blogs.find((blog) => blog.slug === ctx.query.slug)
    } else {
      return blogs.find((blog) => blog.id === slug)
    }
  })()

  const propsResult = {
    props: {
      blog,
      ...(await getI18nProps(ctx))
    }
  }

  if (!blog) {
    return {
      ...propsResult,
      redirect: {
        destination: '/blog'
      }
    }
  }

  return propsResult
}
