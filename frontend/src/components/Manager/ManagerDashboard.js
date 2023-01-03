import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeTable from "../Utilities/EmployeeTable";
import Graph from "../Utilities/Graph";

const ManagerDashboard = () => {

  const navigate = useNavigate(null);

  const COLORS = {
    submitted: "green",
    notSubmitted: "red",
  };

  const [data, setData] = useState([{
    status: "Submitted",
    value: 0,
    color: COLORS.submitted,
  },
  {
    status: "Not Submitted",
    value: 0,
    color: COLORS.notSubmitted,
  }]);

  useEffect(() => {

    if (!localStorage.getItem('authToken'))
      navigate('/');

    const fetchData = async () => {

      const response = await fetch('http://65.2.181.99:5000/api/manager/fetch-all-subordinates-submission-status', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authToken': localStorage.getItem('authToken')
        }
      })

      const json = await response.json();
      if (json.success) {
        let series = [{
          status: "Submitted",
          value: json.data.submittedPercentage,
          color: COLORS.submitted,
        },
        {
          status: "Not Submitted",
          value: json.data.notSubmittedPercentage,
          color: COLORS.notSubmitted,
        }];

        setData(series);

      }
      else alert("Cannot fetch eods' list at the moment!");
    }

    fetchData();

    // eslint-disable-next-line
  }, [])

  const getEODList = (e) => {

    let empID = e.target.innerText.split(" ")[0];

    if (localStorage.getItem('user') === 'admin')
      navigate('/admin/eods-list', { state: { 'empID': empID } });
    else if (localStorage.getItem('user') === 'manager')
      navigate('/manager/eod-panel', { state: { 'empID': empID } })

  }

  const columns = useMemo(
    () => [
      {
        id: 'guwahati',
        Header: "GUWAHATI",
        accessor: (row) => {
          return <span onClick={getEODList} style={{ cursor: "pointer" }} >{row.Guwahati}</span>
        },
      },
      {
        id: 'delhi',
        Header: "DELHI",
        accessor: (row) => {
          return <span onClick={getEODList} style={{ cursor: "pointer" }} >{row.Delhi}</span>
        },
      },
      {
        id: 'chennai',
        Header: "CHENNAI",
        accessor: (row) => {
          return <span onClick={getEODList} style={{ cursor: "pointer" }} >{row.Chennai}</span>
        },
      },
      {
        id: 'mumbai',
        Header: "MUMBAI",
        accessor: (row) => {
          return <span onClick={getEODList} style={{ cursor: "pointer" }} >{row.Mumbai}</span>
        },
      }
    ]
  )

  return (
    <div>
      <Graph data={data} />
      <EmployeeTable columns={columns} />
    </div>
  )
}

export default ManagerDashboard;