export interface Blog {
  id: number
  slug: string
  title: string
}

export const blogs: Blog[] = [
  {
    id: 1,
    slug: 'lorem-ipsum',
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
  },
  {
    id: 2,
    slug: 'lorem-ipsum2',
    title: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
  },
  {
    id: 3,
    slug: 'lorem-ipsum3',
    title:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat'
  }
]
