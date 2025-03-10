'use client'

type FetchButtonProps = {
  id: number
}

/**
 * Client component that increments counter via fetch API
 */
export default function FetchIncrementButton({ id }: FetchButtonProps) {
  const incrementByFetch = async (_e: React.MouseEvent<HTMLButtonElement>) => {
    await fetch(`http://localhost:3000/api/counter?id=${id}`, {
      method: 'POST',
    })
  }
  return (
    <div className="flex flex-col items-center gap-3">
      <button
        onClick={incrementByFetch}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Increment Counter By Route Handler
      </button>
      <div className='text-center'>
        <div className="text-sm">
          Revalidates with the relevant tag for this counter.
          <br />
          This invalidates the data cache so that the next visit will fetch fresh data.
        </div>
      </div>
    </div>
  )
} 