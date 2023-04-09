import Link from 'next/link'
import { Button } from '@mantine/core'
import { CardWithButton } from '@/components/Cards'
import { Post } from '../types'

export interface PostProps {
  post: Post
}

export function PostCard({ post }: PostProps) {
  return (
    <CardWithButton
      title={post.title}
      body={post.body}
    >
      <Button
        component={Link}
        href="/posts"
        variant="light"
        color="blue"
        fullWidth
        mt="md"
        radius="md"
      >
        Back to posts
      </Button>
    </CardWithButton>
  )
}
