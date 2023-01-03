import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Graph from "../Utilities/Graph";
import Profile from "./Profile";



const EmployeeDashboard = () => {

    const COLORS = {
        approved: "green",
        rejected: "red",
    };

    const [data, setData] = useState([{
        status: "Approved",
        value: 0,
        color: COLORS.approved,
    },
    {
        status: "Rejected",
        value: 0,
        color: COLORS.rejected,
    }]);

    useEffect(() => {

        if (!localStorage.getItem('authToken'))
            navigate('/');

        const fetchData = async () => {

            const response = await fetch('http://65.2.181.99:5000/api/employee/fetch-submission-status', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authToken': localStorage.getItem('authToken')
                }
            })

            const json = await response.json();

            if (json.success) {

                let series = [{
                    status: "Approved",
                    value: json.data.approvedPercentage,
                    color: COLORS.approved,
                },
                {
                    status: "Rejected",
                    value: json.data.rejectedPercentage,
                    color: COLORS.rejected,
                }];

                setData(series);

            }
            else alert("Cannot fetch eods' list at the moment!");
        }

        fetchData();

        // eslint-disable-next-line
    }, [])

    const navigate = useNavigate(null);


    return (
        <div className="row">
            <div className="col-6">
                <Profile />
            </div>
            <div className="col-6">
                <Graph data={data} />
            </div>
        </div>
    )
}

export default EmployeeDashboard;