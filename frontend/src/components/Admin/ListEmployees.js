import { useEffect, useMemo, useState } from "react";
import '../../styles/list.css'
import { useNavigate } from "react-router-dom";
import List from "./List";

const ListEmployees = () => {

    const [employees, setEmployees] = useState([]);

    const navigate = useNavigate(null);

    useEffect(() => {

        if (!(localStorage.getItem('authToken') === "admin"))
            navigate('/');

        const fetchData = async () => {
            const response = await fetch('http://127.0.0.1:5000/api/admin/fetch-employees', {
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

    const data = useMemo(() =>
        employees,
        [employees]
    )

    const columns = useMemo(
        () => [
            {
                Header: "Name",
                accessor: "name",
            },
            {
                Header: "DOB",
                accessor: "dob",
            },
            {
                Header: "Email",
                accessor: "email",
            },
            {
                Header: "Mobile Number",
                accessor: "mobile",
            },
            {
                Header: "Gender",
                accessor: "gender",
            },
            {
                Header: "Reporting Manager",
                accessor: "reportingManager"
            }
        ],
        []
    )
    return (
        <div>
            <h2 className="text-center">EMPLOYEE LIST</h2>
            <List columns={columns} data={data} />
        </div>
    )
}

export default ListEmployees;