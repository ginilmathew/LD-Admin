import React, { useTransition, memo } from 'react'
import TextField from "@mui/material/TextField";
import { InputAdornment } from '@mui/material';

import { COLOURS } from '../../assets/COLORS';
import { ICONS } from '../../assets/ICONS';



const CutomSearch = ({ setState, placeholder, mutateFilter, dateF, setlist, FetchData }) => {

    const onchangeValue = (e) => {
        const { value } = e.target;
        setState(value)
    }
    return (
        <>
            <TextField
                fullWidth
                onChange={onchangeValue}
                placeholder={'search...'}
                id="outlined-basic"
                variant="standard"
        
                InputProps={{
                    style: {
                        fontFamily: 'Outfit-Regular',
                        height: 45,
                        borderRadius: 10,
                        color: 'grey',
                        backgroundColor:COLOURS.searchBox,
                        paddingLeft:5
                    },
                    disableUnderline: true,
                    endAdornment: <InputAdornment position="end">  <ICONS.SearchIcon.component sx={ICONS.SearchIcon.sx} /></InputAdornment>

                }} />
        </>
    )
}

export default CutomSearch;