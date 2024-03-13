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
const SettingScreen = () => {

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
      <CustomBackArrow back={true} label={'Settings'} />
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
              height={150}
              max={5}
              onChangeValue={imageUploder}
              preview={imagefile}
              previewEditimage={""}
              type={"file"}
              background="#e7f5f7"
              myid="contained-button-file"
              width={150}
            />
            <Typography sx={{ fontSize: 26, fontFamily: 'Outfit-Bold' }}>Set Website Logo</Typography>
            <Typography sx={{ fontSize: 16, fontFamily: 'Outfit-Light', width: '80%', textAlign: 'center' }}>This logo will be shown on all platforms.(Admin,merchant and customer)</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} xl={9} lg={9} md={9} sm={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={3} xl={3} md={6} sm={6}>
              <CustomInput
                readonly={false}
                control={control}
                error={errors.name}
                fieldName="name"
                fieldLabel="Shuffle Participants (Time)"
              />
            </Grid>
            <Grid item xs={12} lg={3} xl={3} md={6} sm={6}>
              <CustomInput
                important={true}
                readonly={false}
                control={control}
                error={errors.name}
                fieldName="name"
                fieldLabel="Draw Restriction"
              />
            </Grid>
            <Grid item xs={12} lg={3} xl={3} md={6} sm={6}>
              <CustomInput
                readonly={false}
                control={control}
                error={errors.name}
                fieldName="name"
                fieldLabel="Premium Post Price"
              />
            </Grid>
            <Grid item xs={12} lg={3} xl={3} md={6} sm={6}>
              <CustomInput
                readonly={false}
                control={control}
                error={errors.name}
                fieldName="name"
                fieldLabel="Normal Post Price"
              />
            </Grid>
            <Grid item xs={12} lg={3} xl={3} md={6} sm={6}>
              <CustomInput
                important={true}
                readonly={false}
                control={control}
                error={errors.name}
                fieldName="name"
                fieldLabel="Free Post Count"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container mt={5}>
        <Grid item xs={12} display={'flex'} justifyContent={'center'}>
          <CustomButton isIcon={false} label={'Update'} width={{ xl: '20%', lg: '20%', md: '30%', sm: '60%', xs: '100%' }} />
        </Grid>
      </Grid>
    </Box>

  )
}

export default SettingScreen