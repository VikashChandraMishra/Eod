import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Employee from "./Employee";
import Graph from "./Graph";

const Employees = () => {

    const [employees, setEmployees] = useState([]);

    const navigate = useNavigate(null);

    useEffect(() => {

        if (!(localStorage.getItem('authToken') === "admin"))
            navigate('/');

        const fetchData = async () => {
            const response = await fetch('http://13.126.226.857:5000/api/admin/fetch-employees', {
                method: 'GET',

                headers: {
                    'Content-Type': 'application/json',
                },
            })

            const json = await response.json();
            if (json.success) {

                setEmployees(json.employees);

            }
            else alert("Cannot fetch employees' list at the moment!");
        }

        fetchData();
        // eslint-disable-next-line
    }, [])


    return (
        <div className="container my-4">
            <Graph />
            <h3 className="text-center">EMPLOYEES</h3>
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