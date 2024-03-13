import React from 'react'
import { Avatar, Box, FormGroup, Input, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";
import { styled } from '@mui/material/styles';
import BackupIcon from '@mui/icons-material/Backup';

import { Padding, WidthFull } from '@mui/icons-material';
import { COLOURS } from '../../assets/COLORS';
import { ICONS } from '../../assets/ICONS';

const CustomProfileImageUploader = ({
  fieldName,
  control,
  fieldLabel,
  placeholder,
  error,
  type,
  max,
  hide,
  onChangeValue,
  height,
  background,
  ICON,
  width,
  preview,
  previewEditimage,
  myid,
  viewImage,
  format
}) => {
  return (
    <>
      <FormGroup>
        <Typography letterSpacing={ .5 } px={ '3px' } mb={ '3px' }
          sx={ {
            fontSize: {
              lg: 16,
              md: 14,
              sm: 12,
              xs: 11,
            },
            fontFamily: 'Raleway, sans-serif',
            fontWeight: '700'
          } }

        >{ fieldLabel }

        </Typography>
        <Controller
          name={ fieldName }
          control={ control }
          render={ ({ field: { onChange, onBlur, value } }) =>
            <Box sx={ { height: height ? height : 150, width: width ? width : "50%", position: 'relative', fontFamily: `'Poppins' sans-serif`, } } >
              <Avatar
                src={ viewImage ? viewImage : preview ? URL?.createObjectURL(preview) : '' }
                style={ { width: '100%', height: '100%', borderRadius: '50%' } } // Change square to round style
                variant="square"
              ></Avatar>

              <label htmlFor={ myid } >
                <Input
                  style={ { display: 'none' } }
                  onBlur={ onBlur }
                  aria-invalid={ error ? "true" : "false" }
                  className="form-control"
                  placeholder={ placeholder }
                  type={ 'file' }
                  id={ myid }
                  inputProps={ { accept: format ? format : "image/png, image/jpeg ,image/webp" } }
                  onChange={ onChangeValue ? (e) => onChangeValue(e.target.files[0]) : onChange }
                />
                {!hide &&
                <ICONS.CameraAltIcon.component style={ {
                  color: COLOURS.primary,
                  cursor: "pointer",
                  zIndex: "99",
                  position: "absolute",
                  justifyContent: 'center',
                  borderRadius: "3px",
                  left: '44%',
                  top: '80%'
                } } fontSize={ "medium" } /> }
              </label>
            </Box>
          }
        />
        { error && <p role="alert" style={ {
          color: "red",
          display: "flex",
          paddingLeft: "10px",
          fontSize: "12px"
        } }>{ error?.message }</p> }
      </FormGroup>
    </>
  )
}

export default CustomProfileImageUploader;
