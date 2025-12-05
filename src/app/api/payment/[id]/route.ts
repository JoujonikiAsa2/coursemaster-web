export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const { userEmail, courseTitle, price, phone } = body

    if (!id) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const payload = {
      courseId: id,
      userEmail,
      courseTitle,
      price,
      phone,
    }

    const response = await fetch('https://coursemaster-server.vercel.app/api/v1/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
    })

    const data = await response.json()
    console.log("Payment Server Response:", data)

    if (!response.ok) {
      return Response.json(
        { error: 'Payment initiation failed' },
        { status: response.status }
      )
    }

    return Response.json({
      success: true,
      data,
      redirectUrl: data?.data?.redirectUrl || data?.redirectUrl || null,
    })

  } catch (error) {
    console.error('Payment API Error:', error)
    return Response.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
