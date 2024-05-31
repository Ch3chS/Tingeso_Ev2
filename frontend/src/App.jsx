import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

import NotFound from './components/NotFound'
import NavBar from './components/NavBar';
import Home from './components/Home'

import VehicleList from './components/VehicleList';
import AddEditVehicle from './components/AddEditVehicle';

import RepairList from './components/RepairList';
import HistoryList from './components/HistoryList';
import AddHistory from './components/AddHistory';
import RepairHistoryList from './components/RepairHistoryList';
import AddRepair from './components/AddRepair';
import AddVouchers from './components/AddVouchers';
import ApplyVoucher from './components/ApplyVoucher';
import R1 from './components/R1';
import R2 from './components/R2';
import VehicleHistoryList from './components/VehicleHistoryList';

function App() {
  return (
      <Router>
        <div className="bg-body-tertiary fixed-top"><NavBar></NavBar></div>
          <div className="container">
            <Routes>
              <Route path="" element={<Home/>} />
              <Route path="home" element={<Home/>} />

              <Route path="vehicles" element={<VehicleList/>} />
              <Route path="/vehicle/add" element={<AddEditVehicle/>} />
              <Route path="/vehicle/edit/:id" element={<AddEditVehicle/>} />

              <Route path="repairs" element={<RepairList/>} />
              
              <Route path="histories" element={<HistoryList/>} />
              <Route path="/history/add" element={<AddHistory/>} />
              <Route path="/history/:id/repairs" element={<RepairHistoryList/>} />
              <Route path="/history/:id/addRepair" element={<AddRepair/>} />
              
              <Route path="/vouchers/insert" element={<AddVouchers/>} />
              <Route path="/history/:id/voucher/apply" element={<ApplyVoucher/>} />

              <Route path="/reports/1" element={<R1/>} />
              <Route path="/reports/2" element={<R2/>} />


              <Route path="/vehiclehistories" element={<VehicleHistoryList/>} />
              

              <Route path="*" element={<NotFound/>} />
            </Routes>
          </div>
      </Router>
  );
}

export default App;


