import { Employee, User } from '@prisma/client';


import EmployeeRepository from '../repositories/EmployeeRepository';
class EmployeeService {

    getEmployees(): Promise<Array<Employee>>{

        return  EmployeeRepository.getEmployees()
    }

    getEmployee(employeeId: string): Promise<Employee>{

        return EmployeeRepository.getEmployee(employeeId)
    }

    createEmployee(dados: User) {

        return EmployeeRepository.createEmployee(dados)
    }

    deleteEmployee(id:string) {
        return EmployeeRepository.deleteEmployee(id)
    }

}

export default new EmployeeService();