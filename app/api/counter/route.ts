import { getCounterValue, incrementCounterValue } from '@/app/lib/counter-store'
import { NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = Number(searchParams.get('id') || '1')

  const count = await getCounterValue(id as 1 | 2)
  return NextResponse.json({ count })
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = Number(searchParams.get('id') || '1') as 1 | 2

  await incrementCounterValue(id)
  const updatedCount = await getCounterValue(id)
  revalidateTag(`counter${id}`)

  return NextResponse.json({ count: updatedCount })
}
