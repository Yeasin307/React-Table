import React from 'react';
import styled from 'styled-components';
import { data } from './Components/makeData';
import Table from './Components/Table';

const Styles = styled.div`
padding: 1rem;

  .table {
    border: 1px solid #ddd;
 
    .tr {
      :last-child {
        .td {
          border-bottom: 0;
        }
      }
    }
 
    .th,
    .td {
      padding: 5px;
      border-bottom: 1px solid #ddd;
      border-right: 1px solid #ddd;
      background-color: #fff;
      overflow: hidden;
      word-wrap: break-word;
      position: relative;

      :last-child {
        border-right: 0;
      }

      .resizer {
        display: inline-block;
        background: blue;
        width: 10px;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        transform: translateX(50%);
        z-index: 1;
        touch-action:none;

        &.isResizing {
          background: red;
        }
      }
    }
 
    &.sticky {
      overflow: scroll;
      .header,
      .footer {
        position: sticky;
        z-index: 1;
        width: fit-content;
      }
 
      .header {
        top: 0;
        box-shadow: 0px 3px 3px #ccc;
      }
 
      .footer {
        bottom: 0;
        box-shadow: 0px -3px 3px #ccc;
      }
 
      .body {
        position: relative;
        z-index: 0;
      }
 
      [data-sticky-td] {
        position: sticky;
      }
 
      [data-sticky-last-left-td] {
        box-shadow: 2px 0px 3px #ccc;
      }
 
      [data-sticky-first-right-td] {
        box-shadow: -2px 0px 3px #ccc;
      }
    }
  }
`;

function App() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Sticky Columns',
        sticky: 'left',
        columns: [
          {
            Header: 'Task Number',
            accessor: 'tasknum',
            width: 150
          },
          {
            Header: 'Title',
            accessor: 'title',
            width: 320
          },

        ],
      },
      {
        Header: 'Non-Sticky Columns',
        columns: [
          {
            Header: 'Deadline',
            accessor: 'deadline'
          },
          {
            Header: 'Due Date',
            accessor: 'duedate'
          },
          {
            Header: 'End Date',
            accessor: 'enddate'
          },
          {
            Header: 'Description',
            accessor: 'description',
            width: 200
          },
          {
            Header: 'Priority',
            accessor: 'priority'
          },
          {
            Header: 'Progress',
            accessor: 'progress'
          },
          {
            Header: 'Created By',
            accessor: 'createdby',
            width: 350
          },
        ],
      },
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
