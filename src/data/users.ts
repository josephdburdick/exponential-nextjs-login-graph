// user database
import hashPassword from "./hash-password";

const USER_PASS = process.env.USER_PASS || "";
export interface Contract {
  id: number;
  symbol: string;
  holding: number;
}

export interface User {
  id: number;
  username: string;
  passwordHash: string;
  contracts: Contract[];
}

const users: User[] = [
  {
    id: 5301,
    username: "user@expx.fi",
    passwordHash: hashPassword(USER_PASS),
    contracts: [{ id: 301, symbol: "eth_lido", holding: 325.1 }],
  },
];

export default users;
