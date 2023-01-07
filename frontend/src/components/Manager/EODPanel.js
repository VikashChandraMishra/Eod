import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import List from "../Utilities/List";



const EODPanel = () => {

    const [EODs, setEODs] = useState([]);
    const navigate = useNavigate(null);
    const location = useLocation();

    useEffect(() => {

        if (!localStorage.getItem('authToken'))
            navigate('/');

        const fetchData = async () => {
            
            const response = await fetch('http://65.1.192.183:5000/api/common/fetch-eods', {
                method: 'GET',

                headers: {
                    'Content-Type': 'application/json',
                    'empID': location.state.empID
                },
            })

            const json = await response.json();
            
            if (json.success) {

                setEODs(json.eods);

            } else alert("Cannot fetch eods' list at the moment!");
        
        }

        fetchData();
        // eslint-disable-next-line
    }, [])


    const approve = async (id) => {

        const response = await fetch(`http://65.1.192.183:5000/api/manager/approve-eod/${id}`, {
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
        const response = await fetch(`http://65.1.192.183:5000/api/manager/reject-eod/${id}`, {
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
                        <button className="btn btn-success px-4 mx-4" id="approve-btn" onClick={() => { approve(row._id) }} >Approve</button>
                        <button className="btn btn-danger px-4" id="reject-btn" onClick={() => { reject(row._id) }}>Reject</button>
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

export default EODPanel;