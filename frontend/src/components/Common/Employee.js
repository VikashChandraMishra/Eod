import { useNavigate } from "react-router-dom";

const Employee = (props) => {

    const navigate = useNavigate(null);

    const { employee } = props;

    const getEODList = (e) => {

        if (localStorage.getItem('user') === 'admin')
            navigate('/admin/eods-list', { state: { 'empID': e.target.innerText } });
        else if (localStorage.getItem('user') === 'manager')
            navigate('/manager/eod-panel', { state: { 'empID': e.target.innerText } })

    }

    return (
        <div className="col-3">
            <div className="card my-2 text-center" >
                <div className={`card-header ${employee.currentSubmission === "done" ? 'bg-success' : 'bg-danger'}`} onClick={getEODList} style={{cursor: "pointer", color: "white", fontWeight: "bold"}} >
                    {employee.empID}
                </div>
                <div className="card-body">
                    {employee.name}{ employee.reportingManager === null ? " (Manager)" : ""}
                </div>
            </div>
        </div>
    )
}

export default Employee;