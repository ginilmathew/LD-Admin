import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { COLOURS } from '../COLORS';
import SearchIcon from '@mui/icons-material/Search';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DescriptionIcon from '@mui/icons-material/Description';
import DeleteIcon from '@mui/icons-material/Delete';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';



export const ICONS = {
    arrowBack: {
        component: ArrowBackIcon,
        sx: {
            color: COLOURS.secondary,
            fontSize: '30px',
            cursor: 'pointer'

        }
    },
    SearchIcon: {
        component: SearchIcon,
        sx: {
            color: COLOURS.secondary,
            fontSize: '30px',

        }
    },
    RemoveRedEyeIcon: {
        component: RemoveRedEyeIcon,
        sx: {
            color: COLOURS.secondary,
            "&:hover": { color: "#000" }, color: COLOURS.secondary,
            cursor: 'pointer'
        }
    },
    BorderColorIcon: {
        component: BorderColorIcon,
        sx: {
            color: COLOURS.secondary,
            "&:hover": { color: "#000" }, color: COLOURS.secondary,
            cursor: 'pointer'
        }
    },
    CameraAltIcon: {
        component: CameraAltIcon,
        sx: {
            color: COLOURS.secondary,
            "&:hover": { color: "#000" }, color: COLOURS.secondary,
            cursor: 'pointer'
        }
    },
    ErrorIcon: {
        component: ErrorIcon,
        sx: {
            color: COLOURS.secondary,

        }
    },
    CheckCircleIcon: {
        component: CheckCircleIcon,

    }


}