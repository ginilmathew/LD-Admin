import { Box, Paper, Typography } from '@mui/material'
import React from 'react'
import { ICONS } from '../../assets/ICONS'
import { COLOURS } from '../../assets/COLORS'

const ReportCard = ({ heading, titleL, countL, titleR, countR, onClick }) => {


    return (
        <Paper elevation={1} onClick={onClick} sx={{padding:1,cursor:'pointer'}} >
            <Box display={'flex'} justifyContent={'space-between'} textAlign={'center'}>
                <Typography sx={{ fontSize: 14, fontFamily: 'Outfit-Bold' }}>{heading}</Typography>
                <ICONS.CheckCircleIcon.component sx={{fontSize:16}} />
            </Box>
            <Box display={'flex'} justifyContent={'space-between'}>
                <Box display={'flex'} flexDirection={'column'} gap={1} textAlign={'center'}>
                    <Typography sx={{ fontSize: 14, fontFamily: 'Outfit-Regular' }}>{titleL}</Typography>
                    <Typography sx={{ fontSize: 18, fontFamily: 'Outfit-Medium', color: COLOURS.textColor }}>{countL}</Typography>
                </Box>
                <Box display={'flex'} flexDirection={'column'} gap={1} textAlign={'center'}>
                    <Typography sx={{ fontSize: 14, fontFamily: 'Outfit-Regular' }}>{titleR}</Typography>
                    <Typography sx={{ fontSize: 18, fontFamily: 'Outfit-Medium', color: COLOURS.textColor }}>{countR}</Typography>
                </Box>
            </Box>
        </Paper>
    )
}

export default ReportCard