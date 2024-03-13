import React, { useCallback } from 'react'
import { ICONS } from '../../assets/ICONS'
import { Box, Typography } from '@mui/material'

import { COLOURS } from '../../assets/COLORS'

const CustomBackArrow = ({ label,close,back }) => {



    const NavigateToClose = useCallback(() => {
              close()
    }, [])
    return (
        <Box sx={{ display: 'flex',  alignItems: 'center', gap: 2, cursor: 'pointer' }} onClick={!back ? NavigateToClose : null}>
            {!back && <ICONS.arrowBack.component sx={ICONS.arrowBack.sx}/> }
            <Typography sx={{ fontSize: 26, fontFamily: 'Outfit-Bold', color: COLOURS.secondary }}>{label}</Typography>
        </Box>
    )
}

export default CustomBackArrow