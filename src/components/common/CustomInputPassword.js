import React, { useState } from 'react'
import { Controller } from "react-hook-form";
import { Box, FormGroup, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { COLOURS } from '../../assets/COLORS';
import { ICONS } from '../../assets/ICONS';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
const CustomInputPassword = ({
    fieldName,
    control,
    fieldLabel,
    placeholder,
    error,
    view,
    changeValue,
    disabled,
    defaultValue,
    type,
    readonly,
    w,
    Not,
    paddingRight,
    cust_value,
    important
}) => {

    const [show, setShow] = useState(true);
    const [textType, setTextType] = useState(null);


    const passwordType = () => {
        setShow(!show)
        if (show) {
            setTextType('text')
        } else {
            setTextType('password')
        }
    }


    return (
        <>
            <FormGroup>
                <Box display={'flex'} justifyContent={'space-between'}>
                    {!Not && <Typography fontFamily={'Outfit-Medium'} px={'3px'} mb={'2px'}
                        sx={{
                            letterSpacing: 0.79,
                            fontSize: {
                                lg: 16,
                                md: 14,
                                sm: 12,
                                xs: 11,
                            },

                        }}
                    >{fieldLabel}
                    </Typography>}
                    {important &&
                        <Box>
                            <ICONS.ErrorIcon.component sx={ICONS.ErrorIcon.sx} />
                        </Box>}
                </Box>
                <Controller
                    name={fieldName}
                    control={control}
                    render={({ field: { value, onChange, onBlur } }) => (
                        <TextField
                            type={textType ? textType : type}
                            defaultValue={defaultValue}
                            value={cust_value ? cust_value : value}

                            onChange={(e) => {
                                onChange(e)
                                if (changeValue) {
                                    changeValue(e.target.value)
                                }
                            }}
                            onBlur={onBlur}
                            aria-invalid={error ? "true" : "false"}
                            className="form-control"
                            placeholder={placeholder}
                            id="exampleInputEmail1"
                            variant='standard'
                            InputProps={{
                                disableUnderline: true,
                                sx: {
                                    width: w ? w : '100%',
                                    borderRadius: "5px",
                                    opacity: "1",
                                    background: COLOURS.table,
                                    height: "45px",
                                    fontFamily: "Outfit-Regular",
                                    letterSpacing: "1px",
                                    fontWeight: '700px',
                                    border: 'none',
                                    paddingX:1
                                },

                                endAdornment: type === "password" ? show ? <VisibilityOffIcon sx={{ cursor: 'pointer', color: COLOURS.secondary, "&:hover": { color: "#000" } }} onClick={passwordType} /> : <VisibilityIcon sx={{ cursor: 'pointer', color: COLOURS.secondary, "&:hover": { color: "#000" } }} onClick={passwordType} /> : null
                            }}
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
    )
}

export default CustomInputPassword