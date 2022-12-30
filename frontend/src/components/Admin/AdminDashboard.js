import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Employees from "../Common/Employees";
import Graph from "../Utilities/Graph";



const Dashboard = () => {

    const navigate = useNavigate(null);

    useEffect(() => {

        if (!localStorage.getItem('authToken'))
            navigate('/');

    })

    

    return (
        <div>
            <Graph />
            <Employees />
        </div>
    )
}

export default Dashboard;