import React from 'react'
import styled from 'styled-components'
import { data } from './Components/makeData'
import Table from './Components/Table'

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`

function App() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'React Table',
        columns: [
          {
            Header: 'Task Number',
            accessor: 'tasknum',
          },
          {
            Header: 'Title',
            accessor: 'title',
          },
          {
            Header: 'Deadline',
            accessor: 'deadline',
          },
          {
            Header: 'Due Date',
            accessor: 'duedate',
          },
          {
            Header: 'End Date',
            accessor: 'enddate',
          },
          {
            Header: 'Description',
            accessor: 'description',
          },
          {
            Header: 'Priority',
            accessor: 'priority',
          },
          {
            Header: 'Progress',
            accessor: 'progress',
          },
        ],
      }
    ],
    []
  )

  return (
    <Styles>
      <Table columns={columns} data={data} />
    </Styles>
  )
}

export default App
