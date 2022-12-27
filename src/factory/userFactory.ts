
// import prisma from "../database/prismaClient"

// import { User, Employee } from "@prisma/client"






// export class userFactory {

//     public static createUser(tipo: string, identificador: number): User {  //  aqui "criarFuncionario" estamos delimitando que o metodo "criarFuncionario" irá esperar 2 parametros: o tipo e o identificador. E o retorno dessa função será do tipo "Funcionario"(que é a minha interface). 
//         if(tipo.toLocaleLowerCase() === "admin") {                  //  caso receba em "tipo" a string "ctps" ele criará um funcionario CTPS. Em linguagem tecnica ele retornará um "produto" do tipo funcionario "Ctps". "toLocaleLowerCase" tranformará tudo em letra minuscula idependentemente da entrada que for digitada.
//             return new Admin(identificador);
//         } else if(tipo.toLocaleLowerCase() === "employee") {                   // caso receba em "tipo" a string "MEI" ele criará um funcionario MEI.   Entao quando chamarmos esta factory em algum ponto do codigo, e derem a entrada "ctps" a factory vai instanciar um "produto" do tipo "Ctps", e a mesma coisa com a entrada "mei".
//             return new Employee(identificador);
//         }

//         return null as unknown as User;
//     }
// }