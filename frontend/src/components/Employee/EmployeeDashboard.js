import Graph from "../Utilities/Graph";
import Profile from "./Profile";



const EmployeeDashboard = () => {
    return (
        <div className="row">
            <div className="col-6">
                <Profile />
            </div>
            <div className="col-6">
                <Graph />
            </div>
        </div>
    )
}

export default EmployeeDashboard;