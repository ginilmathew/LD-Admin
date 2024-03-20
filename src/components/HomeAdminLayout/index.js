import { Box } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../common/Header'
import { useQuery } from '@tanstack/react-query'
import UserContext from '../../Context/user'
import { getProfile } from '../../api/profile'

const HomeAdminLayout = () => {
    const {setUser } = useContext(UserContext);



    useEffect(() => {
        const getProfileList = async () => {
            try {
                const resp = await getProfile()
                setUser(resp?.data?.data)
            } catch (err) {
            }
        }
        getProfileList()
    }, [])

    // setUser(data?.data?.data)


    return (
        <Box>
            <Header />
            <Outlet />
        </Box>
    )
}

export default HomeAdminLayout