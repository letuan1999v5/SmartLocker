import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getBuilding } from "../../../service/API/BuildingAPI";

function BuildingManagementContent() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();
    const onSearchSubmit = (data) => {
        console.log(data);
    };

    const [isSearch, setIsSearch] = useState(false);
    const [buildingPermission, setBuildingPermission] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [paginationNum, setPaginationNum] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [requestData, setRequestData] = useState({
        name: "",
        addr: "",
        bId: 0,
        page: 1
    });
    const [responseData, setResponseData] = useState({
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

    const [borderStyle, setBorderStyle] = useState({
        marginLeft: "50px",
        marginTop: "26px",
        marginBottom: "20px",
        border: "3px solid #1b8f51",
        width: "1360px",
        height: "290px",
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
        let d = await getBuilding(requestData, currentPage);
        if (d !== -1) {
            setResponseData(d);
            setTotalPage(d.totalPage);
            setCurrentPage(d.currentPage)
        }
        else {
            setBuildingPermission(false);
        }
        const contentHeight = document.getElementById("buildingManagementContent").offsetHeight;
        setBorderStyle({
            marginLeft: "50px",
            marginTop: "26px",
            marginBottom: "20px",
            border: "3px solid #1b8f51",
            width: "1360px",
            height: contentHeight + 30 + "px",
            borderRadius: "30px/80px",
        })
    }, [requestData, currentPage])
    return (
        <div style={mainContent}>
            <h2 className="absolute" style={titleStyle}> Danh s??ch c??c t??a nh?? trong h??? th???ng </h2>
            <div style={borderStyle}>
                <div id="buildingManagementContent" style={contentStyle}>
                    <form onSubmit={handleSubmit(onSearchSubmit)}>
                        <div>
                            <input style={searchInputStyle} type={"text"} placeholder="T??a nh??..." {...register("customerName")} />
                            <input style={searchInputStyle} type={"text"} placeholder="?????a ch???..." {...register("customerName")} />
                            <button type="submit" style={btnStyle}>T??m ki???m</button>
                        </div>
                    </form>
                    <table class="styled-table" style={styledTable}>
                        <thead>
                            <tr>
                                <th style={th1}>T??a nh??</th>
                                <th style={th1}>?????a ch???</th>
                                <th style={th1}>Th??ng tin m?? t???</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {responseData.items.map(item => {
                                return (
                                    <tr>
                                        <td>{item.bName}</td>
                                        <td>{item.bAddr}</td>
                                        <td>{item.bDes}</td>
                                        <td>
                                            <i class="fas fa-pen" style={actionIconStyle}></i>
                                            <i class="fas fa-trash-alt" style={actionIconStyle}></i>
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

const mainContent = {
    marginTop: "70px", marginLeft: "50px"
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
const styledTable = {
    width: "1291px",
    marginLeft: "5px",
    marginRight: "5px",
    marginTop: "30px",
}

const actionIconStyle = {
    display: "inline",
    marginLeft: "10px",
    marginRight: "10px",
    fontSize: "20px",
}

const th1 = {
    width: "900px",
}

export default BuildingManagementContent;