


import { User } from "@prisma/client";

import { Admin } from "../class/admin";
import { Employee } from "../class/employee"
import { Customer } from "../class/customer";

export class userFactory {

    public static createUser(type: string, id: string): User {  
        if(type.toLocaleLowerCase() === "admin") {                  
            return new Admin(id);
        } else if(type.toLocaleLowerCase() === "employee") {                   
            return new Employee(id);
        } else if(type.toLocaleLowerCase() === "customer") {                   
            return new Customer(id);
        }
        return null as unknown as User;
    }
}