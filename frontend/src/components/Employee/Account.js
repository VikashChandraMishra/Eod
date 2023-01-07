import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import List from "../Utilities/List.js";

const Account = () => {
    const [EODs, setEODs] = useState([]);
    const navigate = useNavigate(null);

    const addEOD = () => {
        navigate('/user/submitEOD');
    }

    useEffect(() => {

        if (!localStorage.getItem('authToken'))
            navigate('/');

        const fetchData = async () => {
            const response = await fetch('http://65.1.192.183:5000/api/common/get-user-eods', {
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
                id: "date",
                Header: "Date",
                accessor: (row) => {

                    let date = new Date(row.date);
                    return date.toDateString();

                }
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