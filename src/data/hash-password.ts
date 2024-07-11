import bcrypt from "bcryptjs";

const saltRounds = 10;

export default function hashPassword(password: string): string {
  return bcrypt.hashSync(password, saltRounds);
}
