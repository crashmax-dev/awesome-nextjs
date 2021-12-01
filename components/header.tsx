import { Link } from '@vechaiui/react'

export default function Header() {
  return (
    <h1 className="text-center text-4xl font-bold">
      Next.js{' '}
      <Link
        className="cursor-pointer"
        href="https://tailwindcss.com"
      >
        Tailwind CSS
      </Link>{' '}
      Boilerplate
    </h1>
  )
}