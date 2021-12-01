import useSWR from 'swr'
import Layout from 'components/layout'

interface User {
  id: number
  name: string
  username: string
  email: string
}

export default function Home() {
  const { data: users } = useSWR<User[]>('https://jsonplaceholder.typicode.com/users')

  return (
    <Layout>
      <div className="w-full max-w-5xl bg-gray-800 text-white rounded-md shadow-lg">
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr className="uppercase text-left">
                <th className="py-3 px-4">id</th>
                <th className="py-3 px-4">name</th>
                <th className="py-3 px-4">username</th>
                <th className="py-3 px-4">email</th>
              </tr>
            </thead>
            <tbody>
              {users?.map(({ id, name, username, email }) => (
                <tr key={id}>
                  <td className="py-3 px-4">{id}</td>
                  <td className="py-3 px-4">{name}</td>
                  <td className="py-3 px-4">{username}</td>
                  <td className="py-3 px-4">{email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  )
}