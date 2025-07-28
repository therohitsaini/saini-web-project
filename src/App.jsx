import { Fragment } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from './components/UserComp/SignUp';
import SignIn from './components/UserComp/SignIn';
import Home from './components/HomeMain/Home';
import HeroSection from './components/PagesComp/HeroSection';
import DashbordMenu from './components/DashbordFormet/DashbordMenu';
import DashboardLayoutWithRoutes from "../src/components/DashboardLayoutWithRoutes"
import UserTable from './components/DashbordFormet/UserTable';
import UserTableNew from './components/DashbordFormet/UserTableNew'
import MuiAppBar from './components/DashbordFormet/MuiAppBar';
import DashbordHomePage from './MuiDasbordPages/DashbordHomePage';
import MuiAppBarMain from './components/DashbordFormet/MuiAppBarMain';
import RolePermissionModal from './ModalComponent/RolePermissionModal';
import AccountDashbord from './components/DashbordFormet/AccountDashbord';
import Dashbord from './components/DashbordFormet/Dashbord';
import Admin from './components/DashbordFormet/DashbordPages/Admin';
import Uploadimg from './components/Uploadimg';
import RolePermission from './components/DashbordFormet/RolePermission';
import Footer from './components/FooterComp/Footer';
import Service from './components/PagesComp/Service';
import HeaderSideBarTabs from './components/NavbarComponent/HeaderSideBarTabs';
import Funfact from './components/FunfactSection/FunfactUI/Funfact';
import FunfactTable from './components/FunfactSection/FunfactUI/FuncfactCustom/FunfactTable';
import PortfolioSection from './components/PagesComp/Portfolio';
import PrincingSection from './components/PrincingSection/pages/PrincingSection';
import PortfolioMain from './components/PortFolioCustom/PortfolioMain';
import PrincingCustom from './components/PrincingSection/PrincingCustom';
import TestimonialSection from './components/Testimonial/Pages/TestimonialSection';
import FeatureSection from './components/Featuresection/pages/FeatureSection';
import FeatureHeading from './components/Featuresection/FeatureCustom/FeatureHeading';
import FeatureListItem from './components/Featuresection/FeatureCustom/FeatureListItem';
import FeatureListForm from './components/Featuresection/FeatureCustom/CustomePage/FeatureListForm';
import CustomTable from './components/Featuresection/FeatureCustom/CustomePage/CustomTable';
import TeamPages from './components/TeamComponent/pagesTeam/TeamSection';
import TeamSection from './components/TeamComponent/pagesTeam/TeamSection';
import TeamMain from './components/TeamComponent/TeamCustom/TeamMain';
import BlogSection from './components/BlogComponent/BlogSection/BlogSection';
import BlogHeadingSection from './components/BlogComponent/BlogCustome/BlogHeadingSection/BlogHeadingSection';
import BlogRoot from './components/BlogComponent/BlogCustome/BlogData/BlogRoot';
import FooterTopBar from './components/FooterCustome/FooterTopBar';
import FooterBackGround from './components/FooterCustome/FooterBackGround';
import { SnackbarProvider } from './components/Snakbar/Snakbar';
import Headings from './components/HeadingSettinges/Headings';
import FooterCopyRight from './components/FooterCustome/FooterMianPages/FooterCopyRight';
import Test from './components/Test';
import AboutCustome from './components/AboutComponet/AboutCustome/AboutCustome';
import BreadCrumbCustome from './components/BreadCrumbSection/BreadCrumbCustome/BreadCrumbCustome';
// import FooterMainCenter from './components/FooterCustome/FooterMainCenter';






function App() {


  return (
    <Fragment>
      <BrowserRouter>
        <SnackbarProvider maxSnack={3} >
          <Routes>

            <Route path='/signup' element={<SignUp />} />
            <Route path='/' element={<SignIn />} />
            <Route path='/home' element={< Home />} />
            <Route path='/footer' element={< Footer />} />
            <Route path='/dashboardmenu' element={<DashbordMenu />} />
            <Route path='/herosection' element={<HeroSection />} />
            <Route path='/dashbordcomplete' element={< DashboardLayoutWithRoutes />} />
            <Route path='/usertable/' element={<UserTable />} />
            <Route path='/usertablenew' element={<UserTableNew />} />
            <Route path='/muiappbar' element={<MuiAppBar />} />
            <Route path='dashboardhomepage' element={< DashbordHomePage />} />
            <Route path='/muimain' element={< MuiAppBarMain />} />
            <Route path='role_permission' element={< RolePermissionModal />} />
            <Route path='/account' element={<  AccountDashbord />} />
            <Route path='/dashbord' element={<  Dashbord />} />
            <Route path='/uploadimg' element={<  Uploadimg />} />
            <Route path='/admin' element={<  Admin />} />
            <Route path='/roleform' element={< RolePermission />} />
            <Route path='/service' element={< Service />} />
            <Route path='/header-side-bar-tabs' element={< HeaderSideBarTabs />} />
            <Route path='/serive-funfact' element={< Funfact />} />
            <Route path='/serive-funfact-tabel' element={<FunfactTable />} />
            <Route path='/portfollio-section' element={< PortfolioSection />} />
            <Route path='/portfolio-custom' element={< PortfolioMain />} />
            <Route path='/princing-section' element={< PrincingSection />} />
            <Route path='/princingcustom' element={< PrincingCustom />} />
            <Route path='/testimonialSection' element={< TestimonialSection />} />
            <Route path='/featureSection' element={< FeatureSection />} />
            <Route path='/featureheading' element={< FeatureHeading />} />
            <Route path='/featurelistitem' element={< FeatureListItem />} />
            <Route path='/featurelistform' element={< FeatureListForm />} />
            <Route path='/customeTable' element={< CustomTable />} />
            <Route path='/team' element={< TeamSection />} />
            <Route path='/teamcustome' element={< TeamMain />} />
            <Route path='/blogsection' element={< BlogSection />} />
            <Route path='/blogheadingsection' element={< BlogHeadingSection />} />
            <Route path='/blogroot' element={< BlogRoot />} />
            {/* <Route path='/footertopbar' element={< FooterSponsors />} /> */}
            <Route path='/footerbackground' element={< FooterBackGround />} />
            <Route path='/footertopbar' element={< FooterTopBar />} />
            {/* <Route path='/footermaincenter' element={< FooterMainCenter />} /> */}
            <Route path='/headings' element={< Headings />} />
            <Route path='/footercopyright' element={< FooterCopyRight />} />
            <Route path='/aboutCustome' element={< AboutCustome />} />
            <Route path='/breadCrumbCustome' element={< BreadCrumbCustome />} />

          </Routes>
        </SnackbarProvider>
      </BrowserRouter>

    </Fragment>
  )
}

export default App
