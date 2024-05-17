import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

import NotFound from './components/NotFound'
import NavBar from './components/NavBar';
import Home from './components/Home'

import VehicleList from './components/VehicleList';
import AddEditVehicle from './components/AddEditVehicle';

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

              <Route path="*" element={<NotFound/>} />
            </Routes>
          </div>
      </Router>
  );
}

export default App;


