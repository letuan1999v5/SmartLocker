import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Checkbox } from "../../common/Checkbox";
import { MiniUserList2 } from "./MiniUserList2";
import { LockerList2 } from "./LockerList2";
import { getUsage } from "../../../service/API/LockerAPI";

function LockerUseManagementContent() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();
    const onSearchSubmit1 = (data) => {
        console.log(data);
    };
    const onSearchSubmit2 = (data) => {
        console.log(data);
    }
    const space = " ";
    const [usageData, setusageData] = useState();
    const [usageCurrentPage, setUsageCurrentPage] = useState(1);
    const [usageTotalRecord, setUsageTotalRecord] = useState(0);
    const [usageTotalPage, setUsageTotalPage] = useState(0);
    return (
        <div style={mainContent}>
            <div>
                <h2 className="absolute" style={titleStyle}> Danh sách người dùng hiện tại </h2>
                <div style={borderStyle}>
                    <div className="searchContent" style={contentStyle}>
                        <form onSubmit={handleSubmit(onSearchSubmit1)}>
                            <div>
                                <input style={searchInputStyle} type={"text"} placeholder="Tên nhân viên..." {...register("customerName")} />
                                <input style={searchInputStyle} type={"text"} placeholder="ID nhân sự..." {...register("customerId")} />
                                <select id="department" name="department" style={selectStyle} {...register("department")}>
                                    <option value="" hidden>Bộ phận làm việc</option>
                                    <option value="" style={{ color: "gray" }}>Trống</option>
                                    <option value="department 1">Department 1</option>
                                    <option value="department 2">Department 2</option>
                                    <option value="department 3">Department 3</option>
                                </select>
                            </div>
                            <div>
                                <select id="building" name="building" style={selectStyle} {...register("building")}>
                                    <option value="" hidden>Tòa nhà</option>
                                    <option value="" style={{ color: "gray" }}>Trống</option>
                                    <option value="department 1">Department 1</option>
                                    <option value="department 2">Department 2</option>
                                    <option value="department 3">Department 3</option>
                                </select>
                                <input style={searchInputStyle} type={"text"} placeholder="Nhãn tủ..." {...register("lockerLabel")} />
                                <button type="submit" style={btnStyle}>Tìm kiếm</button>
                            </div>
                        </form>
                        <div style={{ display: "flex" }}>
                            <i style={reloadStyle} class="fas fa-redo-alt"></i>
                            <p style={reloadTextStyle}>Làm mới dữ liệu</p>
                        </div>
                        <MiniUserList2 />
                    </div>
                </div>
            </div>
            <div>
                <h2 className="absolute" style={titleStyle2}> Danh sách các tủ hiện tại </h2>
                <div style={borderStyle}>
                    <div className="searchContent" style={contentStyle}>
                        <form onSubmit={handleSubmit(onSearchSubmit2)}>
                            <div>
                                <select id="building" name="building" style={selectStyle} {...register("building")}>
                                    <option value="" hidden>Tòa nhà</option>
                                    <option value="" style={{ color: "gray" }}>Trống</option>
                                    <option value="department 1">Department 1</option>
                                    <option value="department 2">Department 2</option>
                                    <option value="department 3">Department 3</option>
                                </select>
                                <select id="floor" name="floor" style={selectStyle} {...register("floor")}>
                                    <option value="" hidden>Tầng</option>
                                    <option value="" style={{ color: "gray" }}>Trống</option>
                                    <option value="department 11">Department 1</option>
                                    <option value="department 21">Department 2</option>
                                    <option value="department 31">Department 3</option>
                                </select>
                                <select id="managementTool" name="managementTool" style={selectStyle}  {...register("rank")}>
                                    <option value="" hidden>Thiết bị quản lý</option>
                                    <option value="" style={{ color: "gray" }}>Trống</option>
                                    <option value="tool1"> 1</option>
                                    <option value="tool2">2</option>
                                    <option value="tool3"> 3</option>
                                </select>
                            </div>
                            <div>
                                <input style={searchInputStyle} type={"text"} placeholder="Nhãn tủ..." {...register("lockerLabel")} />
                                <button type="submit" style={btnStyle}>Tìm kiếm</button>
                            </div>
                        </form>
                        <div style={{ display: "flex" }}>
                            <i style={reloadStyle} class="fas fa-redo-alt"></i>
                            <p style={reloadTextStyle}>Làm mới dữ liệu</p>
                        </div>
                        <LockerList2 />
                    </div>
                </div>
            </div>
        </div>

    );
}


const titleStyle = {
    fontFamily: "Courier New",
    color: "red",
    position: "absolute",
    left: "130px",
    top: "54px",
    backgroundColor: "#222D32",
}

const borderStyle = {
    marginLeft: "20px",
    // marginTop: "26px",
    marginBottom: "20px",
    border: "3px solid #1b8f51",
    width: "700px",
    height: "1180px",
    borderRadius: "30px/80px",
}

const contentStyle = {
    width: "650px",
    marginTop: "20px",
    marginLeft: "27px",
    borderRadius: "5px",
    backgroundColor: " #f2f2f2"
}

const searchInputStyle = {
    width: "200px",
    padding: "12px 20px",
    marginTop: "5px",
    marginBottom: "5px",
    marginLeft: "15px",
    display: "inline-block",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxSizing: "border-box",
}

const selectStyle = {
    width: "200px",
    padding: "12px 20px",
    marginLeft: "15px",
    marginTop: "5px",
    marginBottom: "5px",
    display: "inline-block",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxSizing: "border-box",
}

const btnStyle = {
    width: "200px",
    padding: "12px 20px",
    marginLeft: "15px",
    marginTop: "5px",
    marginBottom: "5px",
    display: "inline-block",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxSizing: "border-box",
    backgroundColor: "#bda13e",
}

const titleStyle2 = {
    fontFamily: "Courier New",
    color: "red",
    position: "absolute",
    left: "850px",
    top: "54px",
    backgroundColor: "#222D32",
}

const reloadTextStyle = {
    marginLeft: "5px",
    marginTop: "7px",
}

const reloadStyle = {
    marginLeft: "20px",
    marginTop: "10px",
}

const mainContent = {
    marginTop: "70px",
    marginLeft: "50px",
    display: "flex",
}


export default LockerUseManagementContent;