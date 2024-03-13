import React from 'react'
import { COLOURS } from '../../assets/COLORS'
import { Grid, Typography } from '@mui/material'

const CustomTitle = ({ label }) => {
    return (
        <Grid py={2} container spacing={2} justifyContent="space-between" alignItems="center">

            <Grid item xs={12} xl={10} lg={10} md={10} sm={12} >
                <Typography sx={{
                    fontSize: {
                        lg: 26,
                        md: 24,
                        sm: 20,
                        xs: 18,
                    }, letterSpacing: 0.79, color: COLOURS.title, fontFamily: 'Outfit-Medium'
                }}>{label}</Typography>
            </Grid>

        </Grid>
    )
}

export default CustomTitle