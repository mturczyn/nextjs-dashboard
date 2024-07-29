'use server'
export async function GET() {
    let now = Date.now()
    // Artificial delay
    while (Date.now() - now < 1000) {}
    let data = [1, 2, 3, 4, 5].map((x) => ({
        id: x,
        name: `data item ${(now + x) % 100}`,
    }))
    return Response.json({
        currentServerTime: Date.now().toString(),
        data: data,
    })
}
