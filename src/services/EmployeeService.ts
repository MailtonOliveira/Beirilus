import { Employee } from '@prisma/client';


import EmployeeRepository from '../repositories/EmployeeRepository';
class EmployeeService {

    getEmployees(): Promise<Array<Employee>>{

        return  EmployeeRepository.getEmployees()
    }

    getEmployee(employeeId: string): Promise<Employee>{

        return EmployeeRepository.getEmployee(employeeId)
    }

    // createEmployee(dados: Employee) {

    //     return EmployeeRepository.createEmployee(dados)
    // }

}

export default new EmployeeService();