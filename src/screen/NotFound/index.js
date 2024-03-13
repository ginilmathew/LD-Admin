import React from 'react';
import { Typography, Container, Box } from '@mui/material';

const NotFound = () => {
    return (
        <Container maxWidth="sm">
            <Box textAlign="center" mt={8}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Page Not Found
                </Typography>
                <Typography variant="body1" gutterBottom>
                    The requested page could not be found. 😔
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Please check the URL and try again. 🔄
                </Typography>
            </Box>
        </Container>
    );
};

export default NotFound;
