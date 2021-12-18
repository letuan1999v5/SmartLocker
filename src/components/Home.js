import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'
import Selector from './menu/Selector';
import Header from './header/Header';
import MenuBar from './menu/MenuBar';
import MainPageContent from './content/mainPage/MainPageContent';
import UserManagementContent from './content/userManagement/UserManagementContent';
import AddLockerContent from './content/addLocker/AddLockerContent';
import LockerUseManagementContent from './content/lockerUseManagement/LockerUseManagementContent';
import DepartmentManagementContent from './content/departmentManagement/DepartmentManagementContent';
import BuildingManagementContent from './content/buildingManagement/BuildingManagementContent';
import FloorManagementContent from './content/floorManagement/FloorManagementContent';
import ToolManagementContent from './content/toolManagement/ToolManagementContent';
import LockerManagementContent from './content/lockerManagement/LockerManagementContent';
import LockerLayoutManagementContent from './content/lockerLayoutManagement/LockerLayoutManagementContent';
import WarningContent from './content/warning/WarningContent';
import RealtimeReportContent from './content/realtimeReport/RealtimeReportContent';
import StatusReportContent from './content/statusReport/StatusReportContent';
import LockerEventReportContent from './content/lockerEventReport/LockerEventReportContent';
import ManagerManagementContent from './content/managerManagement/ManagerManagementContent';
import { useSelector, useDispatch } from 'react-redux';
import allActions from '../redux/action';


function Home(props) {
  let menu = useSelector((state) => state.menu.value);

  function renderContent(menu) {
    switch (menu) {
      case 1:
        return <MainPageContent />
      case 2:
        return <UserManagementContent />
      case 3:
        return <AddLockerContent />
      case 4:
        return <LockerUseManagementContent />
      case 5:
        return <DepartmentManagementContent />
      case 6:
        return <BuildingManagementContent />
      case 7:
        return <FloorManagementContent />
      case 8:
        return <ToolManagementContent />
      case 9:
        return <LockerManagementContent />
      case 10:
        return <LockerLayoutManagementContent />
      case 11:
        return <WarningContent />
      case 12:
        return <RealtimeReportContent />
      case 13:
        return <StatusReportContent />
      case 14:
        return <LockerEventReportContent />
      case 15: 
        return <ManagerManagementContent />
      default:
        return (
          <h2 style={{marginLeft: "50px", marginTop: "50px"}}>This option has not built yet</h2>
        )
    }
  }

  return (
    <div id="layout" >
      <div style={{ display: "flex" }}>
        <Selector />
        <Header />
      </div>
      <div style={{ display: "flex" }}>
        <MenuBar />
        <div>
          {renderContent(menu)}
          {/* gọi hàm renderContent */}
        </div>
      </div>
    </div>
  )
}




export default Home;