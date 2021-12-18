import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getLevel } from "../../../service/API/LevelAPI";
import { getBuilding } from "../../../service/API/BuildingAPI";
import LockerUseManagementContent from "../lockerUseManagement/LockerUseManagementContent";

function LockerLayoutManagementContent() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();
    const onSearchSubmit = (data) => {
        setIsSearch(true);
        setRequestData(data);
    };
    const [listBuilding, setListBuilding] = useState({
        items: [{
            bId: "",
            bName: "",
            bAddr: "",
            bDes: ""
        }],
        count: 0,
        total: 0,
        currentPage: 1,
        totalPage: 1
    })
    const [borderStyle, setBorderStyle] = useState({
        marginLeft: "50px",
        marginTop: "26px",
        marginBottom: "20px",
        border: "3px solid #1b8f51",
        width: "1360px",
        height: "0px",
        borderRadius: "30px/80px",
    });
    const [isSearch, setIsSearch] = useState(false);
    const [levelPermission, setLevelPermission] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [paginationNum, setPaginationNum] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [requestData, setRequestData] = useState({
        bId: 0,
    });
    const [responseData, setResponseData] = useState({
        items: [{
            lId: "",
            lLv: "",
            bId: "",
            bName: "",
            lDes: ""
        }],
        count: 0,
        total: 0,
        currentPage: 1,
        totalPage: 1
    });

    const buildingRequestData = {
        name: "",
        addr: "",
        bId: 0,
        page: 1
    }

    function handlePaginationRender(pgNum) {
        if (totalPage >= pgNum) {
            return (currentPage <= totalPage - 7 ? currentPage + pgNum - 1 : currentPage - paginationNum + pgNum);
        }
        else return "-";
    }

    useEffect(async () => {
        setListBuilding(await getBuilding(buildingRequestData, 1));
        setIsSearch(false);
        
        const contentHeight = document.getElementById("floorManagementContent").offsetHeight;
        setBorderStyle({
            marginLeft: "50px",
            marginTop: "26px",
            marginBottom: "20px",
            border: "3px solid #1b8f51",
            width: "1360px",
            height: contentHeight + 30 + "px",
            borderRadius: "30px/80px",
        });
    }, [requestData, currentPage, isSearch]);
    return (
        <div style={mainContent}>
            <h2 className="absolute" style={titleStyle}> Danh sách tủ trong hệ thống </h2>
            <div style={borderStyle}>
                <div id="floorManagementContent" style={contentStyle}>
                    <form onSubmit={handleSubmit(onSearchSubmit)}>
                        <div>
                            <select id="buildingId" name="buildingId" style={selectStyle}  {...register("bId")}>
                                <option value={0} hidden>Tòa nhà...</option>
                                <option value={0} style={{ color: "gray" }}>Bất kỳ</option>
                                {listBuilding.items.map(item => {
                                    return(
                                        <option value={item.bId}>{item.bName}</option>
                                    )
                                })}
                            </select>
                            <select id="buildingId" name="buildingId" style={selectStyle}  {...register("lId")}>
                                <option value={0} hidden>Tầng...</option>
                                <option value={0} style={{ color: "gray" }}>Bất kỳ</option>
                            </select>
                            <select id="buildingId" name="buildingId" style={selectStyle}  {...register("imei")}>
                                <option value={0} hidden>Thiết bị quản lý</option>
                                <option value={0} style={{ color: "gray" }}>Chưa build...</option>
                            </select>
                            <input style={searchInputStyle} type={"text"} placeholder="Nhãn tủ..." {...register("label")} />
                            <button type="submit" style={btnStyle}>Tìm kiếm</button>
                        </div>
                    </form>
                    <div style={{color: "red", margin: "20px", paddingBottom: "10px"}}>
                    Chức năng này chưa build do API chưa hoàn thiện.
                    </div>
                </div>
            </div>
        </div>
    );
}


const titleStyle = {
    zIndex: "1",
    fontFamily: "Courier New",
    color: "red",
    position: "absolute",
    left: "180px",
    top: "54px",
    backgroundColor: "#222D32",
}



const contentStyle = {
    width: "1300px",
    marginTop: "20px",
    marginLeft: "30px",
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

const mainContent = {
    marginTop: "70px", marginLeft: "50px"
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

const styledTable = {
    width: "1291px",
    marginLeft: "5px",
    marginRight: "5px",
    marginTop: "30px",
}

const actionIconStyle = {
    display: "inline",
    marginLeft: "15px",
    marginRight: "15px",
    fontSize: "20px",
}

const paginationStyle = {
    marginLeft: "400px",
    marginTop: "15px",
    paddingBottom: "5px",
    marginRight: "400px"
}

const pageNumberStyle = {
    display: "inline",
    width: "20px",
    marginLeft: "5px",
    marginRight: "5px"
}

const th1 = {
    width: "900px",
}

export default LockerLayoutManagementContent;