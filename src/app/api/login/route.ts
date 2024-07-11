import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import users, { User } from "../../../data/users";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const secretKey = process.env.JWT_SECRET_KEY || "unbr34k4bl3secretkey";

export async function POST(request: NextRequest, response: NextResponse) {
  const { username, password } = await request.json();
  const INVALID_CREDENTIALS_RESPONSE = NextResponse.json(
    { error: "Invalid credentials" },
    { status: 401 },
  );

  // Find the user in the "database"
  const user = users.find((user: User) => user.username === username);

  if (!user) {
    return INVALID_CREDENTIALS_RESPONSE;
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordValid) {
    return INVALID_CREDENTIALS_RESPONSE;
  }

  const token = jwt.sign({ id: user.id, username: user.username }, secretKey, {
    expiresIn: "1h",
  });

  cookies().set("token", token);
  return NextResponse.json(
    {
      id: user.id,
      username: user.username,
      token,
      contracts: user.contracts,
    },
    { status: 200 },
  );
}
