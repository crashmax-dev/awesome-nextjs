import { PostCard, posts } from '@/features/posts'
import { getI18nProps } from '@/libs/i18n'
import type { PostProps } from '@/features/posts'
import type { GetServerSideProps } from 'next/types'

export default function PostSlugRoute(props: PostProps) {
  return <PostCard post={props.post} />
}

export const getServerSideProps: GetServerSideProps<Partial<PostProps>> = async (
  ctx
) => {
  const post = await posts.getBySlug(ctx.query.slug as string)
  const propsResult = {
    props: {
      post,
      ...(await getI18nProps(ctx))
    }
  }

  if (!post) {
    return {
      ...propsResult,
      redirect: {
        destination: '/posts'
      }
    }
  }

  return propsResult
}
