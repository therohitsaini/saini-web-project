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






function App() {


  return (
    <Fragment>
      <BrowserRouter>
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

          



          {/* PrincingCustom */}






          {/* <Route path='/auto' element={< AutoIcone />} /> */}





          {/* <Route path='/reactcitystate' element={<ReactCityState />} /> */}

        </Routes>
      </BrowserRouter>

    </Fragment>
  )
}

export default App
