import { PrismaClient } from "@prisma/client";
import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import routes from "./routes";

const prisma = new PrismaClient();

async function main() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(routes);

  app.listen(3000, async () => {
    console.log(`🚀 Service started and listening at: http://127.0.0.1:3000`);
    try {
      await prisma.$connect();
      console.log(`😄 Connected successfuly to the database!`);

      app.get("/", (req: Request, res: Response) => {
        res.json({ message: "Server working successfully" });
      });

      app.get("/healthz", (req: Request, res: Response) => {
        res.status(200).json({ message: "Server working successfully" });
      });
      
    } catch (error) {}
  });
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
