
import axios from 'axios';

class EmployeeService{
    addEmployee(data){
        return axios.post("http://localhost:8080/payroll/employee/add",data)
    }

    getAllEmployees(filter){
        let url = "http://localhost:8080/payroll/employees";
        if (filter) {
            url += `?filter=${encodeURIComponent(filter)}`;
        }
        return axios.get(url);
    }

    getEmployee(id){
        return axios.get(`http://localhost:8080/payroll/employee/${id}`)
    }

    updateEmployee(id,data){
        return axios.put(`http://localhost:8080/payroll/employee/update/${id}`,data)
    }

    deleteEmployee(id){
        return axios.delete(`http://localhost:8080/payroll/employee/delete/${id}`)
    }
}

const employeeService = new EmployeeService();

export default employeeService;