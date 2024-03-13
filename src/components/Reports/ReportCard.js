import { Box, Card, Paper, Typography } from '@mui/material'
import React, { memo, useCallback } from 'react'
import { ICONS } from '../../assets/ICONS'
import { COLOURS } from '../../assets/COLORS'

const ReportCard = ({ heading, titleL, countL, titleR, countR, onClick, active }) => {
    const onPress = () => {
        onClick(heading)
    }

    return (
        <Card  elevation={1} onClick={onPress} sx={{ padding: 1, cursor: 'pointer' }} >
            <Box display={'flex'} justifyContent={'space-between'} textAlign={'center'}>
                <Typography sx={{ fontSize: 14, fontFamily: 'Outfit-Bold' }}>{heading}</Typography>
                <ICONS.CheckCircleIcon.component sx={{ fontSize: 16, color: active === heading ? COLOURS.switchEnablebutton : COLOURS.switchDisableButton }} />
            </Box>
            <Box display={'flex'} justifyContent={'space-between'}>
                <Box display={'flex'} flexDirection={'column'} justifyContent={'flex-start'} gap={1} textAlign={'center'}>
                    <Typography sx={{ fontSize: 14, fontFamily: 'Outfit-Regular' }}>{titleL}</Typography>
                    <Typography sx={{ fontSize: 18, fontFamily: 'Outfit-Medium', color: COLOURS.textColor }}>{countL}</Typography>
                </Box>
                <Box display={'flex'} flexDirection={'column'} gap={1} textAlign={'center'}>
                    <Typography sx={{ fontSize: 14, fontFamily: 'Outfit-Regular' }}>{titleR}</Typography>
                    <Typography sx={{ fontSize: 18, fontFamily: 'Outfit-Medium', color: COLOURS.textColor }}>{countR}</Typography>
                </Box>
            </Box>
        </Card>
    )
}

export default memo(ReportCard)