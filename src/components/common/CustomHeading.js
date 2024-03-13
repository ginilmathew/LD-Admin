import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { COLOURS } from '../../assets/COLORS';
import CutomSearch from './CustomSearch';

const CustomHeading = ({ label,isEnable }) => {
    return (
        <Grid container mt={8} spacing={2} justifyContent="space-between" alignItems="center">

            <Grid item xs={12} xl={10} lg={10} md={10} sm={12} >
                <Typography sx={{
                    fontSize: {
                        lg: 30,
                        md: 26,
                        sm: 20,
                        xs: 18,
                    }, letterSpacing: 0.79, color: COLOURS.secondary, fontFamily: 'Outfit-ExtraBold'
                }}>{label}</Typography>
            </Grid>
            {!isEnable && <Grid item xs={12} sm={12} xl={2} lg={2} md={2}>
                <Box display="flex" justifyContent="flex-end">
                    <CutomSearch />
                </Box> 
            </Grid> }
        </Grid>
    );
};

export default CustomHeading;
