import React, { useState } from 'react'
import CustomBackArrow from '../../components/common/CustomBackArrow'
import { Box, Grid, Typography } from '@mui/material'
import CustomInput from '../../components/common/CustomInput'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object } from "yup";
import * as yup from "yup";
import CustomImageUploader from '../../components/common/CustomImageUploder';
import CustomProfileImageUploader from '../../components/common/CustomProfileImage';
import CustomButton from '../../components/common/CustomButton';
import CustomInputPassword from '../../components/common/CustomInputPassword';

const ProfileScreen = () => {

    const [imagePreview, setImagePreview] = useState(null);
    const [imagefile, setImagefile] = useState(null);


    const schema = object().shape({


    });

    const {
        handleSubmit,
        control,
        setValue,
        setError,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),

    });


    const imageUploder = (file) => {
        if (file.size <= 1000000) {
            setImagefile(file)
            setImagePreview(null)
            setValue('image', file)
            setError('image', { message: '' })

        } else {
            setImagePreview(null)
            setImagefile(null)
            // toast.warning('Image should be less than or equal 1MB')
        }
    }
    return (
        <Box px={5} py={2}>
            <CustomBackArrow back={true} label={'Profile'} />

            <Grid container spacing={2}>
                <Grid item md={3} sm={12} xs={12} xl={3} lg={3}>
                    <Box display={'flex'} justifyContent={'center'} alignItems={'center'} gap={2} flexDirection={'column'}>
                        <CustomProfileImageUploader
                            ICON={""}
                            hide={false}
                            viewImage={imagePreview}
                            error={errors.photo}
                            fieldName="photo"
                            placeholder={``}
                            fieldLabel={""}
                            control={control}
                            height={{ xl: 300, lg: 280, md: 250, sm: 200, xs: 160 }}
                            max={5}
                            onChangeValue={imageUploder}
                            preview={imagefile}
                            previewEditimage={""}
                            type={"file"}
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
                                error={errors.name}
                                fieldName="name"
                                fieldLabel="Admin Name"
                            />
                        </Grid>
                        <Grid item xs={12} lg={3} xl={3} md={6} sm={6}>
                            <CustomInput
                                readonly={false}
                                control={control}
                                error={errors.name}
                                fieldName="name"
                                fieldLabel="Email Address"
                            />
                        </Grid>
                        <Grid item xs={12} lg={3} xl={3} md={6} sm={6}>
                            <CustomInput

                                readonly={false}
                                control={control}
                                error={errors.name}
                                fieldName="name"
                                fieldLabel="Mobile Number"
                            />
                        </Grid>
                        <Grid item xs={12}  >
                            <CustomButton isIcon={false} label={'Update'} width={{ xl: '30%', lg: '30%', md: '30%', sm: '60%', xs: '100%' }} />
                        </Grid>
                    </Grid>
                    <Box sx={{ mt: 6, borderBottom: '1px solid #707070', px: 2, width: '100%', opacity: 0.2 }}>
                    </Box>
                    <Box py={3}>
                        <Typography fontFamily={'Outfit-Bold'} fontSize={18} letterSpacing={0.79}>Change Password</Typography>
                    </Box>
                    <Grid container spacing={4}>
                        <Grid item xs={12} lg={3} xl={3} md={6} sm={6}>
                            <CustomInput
                                readonly={false}
                                control={control}
                                error={errors.name}
                                fieldName="name"
                                fieldLabel="Current Password"
                            />
                        </Grid>
                        <Grid item xs={12} lg={3} xl={3} md={6} sm={6}>
                            <CustomInputPassword
                                type={'password'}
                                readonly={false}
                                control={control}
                                error={errors.name}
                                fieldName="name"
                                fieldLabel="New Password"
                            />
                        </Grid>
                        <Grid item xs={12} lg={3} xl={3} md={6} sm={6}>
                            <CustomInputPassword
                                type={'password'}
                                readonly={false}
                                control={control}
                                error={errors.name}
                                fieldName="name"
                                fieldLabel="Confirm New Password"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <CustomButton isIcon={false} label={'Update'} width={{ xl: '30%', lg: '30%', md: '30%', sm: '60%', xs: '100%' }} />

                        </Grid>


                    </Grid>

                </Grid>
            </Grid>

        </Box>

    )
}

export default ProfileScreen