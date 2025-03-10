import { Suspense } from 'react'
import { Counter } from '../components/Counter'

export default async function Home() {
	return (
		<div className="flex flex-col items-center justify-center gap-4">
			<Suspense fallback={<div className="py-2">Loading...</div>}>
				<Counter id={1} />
			</Suspense>
		</div>
	)
}
