import { Avatar } from '@mui/material'
import React from 'react'
import LOGO from '../../assets/image/logo.png';
const LoginLogo = ({width,height}) => {
    return (
        <>
            <Avatar src={LOGO} sx={{ width:width ? width :  200, height:height ? height : 200 }} variant='square' />
        </>
    )
}

export default LoginLogo