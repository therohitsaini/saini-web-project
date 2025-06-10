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
// import DashbordHome from './components/DashbordFormet/DashbordPages/DashbordHome';
import Admin from './components/DashbordFormet/DashbordPages/Admin';
import Uploadimg from './components/Uploadimg';
import RolePermissionForm from './components/DashbordFormet/DashbordPages/RolePermissionForm';
import RolePermission from './components/DashbordFormet/RolePermission';
import Footer from './components/FooterComp/Footer';
import Service from './components/PagesComp/Service';
// import ReactCityState from './components/DashbordFormet/DashbordPages/ReactCityState';




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


          {/* <Route path='/reactcitystate' element={<ReactCityState />} /> */}

        </Routes>
      </BrowserRouter>

    </Fragment>
  )
}

export default App
