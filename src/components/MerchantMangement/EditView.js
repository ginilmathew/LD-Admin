import { Box, Container, Divider, Grid, MenuItem, Typography } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import CustomModal from '../common/CustomModal'
import CustomTitle from '../common/CustomTitle'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object } from "yup";
import * as yup from "yup";
import CustomInput from '../common/CustomInput';
import CustomImageUploader from '../common/CustomImageUploder';
import CustomSelect from '../common/CustomSelect';
import CustomTextArea from '../common/CustomTextArea';
import CustomSwitch from '../common/CustomSwitch';
import CustomButton from '../common/CustomButton';
import CustomBackArrow from '../common/CustomBackArrow';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getMerchantShow, updateMerchant } from '../../api/Merchant';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { IMG_URL } from '../../config';
import { useSnackbar } from '../../hooks/SnackBarHook';

export const EditView = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { merchantId } = useParams();
    const showSnackbar = useSnackbar();

    const { state } = location;

    const { data, isError, isLoading, isFetched, refetch } = useQuery(
        {
            queryKey: ['merchantshow'],
            queryFn: () => getMerchantShow(merchantId)
        });



    const [companyLogoPreview, setcompanyLogoPreview] = useState(null);
    const [imagefileCmpny, setImagefileCmpny] = useState(null);
    const [coverPreview, setcoverPreview] = useState(null);
    const [imagefileCover, setImagefileCover] = useState(null);
    const [statusSelect, setStatusSelect] = useState(null);
    const [switchs, setSwitchs] = useState(null)

    const schema = object().shape({
        facebook_link: yup.string().url('Invalid Facebook URL').nullable(),
        tiktok_link: yup.string().url('Invalid TikTok URL').nullable(),
        instagram_link: yup.string().url('Invalid Instagram URL').nullable(),
        x_link: yup.string().url('Invalid Twitter (X) URL').nullable(),
        linkedin_link: yup.string().url('Invalid LinkedIn URL').nullable(),

    });

    const {
        handleSubmit,
        control,
        setValue,
        setError,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),

    });



    useEffect(() => {
        if (data?.data?.data) {
            reset(data?.data?.data);
            setValue('company_name', data?.data?.data?.company?.name);
            setValue('comments', data?.data?.data?.comments)
            setValue('established_date', data?.data?.data?.company?.established_date);
            setValue('representative_name', data?.data?.data?.company?.representative_name);
            setcoverPreview(IMG_URL + data?.data?.data?.company?.cover_image);
            setcompanyLogoPreview(IMG_URL + data?.data?.data?.company?.logo);
            setValue('tiktok_link', data?.data?.data?.company?.tiktok_link === "null" ? "" : data?.data?.data?.company?.tiktok_link);
            setValue('instagram_link', data?.data?.data?.company?.instagram_link === "null" ? "" : data?.data?.data?.company?.instagram_link);
            setValue('linkedin_link', data?.data?.data?.company?.linkedin_link === "null" ? "" : data?.data?.data?.company?.linkedin_link);
            setValue('facebook_link', data?.data?.data?.company?.facebook_link === "null" ? "" : data?.data?.data?.company?.facebook_link);
            setValue('x_link', data?.data?.data?.company?.x_link === "null" ? "" : data?.data?.data?.company?.x_link);
            setStatusSelect(data?.data?.data?.approval_status);
            setSwitchs(data?.data?.data?.status === "active" ? true : false)
        }
    }, [data?.data?.data]);


    const ImageUploderCompany = (file) => {
        if (file.size <= 1000000) {
            setImagefileCmpny(file);
            setcompanyLogoPreview(null);

        } else {
            setcompanyLogoPreview(null);
            setImagefileCmpny(null);
        }

    }
    const ImageUploderCover = (file) => {
        if (file.size <= 1000000) {
            setImagefileCover(file);
            setcoverPreview(null);
            // setValue('image', file);
            // setError('image', { message: '' });
        } else {
            setcoverPreview(null);
            setImagefileCover(null);
        }
    }

    const ChangeStatus = (checked) => {
        setValue('status', checked === true ? 'active' : 'inactive')
        setSwitchs(checked)

    }


    const onChageStatus = useCallback((e) => {
        const { value } = e.target;
        setValue('approval_status', value)
        setStatusSelect(value)
    }, [statusSelect])



    const { mutate, isLoading: settingLoading, error } = useMutation({
        mutationFn: updateMerchant,
        onSuccess: async (data) => {

            showSnackbar('Updated succesfully!', 'success');
            navigate(-1)

        },
        onError: (error, variables, context) => {
            showSnackbar(error?.message, 'error');
        },
        // onSettled: async () => {
        //     console.log("I'm second!")
        // },
    })


    const subMitForm = (data) => {


        const formData = new FormData();
        if (imagefileCmpny) {
            formData.append('logo', imagefileCmpny)
        }
        if (imagefileCover) {
            formData.append('cover_image', imagefileCover)
        }
        formData.append('id', merchantId)
        formData.append('first_name', data?.first_name)
        formData.append('last_name', data?.last_name)
        formData.append('dob', data?.dob)
        formData.append('company_name', data?.company_name)
        formData.append('designation', data?.designation)
        formData.append('established_date', data?.established_date)
        formData.append('representative_name', data?.representative_name)
        formData.append('facebook_link', data?.facebook_link)
        formData.append('tiktok_link', data?.tiktok_link)
        formData.append('instagram_link', data?.instagram_link)
        formData.append('linkedin_link', data?.linkedin_link);
        formData.append('x_link', data?.x_link)
        formData.append('approval_status', data?.approval_status);
        formData.append('status', data?.status)
        formData.append('comment', data?.comment)
        mutate(formData)
    }



    return (
        <Box px={2} py={2}>
            <CustomBackArrow label={`${state} Merchant`} />
            <Box px={5}>
                <CustomTitle label={'Personal Details'} />
                <Grid container spacing={2} my={2} >
                    <Grid item xl={2.4} lg={2.4} md={3} sm={4} xs={12}>
                        <CustomInput

                            readonly={(state === 'View' || state === 'Edit') ? true : false}
                            control={control}
                            error={errors.user_name}
                            fieldName="user_name"
                            fieldLabel="Username"
                        />
                    </Grid>
                    <Grid item xl={2.4} lg={2.4} md={3} sm={4} xs={12}>
                        <CustomInput
                            readonly={(state === 'View' || state === 'Edit') ? true : false}
                            control={control}
                            error={errors.email}
                            fieldName="email"
                            fieldLabel="Email Address"
                        />
                    </Grid>
                    <Grid item xl={2.4} lg={2.4} md={3} sm={4} xs={12}>
                        <CustomInput
                            readonly={(state === 'View' || state === 'Edit') ? true : false}
                            control={control}
                            error={errors.mobile}
                            fieldName="mobile"
                            fieldLabel="Mobile Number"
                        />
                    </Grid>
                    <Grid item xl={2.4} lg={2.4} md={3} sm={4} xs={12}>
                        <CustomInput
                            readonly={(state === 'View' || state === 'Edit') ? true : false}
                            control={control}
                            error={errors.first_name}
                            fieldName="first_name"
                            fieldLabel="First Name"
                        />
                    </Grid>
                    <Grid item xl={2.4} lg={2.4} md={3} sm={4} xs={12}>
                        <CustomInput
                            readonly={state === 'View' ? true : false}
                            control={control}
                            error={errors.last_name}
                            fieldName="last_name"
                            fieldLabel="Last Name"
                        />
                    </Grid>
                    <Grid item xl={2.4} lg={2.4} md={3} sm={4} xs={12}>
                        <CustomInput
                            readonly={(state === 'View' || state === 'Edit') ? true : false}
                            control={control}
                            error={errors.dob}
                            fieldName="dob"
                            fieldLabel="DOB"
                        />
                    </Grid>
                    <Grid item xl={2.4} lg={2.4} md={3} sm={4} xs={12}>
                        <CustomInput
                            readonly={(state === 'View' || state === 'Edit') ? true : false}
                            control={control}
                            error={errors.designation}
                            fieldName="designation"
                            fieldLabel="Designation"
                        />
                    </Grid>

                </Grid>
                <Divider />
                <CustomTitle label={'Business Details'} />
                <Grid container spacing={2} my={2} >
                    <Grid item xl={2.4} lg={2.4} md={3} sm={4} xs={12}>
                        <CustomInput
                            readonly={(state === 'View' || state === 'Edit') ? true : false}
                            control={control}
                            error={errors.company_name}
                            fieldName="company_name"
                            fieldLabel="Business Name"
                        />
                    </Grid>
                    <Grid item xl={2.4} lg={2.4} md={3} sm={4} xs={12}>
                        <CustomInput
                            readonly={(state === 'View' || state === 'Edit') ? true : false}
                            control={control}
                            error={errors.established_date}
                            fieldName="established_date"
                            fieldLabel="Established Date"
                        />
                    </Grid>
                    <Grid item xl={2.4} lg={2.4} md={3} sm={4} xs={12}>
                        <CustomInput
                            readonly={(state === 'View' || state === 'Edit') ? true : false}
                            control={control}
                            error={errors.representative_name}
                            fieldName="representative_name"
                            fieldLabel="Company Representative"
                        />
                    </Grid>
                    <Grid item xl={4} lg={4} md={1} sm={2} xs={12}></Grid>
                    <Grid item xl={2.4} lg={2.4} md={4} sm={3} xs={12}>
                        <CustomImageUploader
                            ICON={""}
                            hide={state === 'View' ? true : false}
                            viewImage={companyLogoPreview}
                            error={errors.photo}
                            fieldName="photo"
                            placeholder={``}
                            fieldLabel={"Company Logo"}
                            control={control}
                            height={{ xl: 160, lg: 150, md: 150, sm: 150, xs: 140 }}
                            max={5}
                            onChangeValue={ImageUploderCompany}
                            preview={imagefileCmpny}
                            previewEditimage={""}
                            type={"file"}
                            background="#e7f5f7"
                            myid="contained-button-file"
                            width={'100%'}
                        />

                    </Grid>

                    <Grid item xl={4.8} lg={4.8} md={4} sm={6} xs={12}>
                        <CustomImageUploader

                            ICON={""}
                            hide={state === 'View' ? true : false}
                            viewImage={coverPreview}
                            error={errors.photo}
                            fieldName="photo"
                            placeholder={``}
                            fieldLabel={"Cover Picture"}
                            control={control}
                            height={{ xl: 160, lg: 150, md: 150, sm: 150, xs: 140 }}
                            max={5}
                            onChangeValue={ImageUploderCover}
                            preview={imagefileCover}
                            previewEditimage={""}
                            type={"file"}
                            background="#e7f5f7"
                            myid="contained-button-file"
                            width={'100%'}
                        />
                    </Grid>

                </Grid>
                <Divider />
                <CustomTitle label={'Social Media Links'} />
                <Grid container spacing={4} my={2} >
                    <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
                        <CustomInput
                            readonly={state === 'View' ? true : false}
                            control={control}
                            error={errors.facebook_link}
                            fieldName="facebook_link"
                            fieldLabel="Facebook"
                        />
                    </Grid>
                    <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
                        <CustomInput
                            readonly={state === 'View' ? true : false}
                            control={control}
                            error={errors.tiktok_link}
                            fieldName="tiktok_link"
                            fieldLabel="Tiktok"
                        />
                    </Grid>
                    <Grid item xl={4} lg={4} md={4} sm={6} xs={12}></Grid>
                    <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
                        <CustomInput
                            readonly={state === 'View' ? true : false}
                            control={control}
                            error={errors.instagram_link}
                            fieldName="instagram_link"
                            fieldLabel="Instagram"
                        />
                    </Grid>
                    <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
                        <CustomInput
                            readonly={state === 'View' ? true : false}
                            control={control}
                            error={errors.x_link}
                            fieldName="x_link"
                            fieldLabel="Twitter (X)"
                        />
                    </Grid>
                    <Grid item xl={4} lg={4} md={4} sm={6} xs={12}></Grid>
                    <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
                        <CustomInput
                            readonly={state === 'View' ? true : false}
                            control={control}
                            error={errors.linkedin_link}
                            fieldName="linkedin_link"
                            fieldLabel="LinkedIN"
                        />
                    </Grid>


                </Grid>
                <Divider />
                <CustomTitle label={'Status'} />
                <Grid container spacing={3} my={2} >
                    <Grid item xl={2.4} lg={2.4} md={3} sm={4} xs={12}>
                        <CustomSelect
                            readOnly={state === 'View' ? true : false}
                            control={control}
                            error={errors.approval_status}
                            fieldName="approval_status"
                            fieldLabel="Approval Status"
                            size="16px"
                            value={statusSelect}
                            onChangeValue={(e) => onChageStatus(e)}
                        >
                            <MenuItem value="" disabled >
                                <em>Status</em>
                            </MenuItem>
                            {[{ id: 1, name: 'Approved', value: 'approved' }, { id: 2, name: 'Rejected', value: 'reject' },
                                // { id: 2, name: 'Pending', value: 'pending' }
                            ].map((res, i) => (
                                <MenuItem value={res.value} >
                                    {res?.name}
                                </MenuItem>
                            ))}
                        </CustomSelect>
                    </Grid>
                    <Grid item xl={3} lg={3} md={3} sm={4} xs={12}>
                        <CustomTextArea
                            readOnly={state === 'View' ? true : false}
                            control={control}
                            error={errors.comment}
                            fieldName="comment"
                            multiline={true}
                            height={90}
                            row={10}
                            fieldLabel="Remarks* (If Rejected)"
                        />
                    </Grid>
                    <Grid item xl={2.4} lg={2.4} md={3} sm={4} xs={12}>
                        <Typography sx={{
                            paddingLeft: '5px',
                            fontSize: {
                                lg: 16,
                                md: 14,
                                sm: 13,
                                xs: 12,
                            },
                            fontFamily: 'Raleway, sans-serif',
                            fontWeight: "bold"
                        }}>{`Status`}

                        </Typography>
                        <CustomSwitch
                            checked={switchs}
                            onClick={state === 'View' ? null : (e) => ChangeStatus(e.target.checked)}
                        />
                    </Grid>
                </Grid>
                {state === 'Edit' &&
                    <Box display={'flex'} justifyContent={'center'} py={5}>
                        <CustomButton onClick={handleSubmit(subMitForm)} isIcon={false} label={'Update'} width={{ xl: '30%', lg: '30%', md: '30%', sm: '60%', xs: '100%' }} />
                    </Box>}

            </Box>


        </Box>
    )
}
