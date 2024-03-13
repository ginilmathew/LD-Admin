import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { FormGroup, Typography, Stack, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { TextareaAutosize } from '@mui/base';
import { COLOURS } from "../../assets/COLORS";
const CustomTextArea = ({
  fieldName,
  control,
  fieldLabel,
  placeholder,
  error,
  type,
  maxrow,
  rows,
  height,
  multiline,
  background,
  boxshadow,
  readOnly,
  buttonEnable,
  onClick,
  buttonText,
  changeValue,
  defaultValue,
  view
}) => {

  const [show, setShow] = useState(false)

  const styles = theme => ({
    field: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      height: '30px !important'
    },
  });


  return (
    <>
      <FormGroup>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <Typography fontFamily={'Raleway, sans-serif'} fontWeight={'700'} px={'3px'} mb={'2px'}
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
              rows="4"
              onChange={onChange}
              value={value}
              style={{border:'none',background:COLOURS.table,paddingLeft:1,borderRadius:5}}

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

export default CustomTextArea;