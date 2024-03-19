import React from 'react'
import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import { COLOURS } from '../../assets/COLORS';

const DataTable = ({ columns, rows, height, border, borderGrid, id, bg, rowheight }) => {
  return (

    <Box sx={ { minHeight: '100%',minwidth:'100%' } }>
      <DataGrid
        sx={ {
            background: COLOURS.table,
            borderRadius: 5,
            opacity: 1,
            fontFamily: 'Raleway, sans-serif',
            fontWeight: 'bold',
            letterSpacing: '.5px',
            border:'none',
            minHeight:'75vh'
        }}

        initialState={{
        
          pagination: {
              paginationModel: {
                  pageSize:50,
              },
          },
      }}
      
        editMode="row"
        hideFooterRowCount={true}
        rows={ rows }
        columns={ columns }
        rowHeight={rowheight ? rowheight : 60}
     
        disableRowCount={true}
      
         
        // rowsPerPageOptions={ [5] }
        disableSelectionOnClick
        experimentalFeatures={ { newEditingApi: true } }
        getRowId={ row => row[id] }
      />

    </Box>

  )
}

export default DataTable