import React from 'react';
import styled from 'styled-components';
import Table from './Components/Table';
import { AiOutlineRight, AiOutlineDown } from "react-icons/ai";
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Stack from '@mui/material/Stack';
import makeData from './Components/makeData';

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

      input {
        font-size: 1rem;
        padding: 5px;
        width:95%;
        margin: 0px;
        border: 0;
      }

      .resizer {
        display: inline-block;
        background: blue;
        width: 5px;
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

  const [data, setData] = React.useState(() => makeData());

  // Create an editable cell renderer
  const EditableCell = ({
    value: initialValue,
    row: { index },
    column: { id },
    updateMyData,
  }) => {
    const [value, setValue] = React.useState(initialValue)

    const onChange = e => {
      setValue(e.target.value)
    }

    const onBlur = () => {
      updateMyData(index, id, value)
    }

    React.useEffect(() => {
      setValue(initialValue)
    }, [initialValue])

    return <input value={value} onChange={onChange} onBlur={onBlur} />
  }

  // Create an editable cell renderer
  const EditableDate = ({
    value: initialValue,
    row: { index },
    column: { id },
    updateMyData,
  }) => {
    const [value, setValue] = React.useState(initialValue);

    const onChange = (newValue) => {
      setValue(newValue);
      updateMyData(index, id, value);
    }

    React.useEffect(() => {
      setValue(initialValue)
    }, [initialValue])

    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack spacing={3}>
          <DesktopDatePicker
            value={value}
            inputFormat="yyyy-MM-dd"
            onChange={onChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </Stack>
      </LocalizationProvider>
    );
  }

  const updateMyData = (rowIndex, columnId, value) => {
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value
          };
        }
        return row;
      })
    );
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Expand",
        sticky: 'left',
        id: 'expander',
        width: 75,
        Cell: ({ row }) => (
          <span {...row.getToggleRowExpandedProps()}>
            {row.isExpanded ? <AiOutlineDown /> : <AiOutlineRight />}
          </span>
        ),
      },
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
            width: 320,
            Cell: EditableCell
          }
        ],
      },
      {
        Header: 'Non-Sticky Columns',
        columns: [
          {
            Header: 'Assigned To',
            accessor: 'assignedto.name',
            width: 150,
            Cell: EditableCell
          },
          {
            Header: 'Deadline',
            accessor: 'deadline',
            width: 160,
            Cell: EditableDate
          },
          {
            Header: 'Due Date',
            accessor: 'duedate'
          },
          {
            Header: 'End Date',
            accessor: 'enddate',
            width: 160,
            Cell: EditableDate
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
            accessor: 'progress',
            Cell: EditableCell
          }
        ],
      },
    ],
    []
  )

  return (
    <Styles>
      <h4 style={{ textAlign: 'center', margin: '0px 0px 20px' }}>Welcome to React Table</h4>
      <Table
        columns={columns}
        data={data}
        updateMyData={updateMyData}
      />
    </Styles>
  )
}

export default App
