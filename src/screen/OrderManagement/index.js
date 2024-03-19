import { Box, Stack, Tooltip } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import CustomHeading from '../../components/common/CustomHeading'
import DataTable from '../../components/common/CustomTable';
import useModal from '../../hooks/ModalHook';
import View from '../../components/OrderMangement/View';
import { ICONS } from '../../assets/ICONS';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../../hooks/SnackBarHook';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getOrderList } from '../../api/order';

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
    },


    {
      field: 'lastNsame',
      headerName: 'Merchant ID',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'age',
      headerName: 'Merchant Name',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'fullName',
      headerName: 'Transaction Date',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: 'agesdf',
      headerName: 'Transaction ID',
      type: 'number',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },

    {
      field: 'agesdsf',
      headerName: 'Payment Status',
      type: 'number',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
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
              onClick={navigateToview}
              sx={ICONS.RemoveRedEyeIcon.sx}
            />
          </Tooltip>

        </Stack>
      ),
    }
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



  const navigateToview = useCallback(() => {
    navigate('/order/:orderId')
  }, [])




  return (
    <Box px={5} py={2}>
      <CustomHeading label={'Order Management'} />
      <Box mt={7}>
        <DataTable id={'id'} columns={columns} rows={List} />
      </Box>
      {/* {modal.viewModal && <View open={modal.viewModal} close={closeView} label={'View Order'} hide={true} />} */}
    </Box>
  )
}

export default OrderManagement