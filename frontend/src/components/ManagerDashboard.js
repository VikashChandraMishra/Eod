import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import List from "./Admin/List";

const ManagerDashboard = () => {
    const [EODs, setEODs] = useState([]);

    const navigate = useNavigate(null);

    useEffect(() => {

        if (!localStorage.getItem('authToken'))
            navigate('/');

        const fetchData = async () => {
            const response = await fetch('http://43.205.206.201:5000/api/admin/fetch-eods', {
                method: 'GET',

                headers: {
                    'Content-Type': 'application/json',
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


    const approve = async (id) => {
        
        const response = await fetch(`http://43.205.206.201:5000/api/manager/approve-eod/${id}`, {
                method: 'GET',

                headers: {
                    'Content-Type': 'application/json',
                    'authToken': localStorage.getItem('authToken')
                },
            })

            const json = await response.json();
            if (json.success) {

                alert("Task approved!");

            } else alert(json.message);

    }

    const reject = async (id) => {
        const response = await fetch(`http://43.205.206.201:5000/api/manager/reject-eod/${id}`, {
            method: 'GET',

            headers: {
                'Content-Type': 'application/json',
                'authToken': localStorage.getItem('authToken')
            },
        })

        const json = await response.json();
        if (json.success) {

            alert("Task rejected!");

        } else alert(json.message);
    }

    const data = useMemo(() =>
        EODs,
        [EODs]
    )

    const columns = useMemo(
        () => [
            {
                Header: "Employee Username",
                accessor: "user",
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
            },
            {
                id: "action",
                Header: "Action",
                accessor: (row) => {
                    return <div>
                        <button className="btn btn-success px-4 mx-4" onClick={() => { approve(row._id) }} >Approve</button>
                        <button className="btn btn-danger px-4" onClick={() => { reject(row._id) }}>Reject</button>
                    </div>
                },
                disableGlobalFilter: true
            }
        ],
        // eslint-disable-next-line
        []
    )
    return (
        <List columns={columns} data={data} />
    )
}

export default ManagerDashboard;