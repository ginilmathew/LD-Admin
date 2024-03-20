import { Box, Container, Divider, Grid, MenuItem, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
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
import CustomHeading from '../common/CustomHeading';
import CustomBackArrow from '../common/CustomBackArrow';
import { useNavigate, useParams } from 'react-router-dom';
import { OrderShow } from '../../api/order';
import { useQuery } from '@tanstack/react-query';
import { IMG_URL } from '../../config';

const View = ({ close, open, label }) => {

    const navigate = useNavigate();
    const { orderId } = useParams();

    const { data, isError, isLoading, isFetched, refetch } = useQuery(
        {
            queryKey: ['ordershow'],
            queryFn: () => OrderShow(orderId)
        });



        console.log({data:data?.data?.data})

    const [companyLogoPreview, setcompanyLogoPreview] = useState(null);
    const [imagefileCmpny, setImagefileCmpny] = useState(null);
    const [coverPreview, setcoverPreview] = useState(null);
    const [imagefileCover, setImagefileCover] = useState(null);


    useEffect(() => {
        if (data?.data?.data) {
            const key = data?.data?.data;
            setValue('name',key?.user?.first_name)
            setValue('email',key?.user?.email)
            setValue('mobile',key?.user?.mobile)
            setValue('type',key?.type)
            setValue('created_date',key?.created_date)
            setValue('deadline',key?.deadline)
            setValue('title',key?.title)
            setValue('description',key?.description)
            setValue('button_type',key?.button_type)
            setValue('transaction_date',key?.payment?.payment_details?.created)
            setValue('payment_method',key?.payment?.payment_method)
            setValue('transactionId',key?.payment?.payment_details?.transactionId)
            setValue('payment_status',key?.payment?.payment_details?.payment_status)
            setValue('status',key?.status)
            setValue('comment',key?.comment)
            setcoverPreview(IMG_URL + key?.price_image)
            setcompanyLogoPreview(IMG_URL + key?.post_image)
        }
    }, [data?.data?.data]);

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

    const ImageUploderCompany = () => {

    }
    const ImageUploderCover = () => {

    }

 

    return (
        <Box px={2} py={2}>
            <CustomBackArrow label={'View Order'}  />
            <Box px={5}>
                <Grid container spacing={2} my={2}>
                    <Grid item xl={2} lg={2} md={3} sm={4} xs={12}>
                        <CustomInput
                            readonly={true}
                            control={control}
                            error={errors.name}
                            fieldName="name"
                            fieldLabel="Merchant Name"
                        />
                    </Grid>
                    <Grid item xl={2} lg={2} md={3} sm={4} xs={12}>
                        <CustomInput
                            readonly={true}
                            control={control}
                            error={errors.email}
                            fieldName="email"
                            fieldLabel="Email Address"
                        />
                    </Grid>
                    <Grid item xl={2} lg={2} md={3} sm={4} xs={12}>
                        <CustomInput

                            readonly={true}
                            control={control}
                            error={errors.mobile}
                            fieldName="mobile"
                            fieldLabel="Mobile Number"
                        />
                    </Grid>
                    <Grid item xl={2} lg={2} md={3} sm={4} xs={12}>
                        <CustomInput

                            readonly={true}
                            control={control}
                            error={errors.type}
                            fieldName="type"
                            fieldLabel="Post Type"
                        />
                    </Grid>
                    <Grid item xl={2} lg={2} md={3} sm={4} xs={12}>
                        <CustomInput
                            readonly={true}
                            control={control}
                            error={errors.created_date}
                            fieldName="created_date"
                            fieldLabel="Posted Date & Time"
                        />
                    </Grid>
                    <Grid item xl={2} lg={2} md={3} sm={4} xs={12}>
                        <CustomInput
                            readonly={true}
                            control={control}
                            error={errors.deadline}
                            fieldName="deadline"
                            fieldLabel="Deadline"
                        />
                    </Grid>
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
                            error={errors.product_description}
                            fieldName="Remarks* (If Rejected)"
                            multiline={true}
                            height={90}
                            row={10}
                            fieldLabel="Post Description"
                        />
                    </Grid>
                    <Grid item xl={2} lg={2} md={3} sm={4} xs={12}>
                        <CustomInput
                            readonly={true}
                            control={control}
                            error={errors.button_type}
                            fieldName="button_type"
                            fieldLabel="Post Button Type"
                        />
                    </Grid>
                    <Grid item xl={2} lg={2} md={3} sm={4} xs={12}>
                        <CustomImageUploader
                            ICON={""}
                            hide={true}
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
                            hide={true}
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
                <CustomTitle label={'Payment Details'} />
                <Grid container spacing={2} my={2} >
                    <Grid item xl={2} lg={2} md={3} sm={4} xs={12}>
                        <CustomInput
                            readonly={true}
                            control={control}
                            error={errors.transaction_date}
                            fieldName="transaction_date"
                            fieldLabel="Transaction Date"
                        />
                    </Grid>
                    <Grid item xl={2} lg={2} md={3} sm={4} xs={12}>
                        <CustomInput
                            readonly={true}
                            control={control}
                            error={errors.payment_method}
                            fieldName="payment_method"
                            fieldLabel="Transaction Method"
                        />
                    </Grid>
                    <Grid item xl={2} lg={2} md={3} sm={4} xs={12}>
                        <CustomInput
                            readonly={true}
                            control={control}
                            error={errors.transactionId}
                            fieldName="transactionId"
                            fieldLabel="Transaction ID"
                        />
                    </Grid>
                </Grid>
                <Divider />

                <CustomTitle label={'Status'} />
                <Grid container spacing={3} my={2} >
                    <Grid item xl={2} lg={2} md={3} sm={4} xs={12}>
                        <CustomInput
                            readonly={true}
                            control={control}
                            error={errors.payment_status}
                            fieldName="payment_status"
                            fieldLabel="Payment Status"
                        />
                    </Grid>
                    <Grid item xl={2} lg={2} md={3} sm={4} xs={12}>
                        <CustomInput
                            readonly={true}
                            control={control}
                            error={errors.status}
                            fieldName="status"
                            fieldLabel="Approval Status"
                        />
                    </Grid>
                    <Grid item xl={3} lg={3} md={3} sm={4} xs={12}>
                        <CustomTextArea
                            readOnly={true}
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
               
            </Box>
        </Box>
    )
}

export default View