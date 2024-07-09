import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const { username, password } = await request.json()
  console.log(process.env.USER_NAME)
  if (
    username === process.env.USER_NAME &&
    password === process.env.USER_PASS
  ) {
    const response = NextResponse.json({
      id: 5301,
      username: "test user",
      contracts: [
        {
          id: 301,
          symbol: "eth_lido",
          holding: 325.1,
        },
      ],
    })

    response.cookies.set("token", "exampletoken", {
      httpOnly: true,
      path: "/",
    })

    return response
  } else {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  }
}
