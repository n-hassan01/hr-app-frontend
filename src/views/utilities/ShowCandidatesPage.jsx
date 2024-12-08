import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Portal from '@mui/material/Portal';
import { DataGrid, GridToolbar, GridToolbarQuickFilter } from '@mui/x-data-grid';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { getCandidatesService } from '../../services/ApiServices';

function MyCustomToolbar(props) {
  return (
    <React.Fragment>
      <Portal container={() => document.getElementById('filter-panel')}>
        <GridToolbarQuickFilter />
      </Portal>
      <GridToolbar {...props} />
    </React.Fragment>
  );
}

export default function QuickFilterOutsideOfGrid() {
  const [candidateList, setCandidateList] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ref for the table container to print only the table
  const tableRef = useRef();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getCandidatesService(); // API endpoint
        if (response.data.statusCode === 200) {
          const data = response.data.data;
          console.log(data);

          // Define your custom columns and map the data to match the headers
          const customColumns = [
            { field: 'interviewDate', headerName: 'Interview Date', minWidth: 200, flex: 1 },
            { field: 'candidateNumber', headerName: 'Candidate Number', minWidth: 150, flex: 1 },
            { field: 'fullName', headerName: 'Candidate Name', minWidth: 200, flex: 1 },
            { field: 'nidNumber', headerName: 'NID_Number', minWidth: 150, flex: 1 },
            { field: 'email', headerName: 'Email', minWidth: 250, flex: 1 },
            { field: 'contactNumber', headerName: 'Contact Number', minWidth: 150, flex: 1 },
            {
              field: 'export',
              headerName: 'Export',
              minWidth: 150,
              flex: 1,
              sortable: false,
              renderCell: (params) => (
                <button
                  onClick={() => handlePrint(params.row)}
                  style={{
                    padding: '5px 10px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    background: '#1976d2',
                    color: '#fff',
                    cursor: 'pointer'
                  }}
                >
                  Print
                </button>
              )
            }
          ];

          // Filter the data to include only the defined columns
          const filteredData = data.map((row) =>
            customColumns.reduce((acc, col) => {
              acc[col.field] = row[col.field];
              return acc;
            }, {})
          );

          setColumns(customColumns);
          setCandidateList(filteredData);
        }
      } catch (error) {
        console.error('Error fetching candidate details:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Print function
  const handlePrint = (row) => {
    // Generate print content for the specific row
    const printContent = `
      <html>
        <head>
          <title>Print Candidate Details</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
            }
            h3 {
              color: #333;
            }
            pre {
              background: #f4f4f4;
              padding: 10px;
              border: 1px solid #ccc;
              border-radius: 5px;
              overflow-x: auto;
            }
          </style>
        </head>
        <body>
          <h3>Candidate Details</h3>
          <pre>${JSON.stringify(row, null, 2)}</pre>
        </body>
      </html>
    `;

    // Open a new window
    const newWindow = window.open('', '_blank', 'width=800,height=600');

    if (newWindow) {
      // Write content to the new window
      newWindow.document.open();
      newWindow.document.write(printContent);
      newWindow.document.close();

      // Focus and trigger print
      newWindow.focus();
      newWindow.print();

      // Optional: Close the new window after printing
      newWindow.close();
    } else {
      console.error('Failed to open a new print window. Please check your browser settings.');
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item>
        <Box id="filter-panel" />
      </Grid>
      <Grid item style={{ height: 400, width: '100%' }}>
        <div ref={tableRef}>
          <DataGrid
            rows={candidateList}
            columns={columns}
            loading={loading}
            getRowId={(row) => row.candidateNumber} // Adjust as per your API's unique identifier
            slots={{
              toolbar: MyCustomToolbar
            }}
            initialState={{
              filter: {
                filterModel: {
                  items: [],
                  quickFilterExcludeHiddenColumns: true
                }
              }
            }}
          />
        </div>
      </Grid>
    </Grid>
  );
}
