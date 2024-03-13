import { Box, Stack, Tooltip } from '@mui/material'
import React, { useCallback } from 'react'
import CustomHeading from '../../components/common/CustomHeading'
import DataTable from '../../components/common/CustomTable';
import useModal from '../../hooks/ModalHook';
import { EditView } from '../../components/PostMangement/EditView';
import { ICONS } from '../../assets/ICONS';

const PostManagement = () => {
  const { modal, openModal, closeModal } = useModal();


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
      headerName: 'Post Title',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: 'agesdf',
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
    },
    {
      field: 'agesdsf',
      headerName: 'Approval Status',
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
              onClick={() => openView(row?.id)}
              sx={ICONS.RemoveRedEyeIcon.sx}
            />
          </Tooltip>
          <Tooltip title={'edit'}>
            <ICONS.BorderColorIcon.component
              onClick={() => openEdit(row?.id)}
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


  const closeView = useCallback(() => {
    closeModal('viewModal');
  }, [modal]);

  const openEdit = useCallback((id) => {
    openModal('editModal');
  }, [modal]);

  const closeEdit = useCallback(() => {
    closeModal('editModal');
  }, [modal]);
  return (
    <Box px={5} py={2}>
      <CustomHeading label={'Post Management'} />
      <Box mt={7}>
        <DataTable id={'id'} columns={columns} rows={rows} />
      </Box>
      {modal.editModal && <EditView open={modal.editModal} close={closeEdit} label={'Edit Post'} hide={false} />}
      {modal.viewModal && <EditView open={modal.viewModal} close={closeView} label={'View Post'} hide={false} />}
    </Box>
  )
}

export default PostManagement