import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../service/API/AuthenticationAPI'

function Header() {
    const menu = useSelector(state => state.menu.value);
    function renderHeader(menu) {
        switch (menu) {
            case 1:
                return (
                    <div style={{ width: "850px", color: "#b85439"}}>
                        Trang chủ
                    </div>
                )
            case 2:
                return (
                    <div style={{ width: "850px", color: "#39a5b8" }}>
                        Quản lý người sử dụng
                    </div>
                )
            case 3:
                return (
                    <div style={{ width: "850px", color: "#39a5b8" }}>
                        Thêm tủ cho nhân viên
                    </div>
                )
            case 4:
                return (
                    <div style={{ width: "850px", color: "#39a5b8" }}>
                        Quản lý sử dụng tủ
                    </div>
                )
            case 5:
                return (
                    <div style={{ width: "850px", color: "#39a5b8" }}>
                        Quản lý bộ phận / phòng ban
                    </div>
                )
            case 6:
                return (
                    <div style={{ width: "850px", color: "#3fa14a" }}>
                        Quản lý tòa nhà
                    </div>
                )
            case 7:
                return (
                    <div style={{ width: "850px", color: "#3fa14a" }}>
                        Quản lý tầng
                    </div>
                )
            case 8:
                return (
                    <div style={{ width: "850px", color: "#3fa14a" }}>
                        Quản lý thiết bị điều khiển
                    </div>
                )
            case 9:
                return (
                    <div style={{ width: "850px", color: "#3fa14a" }}>
                        Quản lý tủ
                    </div>
                )
            case 10:
                return (
                    <div style={{ width: "850px", color: "#3fa14a" }}>
                        Quản lý layout tủ
                    </div>
                )
            case 11:
                return (
                    <div style={{ width: "850px", color: "#b85439" }}>
                        Cảnh báo
                    </div>
                )
            case 12:
                return (
                    <div style={{ width: "850px", color: "#a19c3f" }}>
                        Báo cáo sự kiện theo thời gian thực
                    </div>
                )
            case 13:
                return (
                    <div style={{ width: "850px", color: "#a19c3f" }}>
                        Báo cáo trạng thái
                    </div>
                )
            case 14:
                return (
                    <div style={{ width: "850px", color: "#a19c3f" }}>
                        Báo cáo lịch sử sử dụng
                    </div>
                )
            case 15:
                return (
                    <div style={{ width: "850px", color: "#b85439" }}>
                        Quản lý tài khoản quản trị
                    </div>
                )
            case 16:
                return (
                    <div style={{ width: "850px", color: "#b85439" }}>
                        Quản lý quyền hạn của quản trị
                    </div>
                )
            default:
                break;
        }
    }
    return (
        <div className='header absolute'>
            {renderHeader(menu)}
            <div>
                <i className="fas fa-bell"></i>
            </div>
            <div style={{ marginLeft: "20px", width: "350px", color: "#b2bad1"}}>
                Xin chào, {localStorage.getItem("name")}
            </div>
            <div style={{ marginLeft: "50px" }}>
                <i className="fas fa-cog"></i>
            </div>
            <div style={{ marginLeft: "20px" }}>
                <i className="far fa-sign-out-alt" onClick={logout}></i>
            </div>
        </div>
    )
}

export default Header;