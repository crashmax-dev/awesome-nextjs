import { fetcher } from '@/libs/fetcher'
import type { Post } from '../types'

class Posts {
  private readonly posts: Post[] = []

  private async load(): Promise<void> {
    if (this.posts.length) return
    const posts = await fetcher<Post[]>(
      'https://jsonplaceholder.typicode.com/posts'
    )
    this.posts.push(...posts)
  }

  async get(): Promise<Post[]> {
    await this.load()
    return this.posts
  }

  async getBySlug(slug: string): Promise<Post | undefined> {
    const posts = await this.get()
    const postId = parseInt(slug)

    if (Number.isNaN(postId)) {
      slug = this.titleToSlug(slug)
      return posts.find((post) => this.titleToSlug(post.title) === slug)
    } else {
      return posts.find((post) => post.id === postId)
    }
  }

  titleToSlug(title: string): string {
    return title.toLowerCase().replace(/ /g, '-')
  }
}

export const posts = new Posts()
