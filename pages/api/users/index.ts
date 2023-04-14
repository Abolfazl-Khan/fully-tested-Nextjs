// import { AuthUser, createJWT, hashPassword, passwordIsValid } from "../auth";
// import { AuthRequest } from "../middlewares";
import type { NextApiRequest, NextApiResponse } from "next";

import { createHandler } from "@/lib/api/handler";
import { getSignedInUser } from "@/lib/features/users/utils";

const handler = createHandler();
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  // auth user
  const user = await getSignedInUser(email, password);

  return res.status(200).json(user);
});

export default handler;
