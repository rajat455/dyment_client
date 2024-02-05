import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './Layout';
import UserScreen from './Screens/UserScreen/UserScreen';
import Path from './Commen/Path';
import { enqueueSnackbar as showSnack } from 'notistack';
import KapanScreen from './Screens/KapanScreen/KapanScreen';
import LotScreen from './Screens/LotScreen/LotScreen';
import WorkScreen from './Screens/WorkScreen/WorkScreen';
import LoginScreen from './Screens/LoginScreen/LoginScreen';
import { useState } from 'react';
import { role } from './Commen/Constents';
import EmployeeDashboard from './Screens/DashboardScreen/EmployeeDashboard';
import { useSelector } from 'react-redux';


function App() {
  window.showSnack = showSnack
  const Auth = useSelector(state => state.Auth)
  const [permission, setpermission] = useState(JSON.parse(localStorage.getItem("permission")));
  const permissionPages = {
    "/user": UserScreen,
    "/kapan": KapanScreen,
    "/lot": LotScreen,
    "/work": WorkScreen,
    "/": Auth && Auth.role === role.employee ? EmployeeDashboard : null
  }
  delete permission.login



  return (
    <BrowserRouter>
      <Routes>
        {
          permission && Object.values(permission).map((x, key) => {
            return <Route key={key} path={x} element={<Layout setpermission={setpermission} permission={permission} Component={permissionPages[x]}/>} />
          })
        }
        <Route path={Path.login}  element={<LoginScreen permission={permission} setpermission={setpermission} />} />
        <Route path={"*"} element={<h1>Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
