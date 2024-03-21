import { Box, Stack, Tooltip } from '@mui/material'
import React, { startTransition, useCallback, useEffect, useState } from 'react'
import CustomHeading from '../../components/common/CustomHeading'
import DataTable from '../../components/common/CustomTable';
import { ICONS } from '../../assets/ICONS';
import CustomSwitch from '../../components/common/CustomSwitch';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getMerchantList, postMerchantSatus } from '../../api/Merchant';
import moment from 'moment';
import { useSnackbar } from '../../hooks/SnackBarHook';
import CustomLoader from '../../components/common/CustomLoader';
import CustomBackDrop from '../../components/common/CustomBackDrop';

const Merchantmanagement = () => {


  const navigate = useNavigate();
  const showSnackbar = useSnackbar();
  const queryClient = useQueryClient();
  const [List, setlist] = useState([]);

  const { data, isError, isLoading, isFetched, refetch } = useQuery({ queryKey: ['merchantList'], queryFn: getMerchantList });



  useEffect(() => {
    if (data?.data?.data) {

      setlist(data?.data?.data)
    }
  }, [data?.data?.data])


  const { mutate: mutateStatus } = useMutation({
    mutationFn: postMerchantSatus,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["merchantList"] })
      showSnackbar('Status changed successfully!', 'success');
    },
    onError: (error, variables, context) => {
      showSnackbar(error?.message, 'error');
    },

  })

  const coloredOrderStatusCell = (params) => {
    const orderStatus = params?.row?.approval_status;
    let color = 'black'; // Default color

    if (orderStatus === 'approved') {
      color = '#16af67';
    } else if (orderStatus === 'processing') {
      color = '#feb236';
    } else if (orderStatus === 'shipped') {
      color = 'blue';
    } else if (orderStatus === 'completed') {
      color = 'green';
    } else if (orderStatus === 'reject') {
      color = '#af1616';
    } else if (orderStatus === 'pending') {
      color = "#af7c16"
    }
    return <div style={{ color }}>{orderStatus}</div>;
  };


  const ChangeStatus = (checked, row) => {

    let val = {
      id: row,
      status: checked === true ? 'active' : 'inactive'
    }
    mutateStatus(val)

  }




  const columns = [
    {
      field: 'id',
      headerName: 'Merchant ID',
      width: 130,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'first_name',
      headerName: 'First name',
      width: 180,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'Created Date',
      headerName: 'Created Date',
      width: 180,
      valueGetter: (params) => (moment(params.row.created_at).format('DD/MM/YYYY')),
      headerAlign: 'center',
      align: 'center',

    },
    {
      field: 'user_name',
      headerName: 'Username',
      type: 'number',
      width: 200,
      headerAlign: 'center',
      align: 'center',

    },
    {
      field: 'email',
      headerName: 'Email Address',
      width: 250,
      headerAlign: 'center',
      align: 'center',

    },
    {
      field: 'mobile',
      headerName: 'Mobile Number',
      type: 'number',
      width: 150,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'approval status',
      headerName: 'Approval Status',
      type: 'number',
      width: 200,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => coloredOrderStatusCell(params),
    },
    {
      field: 'agesdfsdsd',
      headerName: 'Status',
      type: 'number',
      width: 180,
      headerAlign: 'center',
      align: 'center',
      renderCell: ({ row }) => (
        <Stack alignItems={'center'} justifyContent={'center'} gap={1} direction={'row'}>
          <CustomSwitch
            checked={row?.status === 'active' ? true : false}
            onClick={(e) => ChangeStatus(e.target.checked, row?.id)}
          />
        </Stack>
      ),
    },
    {

      field: 'Action',
      headerName: 'Action',
      width: 200,
      headerAlign: 'center',
      align: 'center',

      sortable: false,

      disableColumnMenu: true,

      renderCell: ({ row }) => (
        <Stack alignItems={'center'} gap={2} direction={'row'}>
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
    console.log({ id })
    navigate(`/merchantEdit/${id}`, { state: 'Edit' })
  }, [navigate]);

  const navigateToView = useCallback((id) => {
    navigate(`/merchantView/${id}`, { state: 'View' })
  }, [navigate]);

  const searchItem = useCallback((value) => {
    console.log({ value })
    let result = data?.data?.data?.filter((com) => com?.id.toString().toLowerCase().includes(value.toLowerCase())
      || com?.first_name.toString().toLowerCase().includes(value.toLowerCase()) ||
      com?.email.toString().toLowerCase().includes(value.toLowerCase()) || com?.mobile.toString().toLowerCase().includes(value.toLowerCase())

    )
    startTransition(() => {
      setlist(result)
    })
  }, [List])




  if (isLoading) {
    return (
      <>
        <Box px={5} py={2}>
          <CustomHeading label={'Merchant Management'} setState={null} />
          <Box mt={7} >
            <DataTable id={'id'} columns={columns} rows={[]} />
          </Box>

        </Box>
        <CustomBackDrop loading={isLoading} />
      </>
    )
  }



  return (
    <Box px={5} py={2}>
      <CustomHeading label={'Merchant Management'} setState={searchItem} />
      <Box mt={7} >
        <DataTable id={'id'} columns={columns} rows={List} />
      </Box>

    </Box>
  )
}

export default Merchantmanagement