import React, { useEffect, useState } from 'react';
import CustomBackArrow from '../../components/common/CustomBackArrow';
import { Box, Grid, Typography } from '@mui/material';
import CustomInput from '../../components/common/CustomInput';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';
import CustomProfileImageUploader from '../../components/common/CustomProfileImage';
import CustomButton from '../../components/common/CustomButton';
import CustomInputPassword from '../../components/common/CustomInputPassword';
import { UpdateProfile, UpdateProfilePassword, getProfile } from '../../api/profile';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { IMG_URL } from '../../config';
import { useSnackbar } from '../../hooks/SnackBarHook';
import * as Yup from 'yup';
import CustomBackDrop from '../../components/common/CustomBackDrop';

const ProfileScreen = () => {
    const showSnackbar = useSnackbar();
    const queryClient = useQueryClient();

    const [imagePreview, setImagePreview] = useState(null);
    const [imagefile, setImagefile] = useState(null);
    const [currentButton, setCurrentButton] = useState('');

    const { data, isError, isLoading, isFetched, refetch } = useQuery({
        queryKey: ['profile'],
        queryFn: getProfile,
    });

    useEffect(() => {
        if (data?.data?.data) {
            setValue('first_name', data?.data?.data?.first_name);
            setValue('email', data?.data?.data?.email);
            setValue('mobile', data?.data?.data?.mobile ? data?.data?.data?.mobile : null);
            setImagePreview(IMG_URL + data?.data?.data?.image);
        }
    }, [data?.data?.data]);

    const { mutate: mutateProfile, isLoading: profileisLoading, error } = useMutation({
        mutationFn: UpdateProfile,
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: ['profile'] });
            showSnackbar('Update successfully', 'success');
        },
        onError: (error, variables, context) => {
            showSnackbar(error?.message, 'error');
        },
    });

    const { mutate: mutateProfilePassword, isLoading: passwordLoading, } = useMutation({
        mutationFn: UpdateProfilePassword,
        onSuccess: async (data) => {

            showSnackbar('Update successfully', 'success');
        },
        onError: (error, variables, context) => {
            showSnackbar(error?.message, 'error');
        },
    });

    const commonSchema = object().shape({
        first_name: string().required('required'),
        email: string().required('Email is required').email('Invalid email address').required('required'),
        mobile: string().nullable().matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, 'Invalid mobile number'),
    });

    const passwordSchema = object().shape({
        old_password: string().required('Current Password is required'),
        password: string().required('New Password is required').min(6, 'Password must be at least 6 characters'),
        password_confirmation: string()
            .required('Confirm New Password is required')
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    });

    const {
        handleSubmit,
        control,
        setValue,
        setError,
        formState: { errors },
    } = useForm({
        resolver: currentButton === 'password' ? yupResolver(passwordSchema) : yupResolver(commonSchema),
    });

    const handleProfileSubmit = (data) => {
        setCurrentButton('profile');
        handleSubmit(submitProfile)(data);
    };

    const handlePasswordSubmit = (data) => {
        setCurrentButton('password');
        handleSubmit(submitPassword)(data);
    };

    const submitProfile = (data) => {
        const formData = new FormData();
        if (imagefile) {
            formData.append('image', imagefile);
        }
        formData.append('first_name', data?.first_name);
        formData.append('email', data?.email);
        formData.append('mobile', data?.mobile);
        formData.append('id', data?.data?.data?.id);
        mutateProfile(formData);
    };

    const submitPassword = (data) => {
        mutateProfilePassword(data)

        // Submit password update
        // Implement your password update logic here
    };

    const imageUploder = (file) => {
        if (file.size <= 1000000) {
            setImagefile(file);
            setImagePreview(null);
            setValue('image', file);
            setError('image', { message: '' });
        } else {
            setImagePreview(null);
            setImagefile(null);
            // toast.warning('Image should be less than or equal 1MB')
        }
    };

    return (
        <Box px={5} py={2}>
            <CustomBackArrow back={true} label={'Profile'} />

            <Grid container spacing={2} px={10}>
                <Grid item md={3} sm={12} xs={12} xl={3} lg={3}>
                    <Box display={'flex'} justifyContent={'center'} alignItems={'center'} gap={2} flexDirection={'column'}>
                        <CustomProfileImageUploader
                            ICON={''}
                            hide={false}
                            viewImage={imagePreview}
                            error={errors.photo}
                            fieldName="photo"
                            placeholder={''}
                            fieldLabel={''}
                            control={control}
                            height={{ xl: 300, lg: 280, md: 250, sm: 200, xs: 160 }}
                            max={5}
                            onChangeValue={imageUploder}
                            preview={imagefile}
                            previewEditimage={''}
                            type={'file'}
                            background="#e7f5f7"
                            myid="contained-button-file"
                            width={{ xl: 300, lg: 280, md: 250, sm: 200, xs: 160 }}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} xl={9} lg={9} md={9} sm={12}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} lg={3} xl={3} md={6} sm={6}>
                            <CustomInput
                                readonly={false}
                                control={control}
                                error={errors.first_name}
                                fieldName="first_name"
                                fieldLabel="Admin Name"
                            />
                        </Grid>
                        <Grid item xs={12} lg={3} xl={3} md={6} sm={6}>
                            <CustomInput
                                readonly={false}
                                control={control}
                                error={errors.email}
                                fieldName="email"
                                fieldLabel="Email Address"
                            />
                        </Grid>
                        <Grid item xs={12} lg={3} xl={3} md={6} sm={6}>
                            <CustomInput
                                readonly={false}
                                control={control}
                                error={errors.mobile}
                                fieldName="mobile"
                                fieldLabel="Mobile Number"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CustomButton
                                isIcon={false}
                                label={'Update'}
                                onClick={handleProfileSubmit}
                                width={{ xl: '30%', lg: '30%', md: '30%', sm: '60%', xs: '100%' }}
                            />
                        </Grid>
                    </Grid>
                    <Box sx={{ mt: 6, borderBottom: '1px solid #707070', px: 2, width: '100%', opacity: 0.2 }}></Box>
                    <Box py={3}>
                        <Typography fontFamily={'Outfit-Bold'} fontSize={18} letterSpacing={0.79}>
                            Change Password
                        </Typography>
                    </Box>
                    <Grid container spacing={4}>
                        <Grid item xs={12} lg={3} xl={3} md={6} sm={6}>
                            <CustomInput
                                type={'password'}
                                readonly={false}
                                control={control}
                                error={errors.old_password}
                                fieldName="old_password"
                                fieldLabel="Current Password"
                            />
                        </Grid>
                        <Grid item xs={12} lg={3} xl={3} md={6} sm={6}>
                            <CustomInputPassword
                                type={'password'}
                                readonly={false}
                                control={control}
                                error={errors.password}
                                fieldName="password"
                                fieldLabel="New Password"
                            />
                        </Grid>
                        <Grid item xs={12} lg={3} xl={3} md={6} sm={6}>
                            <CustomInputPassword
                                type={'password'}
                                readonly={false}
                                control={control}
                                error={errors.password_confirmation}
                                fieldName="password_confirmation"
                                fieldLabel="Confirm New Password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CustomButton
                                isIcon={false}
                                label={'Update'}
                                onClick={handlePasswordSubmit}
                                width={{ xl: '30%', lg: '30%', md: '30%', sm: '60%', xs: '100%' }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <CustomBackDrop loading={profileisLoading || passwordLoading }/>
        </Box>
    );
};

export default ProfileScreen;
