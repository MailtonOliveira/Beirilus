import { expressjwt } from "express-jwt";
import { secret } from "../configs/secret"

export const auth = expressjwt({
    secret: secret.key,
    algorithms: ["HS256"],
});