import { posts, PostsPage } from '@/features/posts'
import { getI18nProps } from '@/libs/i18n'
import type { PostsProps } from '@/features/posts'
import type { GetServerSideProps } from 'next/types'

export default function PostIndexRoute(props: PostsProps) {
  return <PostsPage posts={props.posts} />
}

export const getServerSideProps: GetServerSideProps<PostsProps> = async (
  ctx
) => {
  const propsResult = {
    props: {
      posts: await posts.get(),
      ...(await getI18nProps(ctx))
    }
  }

  return propsResult
}
