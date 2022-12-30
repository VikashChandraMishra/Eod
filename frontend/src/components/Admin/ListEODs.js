import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import List from "../Utilities/List";

const ListEODs = () => {
    const [EODs, setEODs] = useState([]);

    const navigate = useNavigate(null);
    const location = useLocation();

    useEffect(() => {

        if (!localStorage.getItem('authToken'))
            navigate('/');

        const fetchData = async () => {
            const response = await fetch('http://3.110.197.187:5000/api/common/fetch-eods', {
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
                id: "status",
                Header: "Status",
                accessor: (row) => {
                    if (row.status === "approved") {
                        return <span style={{fontSize: '25px'}}>✔</span>
                    } else if (row.status === "rejected") {
                        return <span>❌</span>
                    } else return <span>Pending</span>
                }
            }
        ],
        []
    )
    return (
        <List columns={columns} data={data} />
    )
}

export default ListEODs;