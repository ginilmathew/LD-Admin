import { Box } from '@mui/material'
import React from 'react'
import CustomModal from '../common/CustomModal'

const View = ({ close, open, label }) => {
    return (
        <Box>
            <CustomModal close={close} open={open} label={label} >
                dfdfdfdf
            </CustomModal>
        </Box>
    )
}

export default View