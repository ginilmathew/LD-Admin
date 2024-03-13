import { Box } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../common/Header'

const HomeAdminLayout = () => {
    return (
        <Box>
            <Header />
            <Outlet />
        </Box>
    )
}

export default HomeAdminLayout