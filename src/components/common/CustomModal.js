import { Box, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import CancelIcon from '@mui/icons-material/Cancel';
import DialogContent from '@mui/material/DialogContent';
import { COLOURS } from '../../assets/COLORS';
import CustomBackArrow from './CustomBackArrow';

const CustomModal = ({ children, open, close, label, width }) => {


    // const Transition = React.forwardRef(function Transition(props, ref) {
    //   return <Slide direction="up" ref={ref} {...props} />;
    // });
    useEffect(() => {
        const disableBack = (e) => {
          e.preventDefault();
          e.stopPropagation();
          // Optionally, you can display a message or perform any other action
        };
    
        // Disable back navigation events
        window.history.pushState(null, '', window.location.href);
        window.addEventListener('popstate', disableBack);
    
        const disableReload = (e) => {
          e.preventDefault();
          e.returnValue = ''; // For older browsers
          // Optionally, you can display a message or perform any other action
        };
    
        // Disable page reload
        window.addEventListener('beforeunload', disableReload);
    
        return () => {
          // Remove event listeners when component unmounts
          window.removeEventListener('popstate', disableBack);
          window.removeEventListener('beforeunload', disableReload);
        };
      }, []);

    return (
        <Dialog
            disableEnforceFocus
            // TransitionComponent={Transition}
            fullWidth
            // maxWidth={width ? width : 'md'}
            fullScreen
            open={open}
            onClose={close}
            aria-describedby="alert-dialog-description"
        >

            <Box display={'flex'} height={40} px={2}  py={2} alignItems={'center'}>
                <CustomBackArrow close={close} label={label} MT={.1} />
            </Box>
            <DialogContent>
                {children}
            </DialogContent>
        </Dialog>
    )
}

export default CustomModal