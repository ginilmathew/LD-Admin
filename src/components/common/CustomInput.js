import React from 'react'
import { Controller } from "react-hook-form";
import { Box, FormGroup, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { COLOURS } from '../../assets/COLORS';
import { ICONS } from '../../assets/ICONS';
const CustomInput = ({
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

    return (
        <>
            <FormGroup>
                <Box display={'flex'} justifyContent={'space-between'}>
                    {!Not && <Typography fontFamily={'Outfit-Medium'}  px={'3px'} mb={'2px'}
                        sx={{
                            letterSpacing:0.79,
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
                            type={type}
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
                                readOnly: readonly,
                                style: {
                                    width: w ? w : '',
                                    borderRadius: "5px",
                                    opacity: "1",
                                    background: COLOURS.table,
                                    height: "45px",
                                    fontFamily: "Outfit-Regular",
                                    letterSpacing: "1px",
                                    fontWeight: '700px',
                                    border: 'none',
                                    paddingLeft: 4
                                },
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

export default CustomInput