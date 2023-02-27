export default async function fetcher<T = unknown>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> {
  const response = await fetch(input, init)

  const isJson = response.headers
    .get('content-type')
    ?.includes('application/json')

  const data: T = isJson ? await response.json() : await response.text()

  if (!response.ok) {
    throw new FetchError({
      message: response.statusText,
      response,
      data
    })
  }

  return data
}

export class FetchError extends Error {
  response: Response
  data: unknown

  constructor({
    message,
    response,
    data
  }: {
    message: string
    response: Response
    data: unknown
  }) {
    super(message)

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FetchError)
    }

    this.name = 'FetchError'
    this.response = response
    this.data = data ?? { message }
  }
}
