export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const response = await fetch(`https://coursemaster-server.vercel.app/api/v1/courses/${id}`, {
      cache: 'no-store',
    })

    if (!response.ok) {
      return Response.json(
        { error: 'Course not found' },
        { status: response.status }
      )
    }

    const data = await response.json()

    return Response.json({
      success: true,
      data,
      meta: null,
      links: null,
    })
  } catch (error) {
    return Response.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
