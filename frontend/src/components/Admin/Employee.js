import { useNavigate } from "react-router-dom";

const Employee = (props) => {

    const navigate = useNavigate(null);

    const { employee } = props;

    const getEODList = (e) => {

        navigate('/admin/eods-List', { state: { 'empID': e.target.innerText } })

    }

    return (
        <div className="col-3">
            <div className="card my-2 bg-light text-center" >
                <div className="card-header" onClick={getEODList} style={{cursor: "pointer"}} >
                    {employee.empID}
                </div>
                <div className="card-body">
                    {employee.name}
                </div>
            </div>
        </div>
    )
}

export default Employee;