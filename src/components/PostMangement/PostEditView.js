import { Box, Container, Divider, Grid, MenuItem, Typography } from '@mui/material'
import React, { useState } from 'react'
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
import { useLocation } from 'react-router-dom';


export const PostEditView = ({ close, open, label }) => {

    const location = useLocation();
    const { state } = location;



    const [companyLogoPreview, setcompanyLogoPreview] = useState(null);
    const [imagefileCmpny, setImagefileCmpny] = useState(null);
    const [coverPreview, setcoverPreview] = useState(null);
    const [imagefileCover, setImagefileCover] = useState(null);

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

    const ChangeStatus = (checked, row) => {
        let status = checked === true ? 1 : 0;
        let val = {
            id: row,
            status: status
        }

    }

    return (
        <Box px={2} py={2}>
            <CustomBackArrow label={`${state} Post`} />
            <Box px={5}>

                <Grid container spacing={2} my={2} >
                    <Grid item xl={2} lg={2} md={3} sm={4} xs={12}>
                        <CustomInput
                            readonly={false}
                            control={control}
                            error={errors.name}
                            fieldName="name"
                            fieldLabel="Merchant Name"
                        />
                    </Grid>
                    <Grid item xl={2} lg={2} md={3} sm={4} xs={12}>
                        <CustomInput
                            readonly={false}
                            control={control}
                            error={errors.name}
                            fieldName="name"
                            fieldLabel="Posted Date & Time"
                        />
                    </Grid>
                    <Grid item xl={2} lg={2} md={3} sm={4} xs={12}>
                        <CustomInput

                            readonly={false}
                            control={control}
                            error={errors.name}
                            fieldName="name"
                            fieldLabel="Deadline"
                        />
                    </Grid>
                    <Grid item xl={2} lg={2} md={3} sm={4} xs={12}>
                        <CustomInput

                            readonly={false}
                            control={control}
                            error={errors.name}
                            fieldName="name"
                            fieldLabel="Post Type"
                        />
                    </Grid>
                    <Grid item xl={2} lg={2} md={1} sm={4} xs={12}></Grid>
                    <Grid item xl={2} lg={2} md={1} sm={4} xs={12}></Grid>
                    <Grid item xl={2} lg={2} md={3} sm={4} xs={12}>
                        <CustomTextArea
                            readOnly={true}
                            control={control}
                            error={errors.product_description}
                            fieldName="Remarks* (If Rejected)"
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
                            readonly={false}
                            control={control}
                            error={errors.name}
                            fieldName="name"
                            fieldLabel="Post Button Type"
                        />
                    </Grid>
                    <Grid item xl={2} lg={2} md={3} sm={4} xs={12}>
                        <CustomImageUploader
                            ICON={""}
                            hide={false}
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
                            hide={false}
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
                            readonly={false}
                            control={control}
                            error={errors.name}
                            fieldName="name"
                            fieldLabel="Total Participants"
                        />
                    </Grid>
                    <Grid item xl={2.4} lg={2.4} md={3} sm={4} xs={12}>
                        <CustomInput
                            readonly={false}
                            control={control}
                            error={errors.name}
                            fieldName="name"
                            fieldLabel="Selected Winner Name"
                        />
                    </Grid>



                </Grid>
                <Divider />

                <CustomTitle label={'Status'} />
                <Grid container spacing={3} my={2} >
                    <Grid item xl={2.4} lg={2.4} md={3} sm={4} xs={12}>
                        <CustomSelect
                            control={control}
                            error={errors.payment_method}
                            fieldName="Approval Status"
                            fieldLabel="Approval Status"
                            size="16px"
                            value={''}
                            onChangeValue={(e) => null}
                        >
                            <MenuItem value="" disabled >
                                <em>Status</em>
                            </MenuItem>
                            {[{ id: 1, name: 'COD', value: 'COD' }].map((res, i) => (
                                <MenuItem value={res.name} >
                                    {res?.name}
                                </MenuItem>
                            ))}
                        </CustomSelect>
                    </Grid>
                    <Grid item xl={3} lg={3} md={3} sm={4} xs={12}>
                        <CustomTextArea
                            readOnly={true}
                            control={control}
                            error={errors.product_description}
                            fieldName="Remarks* (If Rejected)"
                            multiline={true}
                            height={90}
                            row={10}
                            fieldLabel="Remarks* (If Rejected)"
                        />
                    </Grid>
                </Grid>
                <Box display={'flex'} justifyContent={'center'} py={5}>
                    <CustomButton isIcon={false} label={'Update'} width={{ xl: '30%', lg: '30%', md: '30%', sm: '60%', xs: '100%' }} />

                </Box>
            </Box>
        </Box>


    )
}
