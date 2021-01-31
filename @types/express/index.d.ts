import { User } from "../../src/accounts/models";

declare global {
  namespace Express {
    interface Request {
        user: User
    }
  }
}