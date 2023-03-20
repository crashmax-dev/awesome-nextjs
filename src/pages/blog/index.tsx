import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button, Card, SimpleGrid, Text } from '@mantine/core'
import { Layout } from '@/components/Layout'
import { getI18nProps } from '@/libs/i18n'
import { Blog, blogs } from '@/mock/blog'
import type { GetServerSideProps } from 'next/types'

interface Props {
  blogs: Blog[]
}

export default function IndexRoute(props: Props) {
  const router = useRouter()

  return (
    <Layout>
      <SimpleGrid
        cols={3}
        pt="lg"
        mx="lg"
      >
        {props.blogs.map((blog) => (
          <Card
            key={blog.id}
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
          >
            <Text weight={500}>
              Blog ({blog.id} / {blog.slug})
            </Text>
            <Button
              component={Link}
              href={`/blog/${blog.slug}`}
              // href={{ pathname: '/blog/[slug]', query: { slug: blog.slug } }}
              onClick={(event) => {
                event.preventDefault()
                router.push('/blog/[slug]', `/blog/${blog.id}`)
              }}
              variant="light"
              color="blue"
              fullWidth
              mt="md"
              radius="md"
            >
              Visit
            </Button>
          </Card>
        ))}
      </SimpleGrid>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const propsResult = {
    props: {
      blogs,
      ...(await getI18nProps(ctx))
    }
  }

  return propsResult
}
