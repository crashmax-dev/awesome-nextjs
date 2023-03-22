import Link from 'next/link'
import { Button, Card, createStyles, Group, Text } from '@mantine/core'
import { Layout } from '@/components/Layout'
import { getI18nProps } from '@/libs/i18n'
import { posts } from '@/mock/posts'
import type { Post } from '@/mock/posts'
import type { GetServerSideProps } from 'next/types'

interface Props {
  post?: Post
}

const useStyles = createStyles(() => ({
  toUpper: {
    ':first-letter': {
      textTransform: 'uppercase'
    }
  }
}))

export default function PostSlugRoute(props: Props) {
  const { classes } = useStyles()

  return (
    <Layout>
      <Card
        shadow="sm"
        radius="md"
        withBorder
      >
        <Group
          position="apart"
          mb="xs"
        >
          <Text
            className={classes.toUpper}
            weight={500}
          >
            {props.post!.title}
          </Text>
        </Group>
        <Text
          className={classes.toUpper}
          size="sm"
          color="dimmed"
        >
          {props.post!.body}
        </Text>
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
      </Card>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
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
