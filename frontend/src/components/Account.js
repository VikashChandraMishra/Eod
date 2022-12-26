import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import List from "./Admin/List.js";

const Account = () => {
    const [EODs, setEODs] = useState([]);

    const navigate = useNavigate(null);

    const addEOD = () => {
        navigate('/employee/submitEOD');
    }

    useEffect(() => {

        if (!localStorage.getItem('authToken'))
            navigate('/');

        const fetchData = async () => {
            const response = await fetch('http://13.126.226.857:5000/api/employee/get-user-eods', {
                method: 'GET',

                headers: {
                    'Content-Type': 'application/json',
                    'authToken': localStorage.getItem('authToken')
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
        <div>
            <div className="px-4">
                <h3 className="text-center my-2">EOD History</h3>
                <button className="btn btn-primary" onClick={addEOD}>Add New EOD</button>
            </div>
            <List columns={columns} data={data} />
        </div>
    )
}

export default Account;