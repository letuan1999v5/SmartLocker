import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import UserManagementContent from "../userManagement/UserManagementContent";
import { getController } from "../../../service/API/ControllerAPI";
import { getBuilding } from "../../../service/API/BuildingAPI";
import { getLevel } from "../../../service/API/LevelAPI";
import { getLockerHistory } from "../../../service/API/ReportAPI";
import { getManager } from "../../../service/API/ManagerAPI";

function ManagerManagementContent() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();
    const onSearchSubmit = (data) => {
        setRequestData({
            eName: data.eName,
            eCode: data.eCode,
            eTag: data.eTag,
            sTag: data.sTag,
            rId: data.rId,
        })
        console.log(data);
        setIsSearch(true);
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
    });
    const [levelRequestData, setLevelRequestData] = useState({
        bId: 0,
    });
    const [controllerRequestData, setControllerRequestData] = useState({
        lId: 0,
        bId: 0,
        imei: "",
        mac: "",
        zone: ""
    });
    const [listTool, setListTool] = useState({
        items: [{
            bId: "",
            lId: "",
            lLv: "",
            cId: "",
            imei: "",
            mac: "",
            des: "",
            sLabel: "",
            eLabel: "",
            bName: "",
            zone: "",
            cFw: "",
            health: "",
        }],
        count: 0,
        total: 0,
        currentPage: 1,
        totalPage: 1
    })
    const [listLevel, setListLevel] = useState({
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
    const [selectedBuilding, setSelectedBuilding] = useState(0);
    const [selectedLevel, setSelectedLevel] = useState(0);
    const [isSearch, setIsSearch] = useState(false);
    const [controllerPermission, setControllerPermission] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [paginationNum, setPaginationNum] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [requestData, setRequestData] = useState({
        eName: "",
        eCode: "",
        eTag: "",
        sTag: 0,
        rId: 0,
    });
    const [responseData, setResponseData] = useState({
        items: [{
            eCode: "",
            eName: "",
            eTag: "",
            uName: "",
            rId: 0,
        }],
        count: 0,
        total: 0,
        currentPage: 1,
        totalPage: 1
    });

    function showRole(rId) {
        switch (rId) {
            case 2:
                return "Super Admin";
            case 19:
                return "Admin";
            case 22:
                return "Viewer";
            default:
                return "Undefined";
        }
    }

    const buildingRequestData = {
        name: "",
        addr: "",
        bId: 0,
        page: 1
    }

    const [borderStyle, setBorderStyle] = useState({
        marginLeft: "50px",
        marginTop: "26px",
        marginBottom: "20px",
        border: "3px solid #1b8f51",
        width: "1360px",
        height: "0px",
        borderRadius: "30px/80px",
    });

    function handlePaginationRender(pgNum) {
        if (totalPage >= pgNum) {
            return (currentPage <= totalPage - 7 ? currentPage + pgNum - 1 : currentPage - paginationNum + pgNum);
        }
        else return "-";
    }

    useEffect(async () => {
        setIsSearch(false);
        setListBuilding(await getBuilding(buildingRequestData, 1));
        setListLevel(await getLevel(levelRequestData, 1));
        setListTool(await getController(controllerRequestData, 1));
        let d = await getManager(requestData, currentPage);
        if (d !== -1) {
            setResponseData(d);
            setTotalPage(d.totalPage);
            setCurrentPage(d.currentPage);
        }
        else {
            setControllerPermission(false);
        }
        console.log(responseData);
        const contentHeight = document.getElementById("historyReportContent").offsetHeight;
        setBorderStyle({
            marginLeft: "50px",
            marginTop: "26px",
            marginBottom: "20px",
            border: "3px solid #1b8f51",
            width: "1360px",
            height: contentHeight + 30 + "px",
            borderRadius: "30px/80px",
        });
    }, [currentPage, requestData, isSearch, selectedBuilding, selectedLevel]);
    return (
        <div style={mainContent}>
            <h2 className="absolute" style={titleStyle}> Danh s??ch l???ch s??? s??? d???ng t??? trong h??? th???ng </h2>
            <div style={borderStyle}>
                <div id="historyReportContent" style={contentStyle}>
                    <form onSubmit={handleSubmit(onSearchSubmit)}>
                        <div>
                            <input style={searchInputStyle} type={"text"} placeholder="T??n ????ng nh???p..." {...register("uName")} />
                            <input style={searchInputStyle} type={"text"} placeholder="T??n qu???n tr??? vi??n..." {...register("eName")} />
                            <input style={searchInputStyle} type={"text"} placeholder="ID nh??n s???..." {...register("eCode")} />
                            <input style={searchInputStyle} type={"text"} placeholder="M?? th??? t???..." {...register("eTag")} />
                            <select id="eTag" name="eTag" style={selectStyle} {...register("sTag")}>
                                <option value={0} hidden >T??nh tr???ng s??? d???ng th???</option>
                                <option value={0} style={{ color: "gray" }} >B???t k???</option>
                                <option value={1}>Ch??a c?? th???</option>
                                <option value={2}>???? c?? th???</option>
                            </select>
                            <select id="rId" name="rId" style={selectStyle} {...register("rId")}>
                                <option value={0} hidden >Quy???n h???n</option>
                                <option value={0} style={{ color: "gray" }} >B???t k???</option>
                                <option value={2}>Super Admin</option>
                                <option value={19}>Admin</option>
                                <option value={22}>Viewer</option>
                            </select>
                        </div>
                        <button type="submit" style={btnStyle}>T??m ki???m</button>
                    </form>
                    <table class="styled-table" id="listToolTable" style={styledTable}>
                        <thead>
                            <tr>
                                <th style={th1}>T??n ????ng nh???p</th>
                                <th style={th1}>H??? v?? t??n</th>
                                <th style={th1}>ID nh??n s???</th>
                                <th style={th1}>Th??? ??ang s??? d???ng</th>
                                <th style={th1}>Quy???n h???n</th>
                                <th st  yle={th1}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {responseData.items.map(item => {
                                return (
                                    <tr>
                                        <td>{item.uName}</td>
                                        <td>{item.eName}</td>
                                        <td>{item.eName}</td>
                                        <td>{item.eTag}</td>
                                        <td>{showRole(item.rId)}</td>
                                        <td>
                                            <i class="far fa-edit" style={actionIconStyle}></i>
                                            <i class="far fa-cut" style={actionIconStyle}></i>
                                            <i class="far fa-backspace" style={actionIconStyle}></i>
                                            <i class="far fa-eraser" style={actionIconStyle}></i>
                                        </td>

                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <div className="pgBlock" style={paginationStyle}>
                        <div className="pagination" >
                            <li className="fas fa-chevron-left" onClick={() => {
                                if (currentPage > 1) {
                                    if (totalPage < 8) {
                                        setPaginationNum(currentPage - 1);
                                        setCurrentPage(currentPage - 1);
                                    }
                                    else {
                                        switch (currentPage) {
                                            case totalPage - 5:
                                                setPaginationNum(2);
                                                break;
                                            case totalPage - 4:
                                                setPaginationNum(3);
                                                break;
                                            case totalPage - 3:
                                                setPaginationNum(4);
                                                break;
                                            case totalPage - 2:
                                                setPaginationNum(5);
                                                break;
                                            case totalPage - 1:
                                                setPaginationNum(6);
                                                break;
                                            case totalPage:
                                                setPaginationNum(7);
                                                break;
                                            default:
                                                setPaginationNum(1);
                                                break;
                                        }
                                        setCurrentPage(currentPage - 1);
                                    }
                                }
                            }} style={pageNumberStyle}></li>
                            <li className={paginationNum === 1 ? "active" : ""} style={pageNumberStyle} onClick={() => {
                                setPaginationNum(1); currentPage > totalPage - 7 ? setCurrentPage(currentPage - paginationNum + 1) : setCurrentPage(currentPage)
                            }}>
                                {currentPage <= totalPage - 7 ? currentPage : currentPage - paginationNum + 1}
                            </li>
                            <li className={paginationNum === 2 ? "active" : ""} style={pageNumberStyle} onClick={() => {
                                if (totalPage >= 2) {
                                    if (currentPage >= totalPage - 7) {
                                        setCurrentPage(currentPage - paginationNum + 2);
                                        setPaginationNum(2);
                                    }
                                    else setCurrentPage(currentPage + 1)
                                }
                            }}>
                                {handlePaginationRender(2)}
                            </li>
                            <li className={paginationNum === 3 ? "active" : ""} style={pageNumberStyle} onClick={() => {
                                if (totalPage >= 3) {
                                    if (currentPage >= totalPage - 8) {
                                        if (currentPage >= totalPage - 7) {
                                            setCurrentPage(currentPage - paginationNum + 3);
                                            setPaginationNum(3);
                                        }
                                        else {
                                            setCurrentPage(currentPage + 2);
                                            setPaginationNum(2);
                                        }
                                    }
                                    else setCurrentPage(currentPage + 2);
                                }
                            }}>
                                {handlePaginationRender(3)}
                            </li>
                            <li className={paginationNum === 4 ? "active" : ""} style={pageNumberStyle} onClick={() => {
                                if (totalPage >= 4) {
                                    if (currentPage >= totalPage - 9) {
                                        if (currentPage >= totalPage - 7) {
                                            setCurrentPage(currentPage - paginationNum + 4);
                                            setPaginationNum(4);
                                        }
                                        else if (currentPage === totalPage - 8) {
                                            setCurrentPage(currentPage + 3);
                                            setPaginationNum(3);
                                        }
                                        else {
                                            setCurrentPage(currentPage + 3);
                                            setPaginationNum(2);
                                        }
                                    } else setCurrentPage(currentPage + 3);
                                }
                            }} >
                                {handlePaginationRender(4)}
                            </li>
                            <li className={paginationNum === 5 ? "active" : ""} style={pageNumberStyle} onClick={() => {
                                if (totalPage >= 5) {
                                    if (currentPage >= totalPage - 10) {
                                        if (currentPage >= totalPage - 7) {
                                            setCurrentPage(currentPage - paginationNum + 5);
                                            setPaginationNum(5);
                                        }
                                        else if (currentPage === totalPage - 8) {
                                            setCurrentPage(currentPage + 4);
                                            setPaginationNum(4);
                                        }
                                        else if (currentPage === totalPage - 9) {
                                            setCurrentPage(currentPage + 4);
                                            setPaginationNum(3);
                                        }
                                        else {
                                            setCurrentPage(currentPage + 4);
                                            setPaginationNum(2);
                                        }
                                    } else setCurrentPage(currentPage + 4);
                                }

                            }} >
                                {handlePaginationRender(5)}
                            </li>
                            <li className="page__dots" >...</li>
                            <li className={paginationNum === 6 ? "active" : ""} style={pageNumberStyle} onClick={() => {
                                if (totalPage >= 6) {
                                    setCurrentPage(totalPage - 2);
                                    setPaginationNum(6);
                                }
                            }}>
                                {totalPage >= 6 ? totalPage - 2 : "-"}
                            </li>
                            <li className={paginationNum === 7 ? "active" : ""} style={pageNumberStyle} onClick={() => {
                                if (totalPage >= 7) {
                                    setCurrentPage(totalPage - 1); setPaginationNum(7);
                                }
                            }}>
                                {totalPage >= 7 ? totalPage - 1 : "-"}
                            </li>
                            <li className={paginationNum === 8 ? "active" : ""} style={pageNumberStyle} onClick={() => {
                                if (totalPage >= 8) {
                                    setCurrentPage(totalPage); setPaginationNum(8);
                                }
                            }}>
                                {totalPage >= 8 ? totalPage : "-"}
                            </li>
                            <li className="fas fa-chevron-right" onClick={() => {
                                if (currentPage < totalPage) {
                                    if (totalPage < 8) {
                                        setPaginationNum(currentPage + 1);
                                        setCurrentPage(currentPage + 1);
                                    }
                                    else {
                                        switch (currentPage) {
                                            case totalPage - 1:
                                                setPaginationNum(8);
                                                break;
                                            case totalPage - 2:
                                                setPaginationNum(7);
                                                break;
                                            case totalPage - 3:
                                                setPaginationNum(6);
                                                break;
                                            case totalPage - 4:
                                                setPaginationNum(5);
                                                break;
                                            case totalPage - 5:
                                                setPaginationNum(4);
                                                break;
                                            case totalPage - 6:
                                                setPaginationNum(3);
                                                break;
                                            case totalPage - 7:
                                                setPaginationNum(2);
                                                break;
                                            default:
                                                setPaginationNum(1);
                                                break;
                                        }
                                        setCurrentPage(currentPage + 1);
                                    }
                                }
                            }} style={pageNumberStyle}></li>
                        </div>
                        <div style={{ fontSize: "10px" }}><i>B???n ghi t??? {currentPage * 20 - 19} ?????n {currentPage * 20 - 20 + responseData.count} / t???ng s??? {responseData.total} b???n ghi</i></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mainContent = {
    marginTop: "70px", marginLeft: "50px"
}

const styledTable = {
    width: "1291px",
    marginLeft: "5px",
    marginRight: "5px",
    marginTop: "30px",
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
    backgroundColor: "#f2f2f2"
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

const dateInputStyle = {
    width: "200px",
    padding: "12px 20px",
    marginTop: "5px",
    marginBottom: "5px",
    marginLeft: "15px",
    display: "inline-block",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxSizing: "border-box",
    backgroundColor: "#f2f2f2"
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
    marginTop: "7px",
    paddingTop: "10px",
    marginBottom: "5px",
    display: "inline-block",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxSizing: "border-box",
    backgroundColor: "#bda13e",
}

const reloadTextStyle = {
    marginLeft: "5px",
    marginTop: "7px",
}

const reloadStyle = {
    marginLeft: "20px",
    marginTop: "10px",
}

const sDateStyle = {
    zIndex: "1",
    fontFamily: "Courier New",
    color: "red",
    position: "absolute",
    left: "168px",
    top: "143px",
    backgroundColor: "#f2f2f2",
    fontSize: "13px",
}

const eDateStyle = {
    zIndex: "1",
    fontFamily: "Courier New",
    color: "red",
    position: "absolute",
    left: "383px",
    top: "143px",
    backgroundColor: "#f2f2f2",
    fontSize: "13px",
}

const th1 = {
    width: "900px",
}

const actionIconStyle = {
    display: "inline",
    marginLeft: "15px",
    marginRight: "15px",
    fontSize: "20px",
}

export default ManagerManagementContent;