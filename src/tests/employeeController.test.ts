import employeeController from "../controllers/employeeController";
import prisma from "../database/prismaClient";
import { Request } from "express";


const employee = new employeeController;


describe('employeeController', () => {
    
    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe('employeeController.__listEmployees', () => {
        it('deve retornar todos os employees cadastrados', async () => {
            const employeeId = 1;
            const employeeReq = { body:{ id:'1'} }

            const mockResponse = {
                id: String,
                createdAt: Date,
                updatedAt: Date,
                userId: String

            }

            prisma.employee.findFirst = jest.fn().mockResolvedValue(mockResponse);

            const result =  await employee.oneEmployee(employeeReq, {}, {});

            
            expect(result).toEqual(mockResponse);
            expect(prisma.employee.findFirst).toHaveBeenCalledTimes(1);
            });
        });
    });

    