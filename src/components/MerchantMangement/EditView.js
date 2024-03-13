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

export const EditView = ({ close, open, label }) => {

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
        <Box>
            <CustomModal close={close} open={open} label={label} >
                <Box px={5}>
                    <CustomTitle label={'Personal Details'} />
                    <Grid container spacing={2} my={2} >
                        <Grid item xl={2.4} lg={2.4} md={3} sm={4} xs={12}>
                            <CustomInput

                                readonly={false}
                                control={control}
                                error={errors.name}
                                fieldName="name"
                                fieldLabel="Username"
                            />
                        </Grid>
                        <Grid item xl={2.4} lg={2.4} md={3} sm={4} xs={12}>
                            <CustomInput
                                readonly={false}
                                control={control}
                                error={errors.name}
                                fieldName="name"
                                fieldLabel="Email Address"
                            />
                        </Grid>
                        <Grid item xl={2.4} lg={2.4} md={3} sm={4} xs={12}>
                            <CustomInput

                                readonly={false}
                                control={control}
                                error={errors.name}
                                fieldName="name"
                                fieldLabel="Mobile Number"
                            />
                        </Grid>
                        <Grid item xl={2.4} lg={2.4} md={3} sm={4} xs={12}>
                            <CustomInput

                                readonly={false}
                                control={control}
                                error={errors.name}
                                fieldName="name"
                                fieldLabel="First Name"
                            />
                        </Grid>
                        <Grid item xl={2.4} lg={2.4} md={3} sm={4} xs={12}>
                            <CustomInput

                                readonly={false}
                                control={control}
                                error={errors.name}
                                fieldName="name"
                                fieldLabel="Last Name"
                            />
                        </Grid>
                        <Grid item xl={2.4} lg={2.4} md={3} sm={4} xs={12}>
                            <CustomInput
                                readonly={false}
                                control={control}
                                error={errors.name}
                                fieldName="name"
                                fieldLabel="DOB"
                            />
                        </Grid>
                        <Grid item xl={2.4} lg={2.4} md={3} sm={4} xs={12}>
                            <CustomInput
                                readonly={false}
                                control={control}
                                error={errors.name}
                                fieldName="name"
                                fieldLabel="Designation"
                            />
                        </Grid>

                    </Grid>
                    <Divider />
                    <CustomTitle label={'Business Details'} />
                    <Grid container spacing={2} my={2} >
                        <Grid item xl={2.4} lg={2.4} md={3} sm={4} xs={12}>
                            <CustomInput
                                readonly={false}
                                control={control}
                                error={errors.name}
                                fieldName="name"
                                fieldLabel="Business Name"
                            />
                        </Grid>
                        <Grid item xl={2.4} lg={2.4} md={3} sm={4} xs={12}>
                            <CustomInput
                                readonly={false}
                                control={control}
                                error={errors.name}
                                fieldName="name"
                                fieldLabel="Established Date"
                            />
                        </Grid>
                        <Grid item xl={2.4} lg={2.4} md={3} sm={4} xs={12}>
                            <CustomInput
                                readonly={false}
                                control={control}
                                error={errors.name}
                                fieldName="name"
                                fieldLabel="Company Representative"
                            />
                        </Grid>
                        <Grid item xl={2.4} lg={2.4} md={1} sm={2} xs={12}></Grid>
                        <Grid item xl={2.4} lg={2.4} md={4} sm={3} xs={12}>
                            <CustomImageUploader
                                ICON={""}
                                hide={false}
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
                                hide={false}
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
                                readonly={false}
                                control={control}
                                error={errors.name}
                                fieldName="name"
                                fieldLabel="Facebook"
                            />
                        </Grid>
                        <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
                            <CustomInput
                                readonly={false}
                                control={control}
                                error={errors.name}
                                fieldName="name"
                                fieldLabel="Tiktok"
                            />
                        </Grid>
                        <Grid item xl={4} lg={4} md={4} sm={6} xs={12}></Grid>
                        <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
                            <CustomInput
                                readonly={false}
                                control={control}
                                error={errors.name}
                                fieldName="name"
                                fieldLabel="Instagram"
                            />
                        </Grid>
                        <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
                            <CustomInput
                                readonly={false}
                                control={control}
                                error={errors.name}
                                fieldName="name"
                                fieldLabel="Twitter (X)"
                            />
                        </Grid>
                        <Grid item xl={4} lg={4} md={4} sm={6} xs={12}></Grid>
                        <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
                            <CustomInput

                                readonly={false}
                                control={control}
                                error={errors.name}
                                fieldName="name"
                                fieldLabel="LinkedIN"
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
                                checked={true}
                                onClick={(e) => ChangeStatus(e.target.checked)}
                            />
                        </Grid>



                    </Grid>
                    <Box display={'flex'} justifyContent={'center'} py={5}>
                        <CustomButton isIcon={false} label={'Update'} width={{ xl: '30%', lg: '30%', md: '30%', sm: '60%', xs: '100%' }} />

                    </Box>

                </Box>

            </CustomModal>
        </Box>
    )
}
