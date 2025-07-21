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
import FeatureHeading from '../Featuresection/FeatureCustom/FeatureHeading';
import FeatureListItem from '../Featuresection/FeatureCustom/FeatureListItem';
import { useSnackbar } from '../Snakbar/Snakbar';
import TeamMain from '../TeamComponent/TeamCustom/TeamMain';
import TeamCardItem from '../TeamComponent/TeamCustom/TeamCardItemMain';
import TeamCardItemMain from '../TeamComponent/TeamCustom/TeamCardItemMain';
import BlogHeadingSection from '../BlogComponent/BlogCustome/BlogHeadingSection/BlogHeadingSection';
import BlogRoot from '../BlogComponent/BlogCustome/BlogData/BlogRoot';
import FooterTopBar from '../FooterCustome/FooterTopBar';
import FooterBackGround from '../FooterCustome/FooterBackGround';
import FooterContactMain from '../FooterCustome/FooterContactMain';
import FooterSponsors from '../FooterCustome/FooterSponsors';
import Headings from '../HeadingSettinges/Headings';
import FooterCopyRight from '../FooterCustome/FooterMianPages/FooterCopyRight';
import { Fragment } from 'react';
import { Alert, Box, CssBaseline, Modal, ThemeProvider, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { useRef } from 'react';
import theme from '../DahbordTheme/Theme';
import { styled, keyframes } from 'styled-components';

// Keyframe for bottom-to-top slide in
const slideUp = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0%);
    opacity: 1;
  }
`;

// Styled Box with animation
const AnimatedModalBox = styled(Box)`
  background-color: #1e293b; /* dark background */
  border-radius: 10px;
  padding: 24px;
  position: relative;
  width: 400px;
  margin: auto;
  margin-top: 15%;
  animation: ${slideUp} 0.4s ease-out;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.5);
`;

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 2,
    minWidth: 300,
    textAlign: 'center',
    backdropFilter: 'blur(8px)',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    height: 200, // <- fix typo from "hieght"
    padding: 4,
    color: 'white',
    boxShadow: "0px 10px 40px rgba(98, 90, 90, 0.2)",
};


const MuiAppBar = (props) => {

    const [isAdmin, setIsAdmin] = useState("admin")
    const [data, setData] = useState({})
    const [user_ID, setUserID] = useState(null)
    const [userProfilePic, setUserProflePic] = useState("")
    const [profileRefress, setProfileRefress] = useState(false)
    const [loading, setLoading] = useState(false)
    const [openModal, setOpenModal] = useState(false);
    const timeoutRef = useRef(null)

    const dispatch = useDispatch()
    const snackbar = useSnackbar();
    if (!snackbar) {
        throw new Error("useSnackbar must be used within a SnackbarProvider");
    }
    const { showSnackbar, showError } = snackbar;

    // const dispatch = useSelector()
    const { window } = props;
    const router = useDemoRouter('/dashboard');
    const demoWindow = window ? window() : undefined;




    const getUserDataBy_ID = async (user_ID) => {
        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}all/get/user-data-by-id/${user_ID}`
            const fetchData = await fetch(url, {

                method: "GET",
            })
            const response = await fetchData.json()
            if (fetchData.ok) {
                setData(response.find_Data)

            }


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
        } catch (error) {
            console.log(error)

        }
    }

    useEffect(() => {
        if (user_ID && /^[a-f\d]{24}$/i.test(user_ID)) {
            fetchProfilePicture(user_ID);
        }
    }, [user_ID, profileRefress]);

    useEffect(() => {
        const shouldShow = sessionStorage.getItem("WELCOMEMODAL");

        if (shouldShow === "true") {
            setOpenModal(true);
            timeoutRef.current = setTimeout(() => {
                setOpenModal(false);
                sessionStorage.removeItem("WELCOMEMODAL");
            }, 10000);
        }
        return () => clearTimeout(timeoutRef.current);
    }, []);

    const ModalHandle = () => {
        setOpenModal(false);
        sessionStorage.removeItem("WELCOMEMODAL");

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };


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
                return <AccountDashbord setData={setData} data={data} user_ID={user_ID} userProfilePic={userProfilePic} setProfileRefress={setProfileRefress} profileRefress={profileRefress} loading={loading} setLoading={setLoading} />;
            case '/account/resetPassword':
                return <ResetPassword />;
            case '/headings':
                return <Headings />;
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
            case '/feature/feartureheading':
                return <FeatureHeading showSnackbar={showSnackbar} />;
            case '/feature/listItem':
                return <FeatureListItem showSnackbar={showSnackbar} />;
            case '/teamsection/team':
                return <TeamMain showSnackbar={showSnackbar} showError={showError} />;
            case '/teamsection/teamCard':
                return <TeamCardItemMain showSnackbar={showSnackbar} showError={showError} />;
            case '/blogsection/blogheadline':
                return <BlogHeadingSection showSnackbar={showSnackbar} showError={showError} />;
            case '/blogsection/blogCard':
                return <BlogRoot showSnackbar={showSnackbar} showError={showError} />;
            case '/footersection/sponsors':
                return <FooterSponsors showSnackbar={showSnackbar} showError={showError} />
            case '/footersection/footerbg':
                return <FooterBackGround showSnackbar={showSnackbar} showError={showError} />
            case '/footersection/footertop':
                return <FooterTopBar showSnackbar={showSnackbar} showError={showError} />
            case '/footersection/footermaincenter':
                return <FooterContactMain showSnackbar={showSnackbar} showError={showError} />
            case '/footersection/footercopyright':
                return <FooterCopyRight />

            default:
                return <NotFoundPage />;
            // 
        }
    }



    return (

        // 
        <Fragment>
            <div>
                <Modal
                    open={openModal}
                    // sx={{ ...backdropStyle }}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >

                    <Box sx={style}>
                        {/* Close Icon */}
                        <IconButton
                            onClick={() => ModalHandle()}
                            sx={{
                                position: 'absolute',
                                top: 8,
                                right: 8,
                                color: 'white',

                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                        {/* <Alert severity="success">This is a success Alert.</Alert> */}
                        <div className='mt-7 w-full flex justify-center my-1'>
                            <Box sx={{
                                width: 200,
                                fontSize:12,
                                fontVariant:"all-small-caps",
                                // p:"1px",
                                // backgroundColor:"#72c66eabf",
                                border:"1px solid #47d052b8",
                                borderRadius:3
                            }}>Log In Successfully</Box>
                        </div>
                        <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ color: 'white',fontVariant:"discretionary-ligatures" }}>
                            👋 Welcome to {data.fullname} on the  Dashbord
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2, color: 'white', fontSize: "10px" }}>
                            We're glad to have you back on the dashboard. Let's get started!
                        </Typography>
                    </Box>
                </Modal>

            </div>

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
                        // '& .MuiToolbar-root ': {
                        //     background: 'linear-gradient(to bottom right, #1e293b, #0f172a)', // This applies to full layout
                        // },
                        // '& .MuiBox-root': {
                        //     background: 'linear-gradient(to bottom right, #101317, #0f172a)', // This applies to full layout

                        // },

                        // "& .MuiContainer-root  ": {
                        //     paddingX: 1,
                        // },
                        // "& .MuiListSubheader-root": {
                        //     background: 'linear-gradient(to bottom right, #29384c, #0f172a)', // This applies to full layout

                        // },
                        // background: 'linear-gradient(to bottom right, #1e293b, #0f172a)', // This applies to full layout
                        minHeight: '100vh',
                        "& .MuiContainer-root": {
                            px: 1,
                        },
                        "& .MuiListItemText-root .MuiTypography-root": {
                            color: "#AFDDFF",
                            fontSize: "13px",
                        },
                        "& .MuiBox-root:hover": {
                            color: "#ededef"
                        },
                        "& .MuiSvgIcon-root": {
                            color: "#73b6c0",
                            fontSize: "1.5rem"
                        },
                        "& .MuiBreadcrumbs-ol, & .css-lc31tn": {
                            display: "none"
                        },

                        "& .MuiListItemText-root": {
                            "& .MuiTypography-root ": {
                                color: "#AFDDFF",
                                fontSize: "13px",
                                // fontVariant: "all-small-caps"

                            },
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

            </AppProvider >

        </Fragment >

    );
}
export default MuiAppBar




