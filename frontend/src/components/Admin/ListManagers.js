import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import List from "./List";


const ListManagers = () => {

    const [managers, setManagers] = useState([]);

    const navigate = useNavigate(null);

    useEffect(() => {

        if (!(localStorage.getItem('authToken') === "admin"))
            navigate('/');

        const fetchData = async () => {
            const response = await fetch('http://13.126.226.857:5000/api/admin/fetch-reporting-managers', {
                method: 'GET',

                headers: {
                    'Content-Type': 'application/json',
                },
            })

            const json = await response.json();
            if (json.success) {

                setManagers(json.reportingManagers);

            }
            else alert("Cannot fetch managers' list at the moment!");
        }

        fetchData();
        // eslint-disable-next-line
    }, [])

    const data = useMemo(() =>
        managers,
        [managers]
    )

    const columns = useMemo(
        () => [
            {
                Header: "Name",
                accessor: "name",
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
            }
        ],
        []
    )

    return (
        <List columns={columns} data={data} />
    )
}

export default ListManagers;