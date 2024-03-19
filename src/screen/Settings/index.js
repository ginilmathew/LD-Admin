import React, { useEffect, useState } from 'react'
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
import { getSettings, updateSettings } from '../../api/settings';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { IMG_URL } from '../../config';
import { useSnackbar } from '../../hooks/SnackBarHook';
import CustomLoader from '../../components/common/CustomLoader';
import CustomBackDrop from '../../components/common/CustomBackDrop';
const SettingScreen = () => {

  const showSnackbar = useSnackbar();
  const queryClient = useQueryClient()

  const { data, isError, isLoading, isFetched, refetch } = useQuery({ queryKey: ['settings'], queryFn: getSettings });



  const [imagePreview, setImagePreview] = useState(null);
  const [imagefile, setImagefile] = useState(null);
  const regex = /^[0-9+\-*/().\s]+$/;
  const schema = object().shape({
    shuffle_participant_time: yup.string().matches(regex, 'only accept number').required('Required'),
    draw_restriction: yup.string().matches(regex, 'only accept number').required('Required'),
    premium_post_price: yup.string().matches(regex, 'only accept number').required('Required'),
    normal_post_price: yup.string().matches(regex, 'only accept number').required('Required'),
    free_post_count: yup.string().matches(regex, 'only accept number').required('Required'),
    tax: yup.string().matches(regex, 'only accept number').required('Required'),
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


  useEffect(() => {
    if (data?.data?.data) {
      reset(data?.data?.data)
      setImagePreview(IMG_URL + data?.data?.data?.logo)
    }
  }, [data?.data?.data])



  const { mutate, isLoading: settingLoading, error } = useMutation({
    mutationFn: updateSettings,
    onSuccess: async (data) => {

      showSnackbar('Updated succesfully!', 'success');
      await queryClient.invalidateQueries({ queryKey: ["settings"] })

    },
    onError: (error, variables, context) => {
      showSnackbar(error?.message, 'error');
    },
    // onSettled: async () => {
    //     console.log("I'm second!")
    // },
  })



  const submitForm = (value) => {


    const formData = new FormData();
    if (imagefile) {
      formData.append('logo', imagefile)
    }
    formData.append('shuffle_participant_time', value?.shuffle_participant_time)
    formData.append('draw_restriction', value?.draw_restriction)
    formData.append('premium_post_price', value?.premium_post_price)
    formData.append('normal_post_price', value?.normal_post_price)
    formData.append('free_post_count', value?.free_post_count)
    formData.append('tax', value?.tax)
    mutate(formData)
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
                error={errors.shuffle_participant_time}
                fieldName="shuffle_participant_time"
                fieldLabel="Shuffle Participants (Time)"
              />
            </Grid>
            <Grid item xs={12} lg={3} xl={3} md={6} sm={6}>
              <CustomInput
                important={true}
                readonly={false}
                control={control}
                error={errors.draw_restriction}
                fieldName="draw_restriction"
                fieldLabel="Draw Restriction"
              />
            </Grid>
            <Grid item xs={12} lg={3} xl={3} md={6} sm={6}>
              <CustomInput
                readonly={false}
                control={control}
                error={errors.premium_post_price}
                fieldName="premium_post_price"
                fieldLabel="Premium Post Price"
              />
            </Grid>
            <Grid item xs={12} lg={3} xl={3} md={6} sm={6}>
              <CustomInput
                readonly={false}
                control={control}
                error={errors.normal_post_price}
                fieldName="normal_post_price"
                fieldLabel="Normal Post Price"
              />
            </Grid>
            <Grid item xs={12} lg={3} xl={3} md={6} sm={6}>
              <CustomInput
                important={true}
                readonly={false}
                control={control}
                error={errors.free_post_count}
                fieldName="free_post_count"
                fieldLabel="Free Post Count"
              />
            </Grid>
            <Grid item xs={12} lg={3} xl={3} md={6} sm={6}>
              <CustomInput
                important={true}
                readonly={false}
                control={control}
                error={errors.tax}
                fieldName="tax"
                fieldLabel="Tax"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container mt={5}>
        <Grid item xs={12} display={'flex'} justifyContent={'center'}>
          <CustomButton isIcon={false} label={'Update'} onClick={handleSubmit(submitForm)} width={{ xl: '20%', lg: '20%', md: '30%', sm: '60%', xs: '100%' }} />
        </Grid>
      </Grid>
      <CustomBackDrop loading={settingLoading} />
    </Box>

  )
}

export default SettingScreen