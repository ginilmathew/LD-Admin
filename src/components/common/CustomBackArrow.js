import React, { useCallback } from 'react'
import { ICONS } from '../../assets/ICONS'
import { Box, Typography } from '@mui/material'

import { COLOURS } from '../../assets/COLORS'
import { useNavigate } from 'react-router-dom'

const CustomBackArrow = ({ label, close, back, MT }) => {
const navigate = useNavigate()


    const NavigateToClose = useCallback(() => {
        navigate(-1)
    }, [])
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, cursor: 'pointer',mt:10 }} onClick={!back ? NavigateToClose : null}>
            {!back && <ICONS.arrowBack.component sx={ICONS.arrowBack.sx} />}
            <Typography sx={{ fontSize: 26, fontFamily: 'Outfit-Bold', color: COLOURS.secondary }}>{label}</Typography>
        </Box>
    )
}

export default CustomBackArrow