import { User } from "@prisma/client";

export class Customer implements User {     
    id!:         string;
    email!:      string;
    name!:       string;
    phone!:      string;     
    birth!:      Date;
    passwd!:     string;
    createdAt!:  Date;
    updatedAt!:  Date;
    typeUserId!: string;
    shiftId!:    string;



    constructor( typeUserId: string) {
        this.typeUserId = typeUserId;    
    }

    identificador(): void {
        console.log("Customer")
    }
}