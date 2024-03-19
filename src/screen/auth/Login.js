import React, { useCallback, useContext } from 'react';
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
import UserContext from '../../Context/user';
import { useMutation } from '@tanstack/react-query';
import { PostLogin } from '../../api/login';
import { useSnackbar } from '../../hooks/SnackBarHook';
import CustomLoader from '../../components/common/CustomLoader';
import CustomBackDrop from '../../components/common/CustomBackDrop';

const Login = () => {

    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);
    const showSnackbar = useSnackbar();

    const schema = object().shape({
        email: yup.string().email().required('Email is required'),
        password: yup.string()
            .required('No password provided.')
            .min(6, 'Password is too short')
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



    const { mutate, isLoading, error } = useMutation({
        mutationFn: PostLogin,
        onSuccess: async (data) => {
            setUser(data?.data?.data);
            localStorage.setItem('tokenAxios', data?.data?.accessToken)
            localStorage.setItem('userData', data?.data?.data)
            // setRole(data?.data?.data?.role)
            // userStore(data?.data?.data)
            showSnackbar('Login succesfully', 'success');
            navigate('/')
        },
        onError: (error, variables, context) => {
            showSnackbar(error?.message, 'error');
        },
        // onSettled: async () => {
        //     console.log("I'm second!")
        // },
    })


    const NavigationToForgetPassword = useCallback(() => {
        navigate('/forgetpassword')
    }, [])
    const NavigationTohome = useCallback((data) => {
        mutate(data)
    }, [navigate])


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
                            <Typography sx={{ fontSize: 30, fontFamily: 'Outfit-Bold' }}>Login</Typography>
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
                                error={errors.password}
                                fieldName="password"
                                placeholder={"Password"}
                                keyValue={'password'}
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <Typography sx={{ color: COLOURS.textColor, display: 'flex', justifyContent: 'flex-end', fontSize: 18, fontFamily: 'Outfit-Medium', letterSpacing: 0.72, cursor: 'pointer' }} onClick={NavigationToForgetPassword}>Forgot Password?</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <CustomButton
                                onClick={handleSubmit(NavigationTohome)}
                                width={'100%'}
                                label={'Login'}
                                isIcon={false} />
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
            <CustomBackDrop loading={isLoading}/>
        </Grid>
    );
};

export default Login;
