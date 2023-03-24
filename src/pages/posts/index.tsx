import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button, Card, Grid, Text } from '@mantine/core'
import { getI18nProps } from '@/libs/i18n'
import { posts } from '@/mock/posts'
import type { Post } from '@/mock/posts'
import type { GetServerSideProps } from 'next/types'

interface Props {
  posts: Post[]
}

export default function PostIndexRoute(props: Props) {
  const router = useRouter()

  return (
    <Grid grow>
      {props.posts.map((post) => (
        <Grid.Col
          key={post.id}
          md={6}
          lg={3}
        >
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
          >
            <Text weight={500}>Post №{post.id}</Text>
            <Button
              component={Link}
              href={`/posts/${posts.titleToSlug(post.title)}`}
              onClick={(event) => {
                event.preventDefault()
                router.push('/posts/[slug]', `/posts/${post.id}`)
              }}
              variant="light"
              color="blue"
              fullWidth
              mt="md"
              radius="md"
            >
              Read
            </Button>
          </Card>
        </Grid.Col>
      ))}
    </Grid>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const propsResult = {
    props: {
      posts: await posts.get(),
      ...(await getI18nProps(ctx))
    }
  }

  return propsResult
}
