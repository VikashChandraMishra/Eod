import { useSortBy, useTable } from "react-table"



const List = ({ columns, data }) => {

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
            columns,
            data
        },
        useSortBy
    )



    return (
        <div className="py-4 px-4">
            <div className="my-2 row">
                <div className="col-2 form-group">
                    <label htmlFor="begin" className="form-label">Begin Date:</label>
                    <input type="date" className="form-control" id="begin" name="begin" />
                </div>
                <div className="col-2 form-group">
                    <label htmlFor="end" className="form-label">End Date:</label>
                    <input type="date" className="form-control" id="end" name="end" />
                </div>
            </div>
            <table {...getTableProps()} id="list">
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render("Header")}
                                    <span>
                                        {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default List;