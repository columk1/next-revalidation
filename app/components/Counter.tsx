import { revalidateTag } from 'next/cache'
import { incrementCounterValue } from '../lib/counter-store'
import IncrementByRouteHandlerButton from './IncrementButton'
type CounterProps = {
  id: number
}

export async function Counter({ id }: CounterProps) {
  const counterTag = `counter${id}`

  async function handleIncrementByAction(revalidationTag: string): Promise<void> {
    'use server'
    await incrementCounterValue((Number(id) as 1) || 2)
    revalidateTag(revalidationTag)
  }

  const res = await fetch(`http://localhost:3000/api/counter?id=${id}`, {
    cache: 'force-cache',
    next: {
      tags: [counterTag],
    },
    credentials: 'include',
  } as RequestInit)
  const { count } = await res.json()

  return (
    <>
      <h1 className="text-4xl font-bold">
        Counter {id}: {count}
      </h1>
      <div className="flex flex-col gap-8">
        <form action={handleIncrementByAction.bind(null, counterTag)}>
          <div className="flex flex-col items-center gap-3">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Increment Counter By Action
            </button>
            <div className='text-center'>
              <div className='text-sm'>Revalidates with the relevant tag for this counter.
                <br />
                This purges the entire router cache and re-renders the page, fetching fresh data.
              </div>
            </div>
          </div>
        </form>
        <form action={handleIncrementByAction.bind(null, 'non-existant-tag')}>
          <div className="flex flex-col items-center gap-3">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Increment Counter By Action
            </button>
            <div className='text-center'>
              <div className='text-sm'>Revalidates with a non-existant tag.
                <br />
                This purges the entire router cache and re-renders the page, fetching cached data.
              </div>
            </div>
          </div>
        </form>
        <IncrementByRouteHandlerButton id={id} />
        <div className='text-center'>
          <div className='text-sm'>
            With actions, the router cache is always invalidated. Unrelated layouts (and pages if using staleTimes) will refetch their data when visited.
            <br />
            With route handlers, the router cache is never invalidated. Layouts (and pages if using staleTimes) will render with stale data.
          </div>
        </div>
      </div>
    </>
  )
}
