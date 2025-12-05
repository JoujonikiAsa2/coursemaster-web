export async function GET() {
  try {
    const response = await fetch("https://coursemaster-server.vercel.app/api/v1/courses", {
      cache: "no-store",
    });

    if (!response.ok) {
      return Response.json(
        { error: "Failed to fetch courses" },
        { status: response.status }
      );
    }

    const data = await response.json();

    return Response.json({
      success: true,
      data,
      meta: null,
      links: null,
    });

  } catch (error) {
    return Response.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
