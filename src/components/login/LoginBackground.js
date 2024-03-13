
import React from 'react'
import { useTheme } from '@mui/material/styles';
import { useMediaQuery, Grid, TextField, Button, Box, Avatar, Typography } from '@mui/material';
import loginImage from '../../assets/image/background.jpg';
const styles = {
    paper: {
        padding: '2rem',
    },
    image: {
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
    },
};


const LoginBackground = () => {

    const theme = useTheme();
    const isMdScreen = useMediaQuery(theme.breakpoints.up('md'));
    return (
        <>
            {isMdScreen && (
                <Grid item xs={12} sm={8} style={{ ...styles.image, backgroundImage: `url(${loginImage})`, width: '60%' }}>
                    {/* Left side with background image */}
                </Grid>
            )}
        </>

    )
}

export default LoginBackground