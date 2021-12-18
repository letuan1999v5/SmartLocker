import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import allAction from '../../redux/action';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {
    selectBtn1,
    selectBtn2,
    selectBtn3,
    selectBtn4,
    selectBtn5,
    selectBtn6,
    selectBtn7,
    selectBtn8,
    selectBtn9,
    selectBtn10,
    selectBtn11,
    selectBtn12,
    selectBtn13,
    selectBtn14,
    selectBtn15,
    selectBtn16,
} from '../../redux2/reducer/MenuReducer'

function MenuBar(props) {
    let menu = useSelector(state => state.menu.value);
    const dispatch = useDispatch();
    function mouseEntered(btn) {
        // allAction.menuAction.setMouseEnteredButton(btn);
        dispatch(allAction.menuAction.setMouseEnteredButton(btn));
    }

    function mouseLeaved() {
        // allAction.menuAction.setMouseEnteredButton("");
        dispatch(allAction.menuAction.setMouseEnteredButton(""));
    }

    return (
        <div className='menubar'>
            <div>
                <Popup
                    trigger={<div id="menuBtn1" className={menu === 1 ? 'activateBtn' : 'deactivateBtn'} onClick={() => { dispatch(selectBtn1()) }}><i className="far fa-home" style={redOptionStyle}></i></div>}
                    position="right top"
                    on="hover"
                    closeOnDocumentClick
                    mouseLeaveDelay={150}
                    mouseEnterDelay={150}
                    contentStyle={{ marginTop: '10px', marginBottom: '10px', border: 'none', width: "85px", backgroundColor: "#28355c", height: "20px", marginLeft: "10px", marginTop: "15px" }}
                    arrow={false}
                >
                    <div className='menuPopup absolute' style={{}}>
                        <div className='menuItem' style={{ color: "#b85439" }}><i>Trang chủ</i></div>
                    </div>
                </Popup>
            </div>
            <div>
                <Popup
                    trigger={<div id="menuBtn2" className={menu === 2 ? 'activateBtn' : 'deactivateBtn'} onClick={() => { dispatch(selectBtn2()) }}><i className="far fa-user" style={blueOptionStyle}></i></div>}
                    position="right top"
                    on="hover"
                    closeOnDocumentClick
                    mouseLeaveDelay={150}
                    mouseEnterDelay={150}
                    contentStyle={{ marginTop: '10px', marginBottom: '10px', border: 'none', width: "180px", backgroundColor: "#28355c", height: "20px", marginLeft: "10px", marginTop: "15px" }}
                    arrow={false}
                >
                    <div className='menuPopup absolute' style={{}}>
                        <div className='menuItem' style={{ color: "#39a5b8" }}><i>Quản lý người sử dụng</i></div>
                    </div>
                </Popup>
            </div>
            {/* here */}
            <div>
                <Popup
                    trigger={<div id="menuBtn3" className={menu === 3 ? 'activateBtn' : 'deactivateBtn'} onClick={() => { dispatch(selectBtn3()) }}><i className="far fa-paperclip" style={blueOptionStyle}></i></div>}
                    position="right top"
                    on="hover"
                    closeOnDocumentClick
                    mouseLeaveDelay={150}
                    mouseEnterDelay={150}
                    contentStyle={{ marginTop: '10px', marginBottom: '10px', border: 'none', width: "180px", backgroundColor: "#28355c", height: "20px", marginLeft: "10px", marginTop: "15px" }}
                    arrow={false}
                >
                    <div className='menuPopup absolute' style={{}}>
                        <div className='menuItem' style={{ color: "#39a5b8" }}><i>Thêm tủ cho nhân viên</i></div>
                    </div>
                </Popup>
            </div>
            <div>
                <Popup
                    trigger={<div id="menuBtn4" className={menu === 4 ? 'activateBtn' : 'deactivateBtn'} onClick={() => { dispatch(selectBtn4()) }}><i className="far fa-user-lock" style={blueOptionStyle}></i></div>}
                    position="right top"
                    on="hover"
                    closeOnDocumentClick
                    mouseLeaveDelay={150}
                    mouseEnterDelay={150}
                    contentStyle={{ marginTop: '10px', marginBottom: '10px', border: 'none', width: "145px", backgroundColor: "#28355c", height: "20px", marginLeft: "10px", marginTop: "15px" }}
                    arrow={false}
                >
                    <div className='menuPopup absolute' style={{}}>
                        <div className='menuItem' style={{ color: "#39a5b8" }}><i>Quản lý sử dụng tủ</i></div>
                    </div>
                </Popup>
            </div>
            <div>
                <Popup
                    trigger={<div id="menuBtn5" className={menu === 5 ? 'activateBtn' : 'deactivateBtn'} onClick={() => { dispatch(selectBtn5()) }}><i className="far fa-project-diagram" style={blueOptionStyle}></i></div>}
                    position="right top"
                    on="hover"
                    closeOnDocumentClick
                    mouseLeaveDelay={150}
                    mouseEnterDelay={150}
                    contentStyle={{ marginTop: '10px', marginBottom: '10px', border: 'none', width: "220px", backgroundColor: "#28355c", height: "20px", marginLeft: "10px", marginTop: "15px" }}
                    arrow={false}
                >
                    <div className='menuPopup absolute' style={{}}>
                        <div className='menuItem' style={{ color: "#39a5b8" }}><i>Quản lý bộ phận / phòng ban</i></div>
                    </div>
                </Popup>
            </div>
            <div>
                <Popup
                    trigger={<div id="menuBtn6" className={menu === 6 ? 'activateBtn' : 'deactivateBtn'} onClick={() => { dispatch(selectBtn6()) }}><i className="far fa-building" style={greenOptionStyle}></i></div>}
                    position="right top"
                    on="hover"
                    closeOnDocumentClick
                    mouseLeaveDelay={150}
                    mouseEnterDelay={150}
                    contentStyle={{ marginTop: '10px', marginBottom: '10px', border: 'none', width: "130px", backgroundColor: "#28355c", height: "20px", marginLeft: "10px", marginTop: "15px" }}
                    arrow={false}
                >
                    <div className='menuPopup absolute' style={{}}>
                        <div className='menuItem' style={{ color: "#3fa14a" }}><i>Quản lý tòa nhà</i></div>
                    </div>
                </Popup>
            </div>
            <div>
                <Popup
                    trigger={<div id="menuBtn7" className={menu === 7 ? 'activateBtn' : 'deactivateBtn'} onClick={() => { dispatch(selectBtn7()) }}><i className="far fa-layer-group" style={greenOptionStyle}></i></div>}
                    position="right top"
                    on="hover"
                    closeOnDocumentClick
                    mouseLeaveDelay={150}
                    mouseEnterDelay={150}
                    contentStyle={{ marginTop: '10px', marginBottom: '10px', border: 'none', width: "100px", backgroundColor: "#28355c", height: "20px", marginLeft: "10px", marginTop: "15px" }}
                    arrow={false}
                >
                    <div className='menuPopup absolute' style={{}}>
                        <div className='menuItem' style={{ color: "#3fa14a" }}><i>Quản lý tầng</i></div>
                    </div>
                </Popup>
            </div>
            <div>
                <Popup
                    trigger={<div id="menuBtn8" className={menu === 8 ? 'activateBtn' : 'deactivateBtn'} onClick={() => { dispatch(selectBtn8()) }}><i className="far fa-tablet-alt" style={greenOptionStyle}></i></div>}
                    position="right top"
                    on="hover"
                    closeOnDocumentClick
                    mouseLeaveDelay={150}
                    mouseEnterDelay={150}
                    contentStyle={{ marginTop: '10px', marginBottom: '10px', border: 'none', width: "200px", backgroundColor: "#28355c", height: "20px", marginLeft: "10px", marginTop: "15px" }}
                    arrow={false}
                >
                    <div className='menuPopup absolute' style={{}}>
                        <div className='menuItem' style={{ color: "#3fa14a" }}><i>Quản lý thiết bị điều khiển</i></div>
                    </div>
                </Popup>
            </div>
            <div>
                <Popup
                    trigger={<div id="menuBtn9" className={menu === 9 ? 'activateBtn' : 'deactivateBtn'} onClick={() => { dispatch(selectBtn9()) }}><i className="far fa-cube" style={greenOptionStyle}></i></div>}
                    position="right top"
                    on="hover"
                    closeOnDocumentClick
                    mouseLeaveDelay={150}
                    mouseEnterDelay={150}
                    contentStyle={{ marginTop: '10px', marginBottom: '10px', border: 'none', width: "100px", backgroundColor: "#28355c", height: "20px", marginLeft: "10px", marginTop: "15px" }}
                    arrow={false}
                >
                    <div className='menuPopup absolute' style={{}}>
                        <div className='menuItem' style={{ color: "#3fa14a" }}><i>Quản lý tủ</i></div>
                    </div>
                </Popup>
            </div>
            <div>
                <Popup
                    trigger={<div id="menuBtn10" className={menu === 10 ? 'activateBtn' : 'deactivateBtn'} onClick={() => { dispatch(selectBtn10()) }}><i className="far fa-cubes" style={greenOptionStyle}></i></div>}
                    position="right top"
                    on="hover"
                    closeOnDocumentClick
                    mouseLeaveDelay={150}
                    mouseEnterDelay={150}
                    contentStyle={{ marginTop: '10px', marginBottom: '10px', border: 'none', width: "130px", backgroundColor: "#28355c", height: "20px", marginLeft: "10px", marginTop: "15px" }}
                    arrow={false}
                >
                    <div className='menuPopup absolute' style={{}}>
                        <div className='menuItem' style={{ color: "#3fa14a" }}><i>Quản lý layout tủ</i></div>
                    </div>
                </Popup>
            </div>
            <div>
                <Popup
                    trigger={<div id="menuBtn11" className={menu === 11 ? 'activateBtn' : 'deactivateBtn'} onClick={() => { dispatch(selectBtn11()) }}><i className="far fa-exclamation-triangle" style={redOptionStyle}></i></div>}
                    position="right top"
                    on="hover"
                    closeOnDocumentClick
                    mouseLeaveDelay={150}
                    mouseEnterDelay={150}
                    contentStyle={{ marginTop: '10px', marginBottom: '10px', border: 'none', width: "80px", backgroundColor: "#28355c", height: "20px", marginLeft: "10px", marginTop: "15px" }}
                    arrow={false}
                >
                    <div className='menuPopup absolute' style={{}}>
                        <div className='menuItem' style={{ color: "#b85439" }}><i>Cảnh báo</i></div>
                    </div>
                </Popup>
            </div>
            <div>
                <Popup
                    trigger={<div id="menuBtn12" className={menu === 12 ? 'activateBtn' : 'deactivateBtn'} onClick={() => { dispatch(selectBtn12()) }}><i className="far fa-sync" style={yellowOptionStyle}></i></div>}
                    position="right top"
                    on="hover"
                    closeOnDocumentClick
                    mouseLeaveDelay={150}
                    mouseEnterDelay={150}
                    contentStyle={{ marginTop: '10px', marginBottom: '10px', border: 'none', width: "260px", backgroundColor: "#28355c", height: "20px", marginLeft: "10px", marginTop: "15px" }}
                    arrow={false}
                >
                    <div className='menuPopup absolute' style={{}}>
                        <div className='menuItem' style={{ color: "#a19c3f" }}><i>Báo cáo sự kiện theo thời gian thực</i></div>
                    </div>
                </Popup>
            </div>
            <div>
                <Popup
                    trigger={<div id="menuBtn13" className={menu === 13 ? 'activateBtn' : 'deactivateBtn'} onClick={() => { dispatch(selectBtn13()) }}><i className="far fa-unlock-alt" style={yellowOptionStyle}></i></div>}
                    position="right top"
                    on="hover"
                    closeOnDocumentClick
                    mouseLeaveDelay={150}
                    mouseEnterDelay={150}
                    contentStyle={{ marginTop: '10px', marginBottom: '10px', border: 'none', width: "150px", backgroundColor: "#28355c", height: "20px", marginLeft: "10px", marginTop: "15px" }}
                    arrow={false}
                >
                    <div className='menuPopup absolute' style={{}}>
                        <div className='menuItem' style={{ color: "#a19c3f" }}><i>Báo cáo trạng thái</i></div>
                    </div>
                </Popup>
            </div>
            <div>
                <Popup
                    trigger={<div id="menuBtn14" className={menu === 14 ? 'activateBtn' : 'deactivateBtn'} onClick={() => { dispatch(selectBtn14()) }}><i className="far fa-history" style={yellowOptionStyle}></i></div>}
                    position="right top"
                    on="hover"
                    closeOnDocumentClick
                    mouseLeaveDelay={150}
                    mouseEnterDelay={150}
                    contentStyle={{ marginTop: '10px', marginBottom: '10px', border: 'none', width: "180px", backgroundColor: "#28355c", height: "20px", marginLeft: "10px", marginTop: "15px" }}
                    arrow={false}
                >
                    <div className='menuPopup absolute' style={{}}>
                        <div className='menuItem' style={{ color: "#a19c3f" }}><i>Báo cáo lịch sử sử dụng</i></div>
                    </div>
                </Popup>
            </div>
            <div>
                <Popup
                    trigger={<div id="menuBtn15" className={menu === 15 ? 'activateBtn' : 'deactivateBtn'} onClick={() => { dispatch(selectBtn15()) }}><i className="far fa-users-cog" style={redOptionStyle}></i></div>}
                    position="right top"
                    on="hover"
                    closeOnDocumentClick
                    mouseLeaveDelay={150}
                    mouseEnterDelay={150}
                    contentStyle={{ marginTop: '10px', marginBottom: '10px', border: 'none', width: "200px", backgroundColor: "#28355c", height: "20px", marginLeft: "10px", marginTop: "15px" }}
                    arrow={false}
                >
                    <div className='menuPopup absolute' style={{}}>
                        <div className='menuItem' style={{ color: "#b85439" }}><i>Quản lý tài khoản quản trị</i></div>
                    </div>
                </Popup>
            </div>
            <div>
                <Popup
                    trigger={<div id="menuBtn16" className={menu === 16 ? 'activateBtn' : 'deactivateBtn'} onClick={() => { dispatch(selectBtn16()) }}><i className="far fa-dice-d20" style={redOptionStyle}></i></div>}
                    position="right top"
                    on="hover"
                    closeOnDocumentClick
                    mouseLeaveDelay={150}
                    mouseEnterDelay={150}
                    contentStyle={{ marginTop: '10px', marginBottom: '10px', border: 'none', width: "250px", backgroundColor: "#28355c", height: "20px", marginLeft: "10px", marginTop: "15px" }}
                    arrow={false}
                >
                    <div className='menuPopup absolute' style={{}}>
                        <div className='menuItem' style={{ color: "#b85439" }}><i>Quản lý quyền hạn của quản trị</i></div>
                    </div>
                </Popup>
            </div>
            


            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
        </div>
    )
}

const optionStyle = {
    margin: "7px",
}

const redOptionStyle = {
    margin: "7px",
    color: "#b85439"
}

const blueOptionStyle = {
    margin: "7px",
    color: "#39a5b8"
}

const greenOptionStyle = {
    margin: "7px",
    color: "#3fa14a"
}

const yellowOptionStyle = {
    margin: "7px",
    color: "#a19c3f"
}


export default MenuBar;