import React, { useCallback } from 'react';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery, Grid, TextField, Button, Box, Avatar, Typography } from '@mui/material';

import { COLOURS } from '../../assets/COLORS';

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object } from "yup";
import * as yup from "yup";
import CustomLoginInput from '../../components/common/CustomLoginInput';
import CustomButton from '../../components/common/CustomButton';
import LoginBackground from '../../components/login/LoginBackground';
import LoginLogo from '../../components/login/LoginLogo';
import { useNavigate } from 'react-router-dom';





const Login = () => {

    const navigate = useNavigate();
    const schema = object().shape({

    });

    const {
        handleSubmit,
        control,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),

    });



    const theme = useTheme();
    const isMdScreen = useMediaQuery(theme.breakpoints.up('md'));

    const NavigationToForgetPassword = useCallback(() => {
        navigate('/forgetpassword')
    }, [])
    const NavigationTohome = useCallback(() => {
        navigate('/')
    }, [])


    return (
        <Grid container>
            {/* Left side with background image */}
            <LoginBackground />
            {/* Right side with input fields and button */}
            <Grid item xs={12} sm={isMdScreen ? 4 : 12} style={{ width: isMdScreen ? '50%' : '100%', height: '100vh' }}>
                <Grid
                    container
                    display={'flex'}
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    px={2}
                    style={{ height: '100%', textAlign: 'center', margin: 0, background: COLOURS.primary }}
                >

                    <Box sx={{ width: isMdScreen ? '70%' : '100%', gap: 3, display: 'flex', flexDirection: 'column' }}>
                        <Grid item xl={12} xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <LoginLogo />
                        </Grid>
                        <Grid item xl={12} xs={12} sx={{ display: 'flex', justifyContent: 'flex-start' }} >
                            <Typography sx={{ fontSize: 30, fontFamily:'Outfit-Bold' }}>Login</Typography>
                        </Grid>
                        <Grid item xl={12} xs={12} >
                            <CustomLoginInput
                                type={'text'}
                                control={control}
                                error={errors.email}
                                fieldName="email"
                                placeholder={"Email Address"}
                                keyValue={'email'}
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <CustomLoginInput
                                type={'password'}
                                control={control}
                                error={errors.email}
                                fieldName="email"
                                placeholder={"Password"}
                                keyValue={'email'}
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <Typography sx={{ color: COLOURS.textColor, display: 'flex', justifyContent: 'flex-end', fontSize: 18,fontFamily:'Outfit-Medium', letterSpacing: 0.72, cursor: 'pointer' }} onClick={NavigationToForgetPassword}>Forgot Password?</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <CustomButton
                                onClick={NavigationTohome}
                                width={'100%'}
                                label={'Login'}
                                isIcon={false} />
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Login;
