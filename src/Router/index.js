import { createBrowserRouter } from "react-router-dom";
import Login from "../screen/auth/Login";
import ForgetPassword from "../screen/auth/ForgetPassword";
import Merchantmanagement from "../screen/MerchantManagement";
import NotFound from "../screen/NotFound";
import { Suspense, lazy } from "react";
import CustomLoader from "../components/common/CustomLoader";
import PostManagement from "../screen/PostManagement";
import OrderManagement from "../screen/OrderManagement";
import ReportsMangement from "../screen/ReportsManagement";
import SettingScreen from "../screen/Settings";
import ProfileScreen from "../screen/Profile";
import { EditView } from "../components/MerchantMangement/EditView";
import View from "../components/OrderMangement/View";


const LoginLayout = lazy(() => import('../components/LoginAdminLayout'));
const HomeLayout = lazy(() => import('../components/HomeAdminLayout'));

export const router = createBrowserRouter([
    {
        errorElement: <NotFound />,
        path: "/login",
        element: <Suspense fallback={<CustomLoader text="Loading..." />}><LoginLayout /></Suspense>,
        children: [
            {
                index: true,
                element: <Login />,
            },
        ],
    },
    {
        errorElement: <NotFound />,
        path: "/forgetpassword",
        element: <Suspense fallback={<CustomLoader text="Loading..." />}><LoginLayout /></Suspense>,
        children: [
            {
                index: true,
                element: <ForgetPassword />,
            },
        ],
    },
    {
        errorElement: <NotFound />,
        path: "/",
        element: <Suspense fallback={<CustomLoader text="Loading..." />}><HomeLayout /></Suspense>,
        children: [
            {
               
                index: true,
                element: <Merchantmanagement />,
            },
            {
                path:'merchantEdit/:merchantId',
                element: <EditView />,
            },
            {
                path:'merchantView/:merchantId',
                element: <EditView />,
            },
            {
                path: 'postManagement',
                element: <PostManagement />,
            },
            {
                path:'postEdit/:postId',
                element: <EditView />,
            },
            {
                path:'postView/:postId',
                element: <EditView />,
            },
            {
                path: 'orderManagement',
                element: <OrderManagement />,
            },
            {
                path: 'order/:orderId',
                element: <View />,
            },
        
           
            {
                path: 'reportManagement',
                element: <ReportsMangement />,
            },
            {
                path: 'settings',
                element: <SettingScreen />,
            },
            {
                path: 'profile',
                element: <ProfileScreen />,
            },
        ],
    }
]);