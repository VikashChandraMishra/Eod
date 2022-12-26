import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import List from "./List";

const ListEODs = () => {
    const [EODs, setEODs] = useState([]);

    const navigate = useNavigate(null);
    const location = useLocation();

    useEffect(() => {

        if (!(localStorage.getItem('authToken') === "admin"))
            navigate('/');

        const fetchData = async () => {
            const response = await fetch('http://13.126.226.857:5000/api/admin/fetch-eods', {
                method: 'GET',

                headers: {
                    'Content-Type': 'application/json',
                    'empID': location.state.empID
                },
            })

            const json = await response.json();
            if (json.success) {

                setEODs(json.eods);

            }
            else alert("Cannot fetch eods' list at the moment!");
        }

        fetchData();
        // eslint-disable-next-line
    }, [])

    const data = useMemo(() =>
        EODs,
        [EODs]
    )

    const columns = useMemo(
        () => [
            {
                Header: "ID",
                accessor: "empID",
            },
            {
                Header: "Date",
                accessor: "date",
            },
            {
                Header: "Task",
                accessor: "task",
            },
            {
                Header: "Status",
                accessor: "status",
            }
        ],
        []
    )
    return (
        <List columns={columns} data={data} />
    )
}

export default ListEODs;