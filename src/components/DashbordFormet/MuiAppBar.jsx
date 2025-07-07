import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import UserTable from './UserTable';
import { useState } from 'react';
import { CustomAppTitle, NAVIGATION, ToolbarActionsSearch, useDemoRouter } from '../MuiFunction/MuiFunction';
import DashbordHomePage from '../../MuiDasbordPages/DashbordHomePage';
import { useEffect } from 'react';
import RolePermission from './RolePermission';
import AccountDashbord from './AccountDashbord';
import ResetPassword from './DashbordPages/ResetPassword';
import { useDispatch, } from 'react-redux';
import { userInformationCurrent } from '../../Store/UserDetailsHeader/action';
import CreateUserComponents from './DashbordPages/CreateUserComponents';
import HeaderCustomize from './HeaderCustomize';
import HeaderTopBarTabs from '../NavbarComponent/HeaderTopBarTabs';
import HeaderSideBarTabs from '../NavbarComponent/HeaderSideBarTabs';
import HeroSectionCustome from '../HeroSectionCustomer/HeroSectionCustome';
import InFo from '../HeroInfoSection/InFo';
import ServiceCustom from '../ServiceCustomize/ServiceCustom';
import FunfactTable from '../FunfactSection/FunfactUI/FuncfactCustom/FunfactTable';
import PortfolioMain from '../PortFolioCustom/PortfolioMain';
import PrincingCustom from '../PrincingSection/PrincingCustom';
import TestimonialCustome from '../Testimonial/TestimonialCustome';






const MuiAppBar = (props) => {

    const [isAdmin, setIsAdmin] = useState("admin")
    const [data, setData] = useState({})
    const [user_ID, setUserID] = useState(null)
    const [userProfilePic, setUserProflePic] = useState("")
    const [profileRefress, setProfileRefress] = useState(false)

    const dispatch = useDispatch()

    console.log("data", user_ID)



    // const dispatch = useSelector()
    const { window } = props;
    const router = useDemoRouter('/dashboard');
    const demoWindow = window ? window() : undefined;


    const getUserDataBy_ID = async (user_ID) => {
        console.log("userID", user_ID)
        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}all/get/user-data-by-id/${user_ID}`
            const fetchData = await fetch(url, {

                method: "GET",
            })
            const response = await fetchData.json()
            setData(response.find_Data)
            console.log("data", response)

        } catch (error) {
            console.log("Somthing Went Wrong!")
        }
    }

    useEffect(() => {
        const ID = localStorage.getItem("user-ID");
        if (ID && /^[a-f\d]{24}$/i.test(ID)) {
            setUserID(ID);
            getUserDataBy_ID(ID);
        }
    }, [profileRefress]);

    useEffect(() => {
        const role = localStorage.getItem("set-role");
        setIsAdmin(role);
    }, []);

    const goToAddUser = () => {
        router.navigate("/user/adduser"); // or router.push(...) depending on the router API
    };

    const fetchProfilePicture = async (user_ID) => {
        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}all/get-profile/${user_ID}`
            const fetchData = await fetch(url, {
                method: "GET"
            })
            const picResponse = await fetchData.json()
            //   const url_ = window.URL.createObjectURL(picResponse);
            // if (picResponse) {
            setUserProflePic(picResponse.imgURL)
            dispatch(userInformationCurrent(picResponse.imgURL))

            // }

            console.log(picResponse)

        } catch (error) {
            console.log(error)

        }
    }

    useEffect(() => {
        if (user_ID && /^[a-f\d]{24}$/i.test(user_ID)) {
            fetchProfilePicture(user_ID);
        }
    }, [user_ID, profileRefress]);


    function DashboardPage() {
        return <DashbordHomePage />;
    }

    function OrdersPage_() {
        return <Skeleton > <CreateUserComponents /></Skeleton>;
    }

    function OrdersPage() {
        return <Skeleton > <RolePermission /></Skeleton>;
    }
    function role() {
        return <UserTable router={router} goToAddUser={goToAddUser} />;
    }
    function accountDashbord() {
        return <AccountDashbord />;
    }
    function SalesPage() {
        return <ResetPassword />;

    }
    function SalesPage() {
        return <HeroSectionCustome />;

    }

    function NotFoundPage() {
        return <div>404 - Page Not Found</div>;
    }





    const RenderRoute = ({ pathname }) => {
        switch (pathname) {

            case '/dashboard':
                return <DashbordHomePage />;
            case '/permissions':
                return < RolePermission />;
            case '/user/adduser':
                return <CreateUserComponents />;
            // case '/user_':
            //     return isAdmin === "Super_admin" ? <UserTable /> : "";
            case '/user/allusers':
                return <UserTable />;
            case '/account/profile':
                return <AccountDashbord setData={setData} data={data} user_ID={user_ID} userProfilePic={userProfilePic} setProfileRefress={setProfileRefress} profileRefress={profileRefress} />;
            case '/account/resetPassword':
                return <ResetPassword />;

            case '/header':
                return <HeaderSideBarTabs />;

            case '/herosection':
                return <HeroSectionCustome />;

            case '/info':
                return <InFo />;

            case '/service':
                return <ServiceCustom />;
            case '/funfact':
                return <FunfactTable />;
            case '/portfolio':
                return <PortfolioMain />;
            case '/princing':
                return <PrincingCustom />;
            case '/testimonial':
                return <TestimonialCustome />;
            default:
                return <NotFoundPage />;
            // 
        }
    }

    return (

        // 
        <AppProvider
            navigation={NAVIGATION(isAdmin)}
            // session={session}
            // authentication={authentication}
            router={router}
            // theme={demoTheme}
            window={demoWindow}

        >


            <DashboardLayout slots={{
                appTitle: CustomAppTitle,
                toolbarActions: ToolbarActionsSearch,
            }}

                sx={{


                    "& .MuiContainer-root  ": {
                        paddingX: 1,

                    },
                    // "& .MuiPaper-root ": {
                    //     background: "linear-gradient(to top right, #080e11, #18292e , #0d9dda99)",
                    //     // background: "linear-gradient(to top right, #131823, #051116a4)",
                    // },
                    // "& .MuiListSubheader-root ": {
                    //     background: "linear-gradient(to top right, #080e11, #18292e , #0d9dda99)",
                    // },
                    // "& .MuiBox-root" : {
                    //     background: "linear-gradient(to top right, #080e11, #18292e , #0d9dda99)",

                    // },

                    "& .MuiTypography-root ": {
                        color: "#AFDDFF",

                    },
                    "& .MuiBox-root:hover": {
                        color: "#ededef"
                    },
                    "& .MuiSvgIcon-root": {
                        color: "#73b6c0"
                    },
                    "& .MuiSvgIcon-root": {
                        fontSize: "1.5rem"
                    },
                    "& .MuiButtonBase-root": {

                    },
                    "& .MuiDataGridVariables": {
                        backgroundColor: "white"
                    },
                    "& .MuiBreadcrumbs-ol": {
                        display: "none"
                    },
                    "& .css-lc31tn": {
                        display: "none"
                    }


                }}
            >

                <PageContainer>
                    <RenderRoute pathname={router.pathname} />
                </PageContainer>

            </DashboardLayout>

        </AppProvider>

    );
}
export default MuiAppBar




