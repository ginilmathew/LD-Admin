import { Box, Grid } from '@mui/material'
import React, { useCallback, useEffect, useReducer, useState } from 'react'
import CustomHeading from '../../components/common/CustomHeading'
import DataTable from '../../components/common/CustomTable';
import ReportCard from '../../components/Reports/ReportCard';
import CutomSearch from '../../components/common/CustomSearch';
import { useQuery } from '@tanstack/react-query';
import { getReport } from '../../api/report';

const ReportsMangement = () => {

  const [tab, setTab] = useState('Customer Report')
  const { data, isError, isLoading, isFetched, refetch } = useQuery({ queryKey: ['reportList'], queryFn: getReport });

  const [task, UpdateTask] = useReducer((prev, next) => ({
    ...prev, ...next
  }), {
    userReport: [],
    merchantReport: [],
    postReport: []
  })




  useEffect(() => {
    if (data?.data) {
      UpdateTask({
        userReport: data?.data?.userReport,
        merchantReport: data?.data?.merchantReport,
        postReport: data?.data?.postReport
      })
    }
  }, [data?.data])

  const columnsPost = [
    {
      field: 'id', headerName: 'Post ID', width: 150,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 200,
      headerAlign: 'center',
      align: 'center',
      valueGetter: (params) => params.row.user?.first_name,

    },
    {
      field: 'created_date',
      headerName: 'Created Date',
      width: 220,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'age',
      headerName: 'Merchant Name',
      type: 'number',
      width: 220,
      headerAlign: 'center',
      align: 'center',
      valueGetter: (params) => params.row.user?.user_name,
    },
    {
      field: 'title',
      headerName: 'Post Title',
      sortable: false,
      width: 220,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'type',
      headerName: 'Post Type',
      width: 220,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'total_participants',
      headerName: 'Total Paticipants',
      sortable: false,
      width: 220,
      headerAlign: 'center',
      align: 'center',

    },
    {
      field: 'winner',
      headerName: 'Winner Name',
      sortable: false,
      width: 220,
      headerAlign: 'center',
      align: 'center',

    },
  ];


  const columnsMerchant = [
    {
      field: 'id', headerName: 'Merchant ID', width: 150,
      headerAlign: 'center',
      align: 'center'
    },

    {
      field: 'first_name',
      headerName: 'Merchant Name',
      width: 250,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'total',
      headerName: 'Total Posts',
      width: 250,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'normal',
      headerName: 'Normal Posts',
      width: 250,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'premium',
      headerName: 'Premium Posts',
      width: 250,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'reject',
      headerName: 'Rejected Posts',
      width: 250,
      headerAlign: 'center',
      align: 'center'
    },
  ];

  const columnsUser = [
    {
      field: 'id', headerName: 'Customer ID',
      width: 200,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'created',
      headerName: 'Registered Date',
      width: 250,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'first_name',
      headerName: 'Customer Name',
      width: 250,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'prticipated',
      headerName: 'Participated Draws',
      type: 'number',
      width: 250,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'winned',
      headerName: 'Draws Won',
      sortable: false,
      width: 250,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'like',
      headerName: 'Total Likes',

      sortable: false,
      width: 200,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'share',
      headerName: 'Total Shares',
      width: 200,
      headerAlign: 'center',
      align: 'center'
    },
  ];




  const customTab = useCallback((res) => {
    setTab(res)
  }, [tab]);

  return (
    <Box px={5} py={2}>
      <CustomHeading label={'Report'} isEnable={true} />

      {/* Main Content */}
      <Box display={'flex'} justifyContent={'space-between'} flexDirection={{ xs: 'column', md: 'row' }}>

        {/* Left Side (Report Cards) */}
        <Grid container spacing={2} my={1}>
          {[{ id: 1, value: 'Customer Report' }, { id: 2, value: 'Merchant Report' }, { id: 3, value: 'Post Report' }].map((res, i) => (
            <Grid item xs={12} sm={6} md={6} xl={2} lg={2} key={res.id}>
              <ReportCard heading={res.value} countL={i === 0 ? data?.data?.list?.totoal_customer : i === 1 ? data?.data?.list?.merchant_count  : i === 2 ? data?.data?.list?.attented_post_count : data?.data?.data?.list?.totoal_customer} active={tab}
                titleL={i === 0 ? 'Total Customers' : i === 1 ? 'Total Merchants' : i === 2 ? 'Attended Post Count' : 'Total Customers'}
                countR={i === 0 ? data?.data?.list?.attented_post_count : i === 1 ? data?.data?.list?.total_post    : i === 2 ? data?.data?.list?.recejected_post_count : data?.data?.data?.list?.attented_post_count}
                titleR={i === 0 ? 'Attended Post Count' : i === 1 ? 'Total Posts' : i === 2 ? 'Total Rejected Posts' : 'Attended Post Count'}
                onClick={customTab} />
            </Grid>
          ))}
        </Grid>

        {/* Right Side (Search) */}
        {/* <Grid item xs={12} md={4} lg={3} xl={2}>
          <CutomSearch />
        </Grid> */}
      </Box>

      <Box mt={4}>
        <DataTable 
        height={'60vh'}
        id={'id'}
          columns={
            tab === 'Customer Report' ?
              columnsUser : tab === 'Merchant Report' ?
                columnsMerchant : tab === 'Post Report' ?
                  columnsPost : columnsUser}
          rows={tab === 'Customer Report' ? task.userReport : tab === 'Merchant Report' ? task.merchantReport : tab === 'Post Report' ? task.postReport : task.userReport} />
      </Box>

    </Box>

  )
}

export default ReportsMangement
