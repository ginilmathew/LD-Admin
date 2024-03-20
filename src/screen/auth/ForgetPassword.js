import React, { useCallback } from 'react';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery, Grid, TextField, Button, Box, Avatar, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { COLOURS } from '../../assets/COLORS';
import LOGO from '../../assets/image/logo.png';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object } from "yup";
import * as yup from "yup";
import CustomLoginInput from '../../components/common/CustomLoginInput';
import CustomButton from '../../components/common/CustomButton';
import LoginBackground from '../../components/login/LoginBackground';
import LoginLogo from '../../components/login/LoginLogo';
import { ICONS } from '../../assets/ICONS';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from '../../hooks/SnackBarHook';
import { forgetPassword } from '../../api/login';




const ForgetPassword = () => {

    const navigate = useNavigate();
    const showSnackbar = useSnackbar();

    const { mutate, isLoading, error } = useMutation({
        mutationFn: forgetPassword,
        onSuccess: async (data) => {
            showSnackbar('Sent succesfully', 'success');
            navigate('/login')
        },
        onError: (error, variables, context) => {
            showSnackbar(error?.message, 'error');
        },
    })

    const schema = object().shape({
        email: yup.string().email().required('Email is required'),
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


    const SubmitForm = (data) => {
        mutate(data)
    }
    const NavigationGoBack = useCallback(() => {
        navigate('/login')
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
                        <Grid item xl={12} xs={12}  >
                            <Typography sx={{ fontSize: 30, fontFamily: 'Outfit-Bold' }}>Forgot Password</Typography>
                        </Grid>
                        <Grid item xl={12} xs={12} sx={{ display: 'flex', justifyContent: 'center' }} >
                            <Box width={'70%'}>
                                <Typography sx={{ fontSize: 22, fontFamily: 'Outfit-Regular' }}>Enter your registered email address.</Typography>
                            </Box>

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
                        <Grid item xs={12}>
                            <CustomButton
                                onClick={handleSubmit(SubmitForm)}
                                width={'100%'}
                                label={'Confirm'}
                                isIcon={false} />
                        </Grid>
                        <Grid item xs={12}></Grid>
                        <Grid item xs={12}></Grid>
                        <Grid item xs={12}></Grid>
                        <Grid item xs={12}></Grid>
                        <Grid item xs={12}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, cursor: 'pointer' }} onClick={NavigationGoBack}>
                                <ICONS.arrowBack.component sx={ICONS.arrowBack.sx} />
                                <Typography sx={{ fontSize: 26, fontFamily: 'Outfit-Medium', color: COLOURS.secondary }}>GO BACK</Typography>
                            </Box>

                        </Grid>
                    </Box>

                </Grid>
            </Grid>
        </Grid>
    );
};

export default ForgetPassword;
