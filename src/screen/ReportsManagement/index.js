import { Box, Grid } from '@mui/material'
import React, { useCallback, useState } from 'react'
import CustomHeading from '../../components/common/CustomHeading'
import DataTable from '../../components/common/CustomTable';
import ReportCard from '../../components/Reports/ReportCard';
import CutomSearch from '../../components/common/CustomSearch';

const ReportsMangement = () => {

  const [tab, setTab] = useState('Report management')

  console.log({ tab })

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 150,
      editable: true,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
      editable: true,
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
  ];

  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];

  const customTab = useCallback((res) => {
    setTab(res)
  }, [tab])
  return (
    <Box px={5} py={2}>
      <CustomHeading label={'Report Management'} isEnable={true} />

      {/* Main Content */}
      <Box display={'flex'} justifyContent={'space-between'} flexDirection={{ xs: 'column', md: 'row' }}>

        {/* Left Side (Report Cards) */}
        <Grid container spacing={2} my={2}>
          {[{ id: 1, value: 'Report management' }, { id: 2, value: 'Merchant management' }, { id: 3, value: 'Post Report' }].map((res) => (
            <Grid item xs={12} sm={6} md={6} xl={2} lg={2} key={res.id}>
              <ReportCard heading={res.value} countL={'00000'} active={tab} titleL={'testL'} countR={'11111'} titleR={'testR'} onClick={customTab} />
            </Grid>
          ))}
        </Grid>

        {/* Right Side (Search) */}
        <Grid item xs={12} md={4} lg={3} xl={2}>
          <CutomSearch />
        </Grid>

      </Box>

      <Box mt={4}>
        <DataTable id={'id'} columns={columns} rows={rows} />
      </Box>

    </Box>

  )
}

export default ReportsMangement
