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
import CustomButton from '../common/CustomButton';
import CustomBackArrow from '../common/CustomBackArrow';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getPostListShow, updatePost } from '../../api/post';
import { useMutation, useQuery } from '@tanstack/react-query';
import { IMG_URL } from '../../config';
import { useSnackbar } from '../../hooks/SnackBarHook';
import CustomBackDrop from '../common/CustomBackDrop';


export const PostEditView = ({ close, open, label }) => {

    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location;
    const { postId } = useParams();
    const showSnackbar = useSnackbar();

    const { data, isError, isLoading, isFetched, refetch } = useQuery({ queryKey: ['postshow'], queryFn: () => getPostListShow(postId) });



    const [companyLogoPreview, setcompanyLogoPreview] = useState(null);
    const [imagefileCmpny, setImagefileCmpny] = useState(null);
    const [coverPreview, setcoverPreview] = useState(null);
    const [imagefileCover, setImagefileCover] = useState(null);
    const [statusSelect, setStatusSelect] = useState(null);
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

    useEffect(() => {
        if (data?.data?.data) {
            setValue('first_name', data?.data?.data?.user?.first_name);
            setValue('posted_data', data?.data?.data?.created_date)
            setValue('deadline', data?.data?.data?.deadline);
            setValue('post_type', data?.data?.data?.type);
            setValue('title', data?.data?.data?.title);
            setValue('description', data?.data?.data?.description);
            setValue('button_type', data?.data?.data?.button_type);
            setValue('total_participants', data?.data?.data?.total_participants);
            setValue('winner', data?.data?.data?.winner);
            setcompanyLogoPreview(IMG_URL + data?.data?.data?.post_image)
            setcoverPreview(IMG_URL + data?.data?.data?.price_image)

        }
    }, [data?.data?.data]);


    const onChageStatus = useCallback((e) => {
        const { value } = e.target;
        setValue('status', value)
        setStatusSelect(value)
    }, [statusSelect])

    const ImageUploderCompany = () => {

    }
    const ImageUploderCover = () => {

    }



    const { mutate, isLoading: settingLoading, error } = useMutation({
        mutationFn: updatePost,
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


    const SubmitPost = (data) => {
        let payload = {
            id: postId,
            status: data?.status,
            comment: data?.comment ? data?.comment : ''
        }
        mutate(payload)
    }

    return (
        <Box px={2} py={2}>
            <CustomBackArrow label={`${state} Post`} />
            <Box px={5}>

                <Grid container spacing={2} my={2} >
                    <Grid item xl={2} lg={2} md={3} sm={4} xs={12}>
                        <CustomInput
                            readonly={(state === 'View' || state === 'Edit') ? true : false}
                            control={control}
                            error={errors.first_name}
                            fieldName="first_name"
                            fieldLabel="Merchant Name"
                        />
                    </Grid>
                    <Grid item xl={2} lg={2} md={3} sm={4} xs={12}>
                        <CustomInput
                            readonly={(state === 'View' || state === 'Edit') ? true : false}
                            control={control}
                            error={errors.posted_data}
                            fieldName="posted_data"
                            fieldLabel="Posted Date & Time"
                        />
                    </Grid>
                    <Grid item xl={2} lg={2} md={3} sm={4} xs={12}>
                        <CustomInput
                            readonly={(state === 'View' || state === 'Edit') ? true : false}
                            control={control}
                            error={errors.deadline}
                            fieldName="deadline"
                            fieldLabel="Deadline"
                        />
                    </Grid>
                    <Grid item xl={2} lg={2} md={3} sm={4} xs={12}>
                        <CustomInput

                            readonly={(state === 'View' || state === 'Edit') ? true : false}
                            control={control}
                            error={errors.post_type}
                            fieldName="post_type"
                            fieldLabel="Post Type"
                        />
                    </Grid>
                    <Grid item xl={2} lg={2} md={1} sm={4} xs={12}></Grid>
                    <Grid item xl={2} lg={2} md={1} sm={4} xs={12}></Grid>
                    <Grid item xl={2} lg={2} md={3} sm={4} xs={12}>
                        <CustomTextArea
                            readOnly={true}
                            control={control}
                            error={errors.title}
                            fieldName="title"
                            multiline={true}
                            height={90}
                            row={10}
                            fieldLabel="Post Title"
                        />
                    </Grid>
                    <Grid item xl={10} lg={10} md={3} sm={4} xs={12}>
                        <CustomTextArea
                            readOnly={true}
                            control={control}
                            error={errors.description}
                            fieldName="description"
                            multiline={true}
                            height={90}
                            row={10}
                            fieldLabel="Post Description"
                        />
                    </Grid>
                    <Grid item xl={2} lg={2} md={3} sm={4} xs={12}>
                        <CustomInput
                            readonly={(state === 'View' || state === 'Edit') ? true : false}
                            control={control}
                            error={errors.button_type}
                            fieldName="button_type"
                            fieldLabel="Post Button Type"
                        />
                    </Grid>
                    <Grid item xl={2} lg={2} md={3} sm={4} xs={12}>
                        <CustomImageUploader
                            ICON={""}
                            hide={(state === 'View' || state === 'Edit') ? true : false}
                            viewImage={companyLogoPreview}
                            error={errors.photo}
                            fieldName="photo"
                            placeholder={``}
                            fieldLabel={"Post Image"}
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
                    <Grid item xl={2} lg={2} md={3} sm={4} xs={12}>
                        <CustomImageUploader
                            ICON={""}
                            hide={(state === 'View' || state === 'Edit') ? true : false}
                            viewImage={coverPreview}
                            error={errors.photo}
                            fieldName="photo"
                            placeholder={``}
                            fieldLabel={"Prize Image"}
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
                <CustomTitle label={'Participants & Winners'} />
                <Grid container spacing={2} my={2} >
                    <Grid item xl={2.4} lg={2.4} md={3} sm={4} xs={12}>
                        <CustomInput
                            readonly={(state === 'View' || state === 'Edit') ? true : false}
                            control={control}
                            error={errors.total_participants}
                            fieldName="total_participants"
                            fieldLabel="Total Participants"
                        />
                    </Grid>
                    <Grid item xl={2.4} lg={2.4} md={3} sm={4} xs={12}>
                        <CustomInput
                            readonly={(state === 'View' || state === 'Edit') ? true : false}
                            control={control}
                            error={errors.winner}
                            fieldName="winner"
                            fieldLabel="Selected Winner Name"
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
                            error={errors.status}
                            fieldName="status"
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
                </Grid>
                {state === 'Edit' &&
                <Box display={'flex'} justifyContent={'center'} py={5}>
                    <CustomButton isIcon={false} onClick={handleSubmit(SubmitPost)} label={'Update'} width={{ xl: '30%', lg: '30%', md: '30%', sm: '60%', xs: '100%' }} />

                </Box>}
                <CustomBackDrop loading={isLoading}/>
            </Box>
        </Box>


    )
}
