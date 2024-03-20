import { Box, Stack, Tooltip } from '@mui/material'
import React, { startTransition, useCallback, useEffect, useState } from 'react'
import CustomHeading from '../../components/common/CustomHeading'
import DataTable from '../../components/common/CustomTable';
import useModal from '../../hooks/ModalHook';
import View from '../../components/OrderMangement/View';
import { ICONS } from '../../assets/ICONS';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../../hooks/SnackBarHook';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getOrderList } from '../../api/order';
import moment from 'moment';
import CustomBackDrop from '../../components/common/CustomBackDrop';

const OrderManagement = () => {


  const navigate = useNavigate()
  const showSnackbar = useSnackbar();
  const queryClient = useQueryClient();
  const [List, setlist] = useState([]);

  const { data, isError, isLoading, isFetched, refetch } = useQuery({ queryKey: ['orderList'], queryFn: getOrderList });




  useEffect(() => {
    if (data?.data?.data) {

      setlist(data?.data?.data)
    }
  }, [data?.data?.data])
  const columns = [
    {
      field: 'id',
      headerName: 'Order ID',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'isd',
      headerName: 'Post ID',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      valueGetter: (params) => params.row.payment?.post_id,
    },


    {
      field: 'lastNsame',
      headerName: 'Merchant ID',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      valueGetter: (params) => params.row.user?.id,
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
      field: 'fullName',
      headerName: 'Transaction Date',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      valueGetter: (params) => (moment(params.row.payment?.payment_details?.created).format('DD/MM/YYYY')),
    },
    {
      field: 'agesdf',
      headerName: 'Transaction ID',
      type: 'number',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      valueGetter: (params) => params.row.payment?.payment_details?.transactionId,
    },

    {
      field: 'agesdsf',
      headerName: 'Payment Status',
      type: 'number',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      valueGetter: (params) => params.row.payment?.payment_status,
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
              onClick={() => navigateToview(row.id)}
              sx={ICONS.RemoveRedEyeIcon.sx}
            />
          </Tooltip>

        </Stack>
      ),
    }
  ];




  const navigateToview = useCallback((id) => {
    navigate(`/order/${id}`)
  }, [navigate])

  const searchItem = useCallback((value) => {
    console.log({ value })
    let result = data?.data?.data?.filter((com) => com?.id.toString().toLowerCase().includes(value.toLowerCase())
      || com?.user?.first_name.toString().toLowerCase().includes(value.toLowerCase()) ||
      com?.user?.id.toString().toLowerCase().includes(value.toLowerCase()) || com?.payment?.post_id.toString().toLowerCase().includes(value.toLowerCase())

    )
    startTransition(() => {
      setlist(result)
    })
  }, [List])


  if (isLoading) {
    return (
      <Box px={5} py={2}>
        <CustomHeading label={'Order Management'} />
        <Box mt={7}>
          <DataTable id={'id'} columns={columns} rows={[]} />
        </Box>
        <CustomBackDrop loading={isLoading} />
      </Box>
    )
  }

  return (
    <Box px={5} py={2}>
      <CustomHeading label={'Order Management'} setState={searchItem} />
      <Box mt={7}>
        <DataTable id={'id'} columns={columns} rows={List} />
      </Box>
      {/* {modal.viewModal && <View open={modal.viewModal} close={closeView} label={'View Order'} hide={true} />} */}
    </Box>
  )
}

export default OrderManagement