import { useEffect, useState } from "react";
import Employee from "./Employee";

const Employees = () => {

    const [employees, setEmployees] = useState([]);

    useEffect(() => {

        const fetchData = async () => {

            const response = await fetch('http://65.1.192.183:5000/api/common/fetch-employees', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authToken': localStorage.getItem('authToken')
                }
            })

            const json = await response.json();

            if (json.success) {

                setEmployees(json.employees);

            } else alert("Cannot fetch employees' list at the moment!");
        }

        fetchData();
        // eslint-disable-next-line
    }, [])


    return (
        <div className="container my-4">
            <div className="row py-2">
                {
                    employees.map((employee) => {
                        return <Employee key={employee._id} employee={employee} />
                    })
                }
            </div>
        </div>
    )
}

export default Employees;