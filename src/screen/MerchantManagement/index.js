import { Box, Stack, Tooltip } from '@mui/material'
import React, { useCallback } from 'react'
import CustomHeading from '../../components/common/CustomHeading'
import DataTable from '../../components/common/CustomTable';
import useModal from '../../hooks/ModalHook';
import { ICONS } from '../../assets/ICONS';
import { EditView } from '../../components/MerchantMangement/EditView';
import CustomSwitch from '../../components/common/CustomSwitch';
import { useNavigate } from 'react-router-dom';

const Merchantmanagement = () => {
  const { modal, openModal, closeModal } = useModal();

  const navigate = useNavigate()

  const ChangeStatus = (checked, row) => {
    let status = checked === true ? 1 : 0;
    let val = {
      id: row,
      status: status
    }

  }


  const columns = [
    {
      field: 'id',
      headerName: 'Merchant ID',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'firstName',
      headerName: 'First name',
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
    },
    {
      field: 'age',
      headerName: 'Username',
      type: 'number',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'fullName',
      headerName: 'Email Address',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: 'agesdf',
      headerName: 'Mobile Number',
      type: 'number',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'agesdfsdsd',
      headerName: 'Approval Status',
      type: 'number',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: ({ row }) => (
        <Stack alignItems={'center'} justifyContent={'center'} gap={1} direction={'row'}>
          <CustomSwitch
            checked={true}
            onClick={(e) => ChangeStatus(e.target.checked, row?.id)}
          />
        </Stack>
      ),
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
              onClick={navigateToView}
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

  const openView = useCallback((id) => {

    openModal('viewModal');
  }, [modal]);


  const navigateToEdit = useCallback((id) => {
    navigate('/merchantEdit/irere', { state: 'Edit' })
  }, [])
  const navigateToView = useCallback((id) => {
    navigate('/merchantView/irere', { state: 'View' })
  }, [])



  return (
    <Box px={5} py={2}>
      <CustomHeading label={'Merchant Management'} />
      <Box mt={7}>
        <DataTable id={'id'} columns={columns} rows={rows} />
      </Box>
      {/* {modal.editModal && <EditView open={modal.editModal} close={closeEdit} label={'Edit Merchant'} hide={false} />}
      {modal.viewModal && <EditView open={modal.viewModal} close={closeView} label={'View Merchant'} hide={false} />} */}
    </Box>
  )
}

export default Merchantmanagement