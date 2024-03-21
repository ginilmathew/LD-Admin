import { Box, Stack, Tooltip } from '@mui/material'
import React, { startTransition, useCallback, useEffect, useState } from 'react'
import CustomHeading from '../../components/common/CustomHeading'
import DataTable from '../../components/common/CustomTable';
import { ICONS } from '../../assets/ICONS';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getPostList } from '../../api/post';
import { useSnackbar } from '../../hooks/SnackBarHook';
import moment from 'moment';
import CustomBackDrop from '../../components/common/CustomBackDrop';

const PostManagement = () => {
  const navigate = useNavigate()

  const [List, setlist] = useState([]);

  const { data, isError, isLoading, isFetched, refetch } = useQuery({ queryKey: ['postList'], queryFn: getPostList });


  console.log({ List })
  useEffect(() => {
    if (data?.data?.data) {
      setlist(data?.data?.data)
    }
  }, [data?.data?.data])




  const coloredOrderStatusCell = (params) => {
    const orderStatus = params?.row?.status;
    let color = 'black'; // Default color

    if (orderStatus === 'approved') {
      color = '#16af67';
    } else if (orderStatus === 'processing') {
      color = '#feb236';
    } else if (orderStatus === 'shipped') {
      color = 'blue';
    } else if (orderStatus === 'completed') {
      color = 'green';
    } else if (orderStatus === 'rejected') {
      color = '#af1616';
    } else if (orderStatus === 'pending') {
      color = "#af7c16"
    }
    return <div style={{ color }}>{orderStatus}</div>;
  };


  const columns = [
    {
      field: 'id',
      headerName: 'Post ID',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },

    {
      field: 'lastName',
      headerName: 'Created Date',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      valueGetter: (params) => (moment(params.row.created_date).format('DD/MM/YYYY')),
    },
    {
      field: 'age',
      headerName: 'Merchant Name',

      flex: 1,
      headerAlign: 'center',
      align: 'center',
      valueGetter: (params) => params.row.user?.first_name,
    },
    {
      field: 'title',
      headerName: 'Post Title',
      flex: 1,
      headerAlign: 'center',
      align: 'center',

    },
    {
      field: 'total_participants',
      headerName: 'Total Participants',
      type: 'number',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'adsgesdf',
      headerName: 'Deadline',
      type: 'number',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      valueGetter: (params) => (moment(params.row.deadline).format('DD/MM/YYYY  hh:mm A')),
    },
    {
      field: 'agesdsf',
      headerName: 'Approval Status',
      type: 'number',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => coloredOrderStatusCell(params),
    },

    {

      field: 'Action',
      headerName: 'Action',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      disableColumnMenu: true,
      renderCell: ({ row }) => (
        <Stack alignItems={'center'} gap={1} direction={'row'}>
          <Tooltip title={'view'}>
            <ICONS.RemoveRedEyeIcon.component
              onClick={() => navigateToView(row?.id)}
              sx={ICONS.RemoveRedEyeIcon.sx}
            />
          </Tooltip>
        
          <Tooltip title={'edit'}>
            <ICONS.BorderColorIcon.component
              onClick={() => navigateToEdit(row?.id)}
              sx={ICONS.BorderColorIcon.sx} />
          </Tooltip> 
        </Stack>
      ),
    }
  ];



  const navigateToEdit = useCallback((id) => {
    navigate(`/postEdit/${id}`, { state: 'Edit' })
  }, [navigate]);

  const navigateToView = useCallback((id) => {
    navigate(`/postView/${id}`, { state: 'View' })
  }, [navigate]);

  const searchItem = useCallback((value) => {
    console.log({ value })
    let result = data?.data?.data?.filter((com) => com?.id.toString().toLowerCase().includes(value.toLowerCase())
      || com?.total_participants.toString().toLowerCase().includes(value.toLowerCase())

    )
    startTransition(() => {
      setlist(result)
    })
  }, [List])

  if (isLoading) {
    return (
      <Box px={5} py={2}>
        <CustomHeading label={'Post Management'} />
        <Box mt={7}>
          <DataTable id={'id'} columns={columns} rows={[]} />
        </Box>
        <CustomBackDrop loading={isLoading} />
      </Box>
    )

  }




  return (
    <Box px={5} py={2}>
      <CustomHeading label={'Post Management'} setState={searchItem} />
      <Box mt={7}>
        <DataTable id={'id'} columns={columns} rows={List} />
      </Box>

    </Box>
  )
}

export default PostManagement