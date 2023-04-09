import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button, Grid } from '@mantine/core'
import { CardWithButton } from '@/components/Cards'
import { posts } from '../model/posts'
import type { Post } from '../types'

export interface PostsProps {
  posts: Post[]
}

export function PostsPage(props: PostsProps) {
  const router = useRouter()

  return (
    <Grid grow>
      {props.posts.map((post) => (
        <Grid.Col
          key={post.id}
          md={6}
          lg={3}
        >
          <CardWithButton title={post.title}>
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
          </CardWithButton>
        </Grid.Col>
      ))}
    </Grid>
  )
}
