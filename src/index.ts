import { PrismaClient } from "@prisma/client";
import express from "express";
import { Request, Response } from "express";
import cors from "cors"

const prisma = new PrismaClient();

async function main() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  
  app.listen(3000, async () => {
    console.log(`🚀 Service started and listening at: http://127.0.0.1:3000`);
    try {
      await prisma.$connect();
      console.log(`😄 Connected successfuly to the database!`);

      app.get("/", (req: Request, res: Response) => {
        res.json({ message: "Servidor funcionando com sucesso" });
    });

    app.get("/healthz", (req: Request, res: Response) => {
        res.status(200).json({ message: "Servidor funcionando com sucesso" });
    });

    app.get("/pop", async (req: Request, res: Response) => {
     
      await prisma.user.create({
          data: {
              name: 'Rich',
              email: 'hello@prisma.com',
          },
      });
      res.json({ message: "Usuário criado com sucesso!" });    
      }); 

      app.get("/get-all", async (req: Request, res: Response) => {
        const users = await prisma.user.findMany({
            include: {
                posts: true
            }
            
        });
        res.json({ message: "Usuários recuperados com sucesso!", users });
    });
    } catch (error) {}
  });

}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
