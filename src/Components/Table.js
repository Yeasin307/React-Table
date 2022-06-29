import React, { useState } from 'react';
import { useTable, useBlockLayout, useFilters, useResizeColumns, useExpanded } from 'react-table';
import { BsPlus } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { useSticky } from 'react-table-sticky';

const Table = ({ columns: userColumns, updateMyData, data, renderRowSubComponent }) => {

    // Default columns and Hiding columns section
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

    // Filtering section
    function DefaultColumnFilter({
        column: { filterValue, preFilteredRows, setFilter }
    }) {

        return (
            <input
                style={{ marginTop: '5px', height: '15px', width: '80%', border: '1px solid gray', borderRadius: '2.5px' }}
                value={filterValue || ""}
                onChange={(e) => {
                    setFilter(e.target.value || undefined);
                }}
                placeholder={'Search Here'}
            />
        );
    }

    const defaultColumn = React.useMemo(
        () => ({
            Filter: DefaultColumnFilter,
            minWidth: 75,
            width: 125,
            maxWidth: 400
        }),
        []
    );

    // Use the state and functions returned from useTable to build UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        visibleColumns,
        allColumns,
        getToggleHideAllColumnsProps,
        resetResizing
    } = useTable(
        {
            columns: userColumns,
            initialState,
            data,
            updateMyData,
            defaultColumn
        },
        useBlockLayout,
        useResizeColumns,
        useSticky,
        useFilters,
        useExpanded
    );

    // const firstPageRows = rows.slice(0, 20);

    // Render the UI for your table
    return (
        <>
            <button style={{ borderRadius: '2.5px', background: 'black', color: 'white', marginBottom: '10px', cursor: 'pointer', fontWeight: '500' }} onClick={resetResizing}>Reset Resizing</button>

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
                                    {column.Header}
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
                                <th {...column.getHeaderProps()} className="th">{column.render('Header')}
                                    <div {...column.getResizerProps()}
                                        className={`resizer ${column.isResizing ? 'isResizing' : ''}`} />
                                    <div>
                                        {column.canFilter ? column.render("Filter") : null}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody {...getTableBodyProps()} className="body">
                    {rows.map((row, i) => {
                        prepareRow(row)
                        return (
                            <React.Fragment key={i} >
                                <tr {...row.getRowProps()} className="tr">
                                    {row.cells.map(cell => {
                                        return <td {...cell.getCellProps()} className="td">{cell.render('Cell')}</td>
                                    })}
                                </tr>
                                {row.isExpanded ? (
                                    <tr>
                                        <td colSpan={visibleColumns.length}>
                                            {renderRowSubComponent({ row })}
                                        </td>
                                    </tr>
                                ) : null}
                            </React.Fragment>
                        )
                    })}
                </tbody>

            </table>
        </>
    )
};

function filterGreaterThan(rows, id, filterValue) {
    return rows.filter((row) => {
        const rowValue = row.values[id];
        return rowValue >= filterValue;
    });
}

filterGreaterThan.autoRemove = (val) => typeof val !== "number";

export default Table;