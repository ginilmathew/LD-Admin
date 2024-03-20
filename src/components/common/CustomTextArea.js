import React, { memo, useState } from "react";
import { Controller } from "react-hook-form";
import { FormGroup, Typography, Stack, Button } from "@mui/material";
import { COLOURS } from "../../assets/COLORS";
const CustomTextArea = ({
  fieldName,
  control,
  fieldLabel,
  placeholder,
  error,
  readOnly

}) => {



  return (
    <>
      <FormGroup>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <Typography fontFamily={'Outfit-Medium'}  px={'3px'} mb={'2px'}
            sx={{
              fontSize: {
                lg: 16,
                md: 14,
                sm: 12,
                xs: 11,
              },

            }}>{fieldLabel}</Typography>
          {/* {buttonEnable && <CustomButton onClick={onClick} label={buttonText ? buttonText : "Open"} />} */}

        </Stack>

        <Controller
          name={fieldName}
          control={control}
          render={({ field: { value, onChange, onBlur } }) => (
            <textarea
            readOnly={readOnly}
              rows="6"
              onChange={onChange}
              value={value}
              style={{border:'none',background:COLOURS.table,paddingLeft:1,borderRadius:5,paddingTop:1}}

            />
          )}
        />
        {error && (
          <p
            role="alert"
            style={{
              color: "red",
              display: "flex",
              flexDirection: "start",
              paddingLeft: "10px",
              fontSize: "12px",
            }}
          >
            {error?.message}
          </p>
        )}
      </FormGroup>
    </>
  );
};

export default memo(CustomTextArea);