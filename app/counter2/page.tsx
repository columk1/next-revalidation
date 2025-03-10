import { Counter } from '@/app/components/Counter'
import { Suspense } from 'react'
import React from 'react'

export default async function CountPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Suspense fallback={<div className="py-2">Loading...</div>}>
        <Counter id={2} />
      </Suspense>
    </div>
  )
}
