import React, { useState } from 'react'
import { useTable, useBlockLayout } from 'react-table'
import { BsPlus } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { useSticky } from 'react-table-sticky';

const Table = ({ columns, data }) => {
    const [columnHidden, setColumnHidden] = useState(true);

    const IndeterminateCheckbox = React.forwardRef(
        ({ indeterminate, ...rest }, ref) => {
            const defaultRef = React.useRef()
            const resolvedRef = ref || defaultRef

            React.useEffect(() => {
                resolvedRef.current.indeterminate = indeterminate
            }, [resolvedRef, indeterminate])

            return <input type="checkbox" ref={resolvedRef} {...rest} />
        }
    )

    const initialState = { hiddenColumns: ['description', 'priority', 'progress', 'createdby'] };

    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        allColumns,
        getToggleHideAllColumnsProps,
        state,
    } = useTable(
        {
            columns,
            initialState,
            data,
        },
        useBlockLayout,
        useSticky);

    // Render the UI for your table
    return (
        <>
            {columnHidden ?
                <div style={{ position: 'fixed', right: '5px', zIndex: '3' }}>
                    <button style={{ border: "none", color: 'white', background: 'black', padding: '0', margin: '0' }} onClick={() => setColumnHidden(false)}><BsPlus size={25} /></button>
                </div>
                :
                <div style={{ position: 'fixed', right: '5px', zIndex: '3' }}>
                    <div style={{ border: '1px black solid', width: '120px', marginBottom: '5px', background: 'black', color: 'white' }}>
                        <div style={{ display: 'flex', justifyContent: 'end' }}>
                            <button style={{ color: 'white', border: "none", background: 'none', padding: '0', margin: '0' }} onClick={() => setColumnHidden(true)}><AiOutlineClose size={20} /></button>
                        </div>
                        <div>
                            <IndeterminateCheckbox {...getToggleHideAllColumnsProps()} /> Toggle
                            All
                        </div>
                        {allColumns.map(column => (
                            <div key={column.id}>
                                <label>
                                    <input type="checkbox" {...column.getToggleHiddenProps()} />{' '}
                                    {column.id}
                                </label>
                            </div>
                        ))}
                        <br />
                    </div>
                </div>
            }
            <table {...getTableProps()} className="table sticky">
                <thead className="header">
                    {headerGroups.slice(1, 2).map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()} className="tr">
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()} className="th">{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()} className="body">
                    {rows.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()} className="tr">
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()} className="td">{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <pre>{JSON.stringify(state, null, 2)}</pre>
        </>
    )
};

export default Table;