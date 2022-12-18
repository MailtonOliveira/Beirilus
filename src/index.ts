import { ERRORS } from './constants/errors';
import { SUCCESS } from './constants/success';
import { PrismaClient } from "@prisma/client";
import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import routes from "./routes";
import handleError from "./middlewares/handleError";

const prisma = new PrismaClient();

async function main() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(routes);
  app.use(handleError);

  app.listen(3000, async () => {
    console.log(SUCCESS.APP.SERVEROK);
    try {
      await prisma.$connect();
      console.log(SUCCESS.DATABASE.HASCONECTIONOK);

      app.get("/", (req: Request, res: Response) => {
        res.json({ message: SUCCESS.APP.SERVERWORKER });
      });

      app.get("/healthz", (req: Request, res: Response) => {
        res.status(200).json({ message: SUCCESS.APP.SERVERWORKER });
      });
      
    } catch (error) {
      console.log(ERRORS.DATABASE.SEQERROR)
    }
  });
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
