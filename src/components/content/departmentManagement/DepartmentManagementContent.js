import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getDepartment, searchDepartment } from "../../../service/API/DepartmentAPI";
function DepartmentManagementContent() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();
    const onSearchSubmit = (data) => {
        setCurrentPage(1);
        setSearchData(data);
        setDepartmentDisplayType("search");
        setIsSearch(true);
    };
    const [borderStyle, setBorderStyle] = useState({
        marginLeft: "50px",
        marginTop: "26px",
        marginBottom: "20px",
        border: "3px solid #1b8f51",
        width: "1360px",
        height: "1130px",
        borderRadius: "30px/80px",
    });
    const [departmentDisplayType, setDepartmentDisplayType] = useState("getAll");
    const [departmentData, setDepartmentData] = useState([{
        dName: ""
    }]);
    const [totalPage, setTotalPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRecord, setTotalRecord] = useState(0);
    const [paginationNum, setPaginationNum] = useState(1);
    const [recordInPage, setRecordInPage] = useState(0);
    const [searchData, setSearchData] = useState("");
    const [isSearch, setIsSearch] = useState(false);

    function handlePaginationRender(pgNum) {
        if (totalPage >= pgNum) {
            return (currentPage <= totalPage - 7 ? currentPage + pgNum - 1 : currentPage - paginationNum + pgNum);
        }
        else return "-";
    }

    useEffect(async () => {
        if (departmentDisplayType === "search") {
            setIsSearch(false);
            console.log(searchData.customerName);
            let d = await searchDepartment(searchData.customerName, currentPage);
            console.log(d);
            if (d !== -1) {
                setDepartmentData(d.items);
                setCurrentPage(d.currentPage);
                setTotalRecord(d.total);
                setTotalPage(d.totalPage);
                setRecordInPage(d.count);
            }
        }
        else if (departmentDisplayType === "getAll") {
            setIsSearch(false);
            let d = await getDepartment(currentPage);
            if (d !== -1) {
                setDepartmentData(d.items);
                setCurrentPage(d.currentPage);
                setTotalRecord(d.total);
                setTotalPage(d.totalPage);
                setRecordInPage(d.count);
            }
        }
        const contentHeight = document.getElementById("departmentManagementContent").offsetHeight;
        setBorderStyle({
            marginLeft: "50px",
            marginTop: "26px",
            marginBottom: "20px",
            border: "3px solid #1b8f51",
            width: "1360px",
            height: contentHeight + 30 + "px",
            borderRadius: "30px/80px",
        })
    }, [currentPage, departmentDisplayType, isSearch])
    return (
        <div style={mainContent}>
            <h2 className="absolute" style={titleStyle}> Danh sách bộ phận / phòng ban </h2>
            <div style={borderStyle}>
                <div id="departmentManagementContent" style={contentStyle}>
                    <form onSubmit={handleSubmit(onSearchSubmit)}>
                        <div>
                            <input style={searchInputStyle} type={"text"} placeholder="Bộ phận / phòng ban..." {...register("customerName")} />
                            <button type="submit" style={btnStyle}>Tìm kiếm</button>
                        </div>
                    </form>

                    <table className="styled-table" style={styledTable}>
                        <thead>
                            <tr>
                                <th style={{ width: "900px" }}>Tên bộ phận / phòng ban</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {departmentData.map((item) => {
                                return (
                                    <tr>
                                        <td style={td1}>{item.dName}</td>
                                        <td >
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
                        <div style={{ fontSize: "10px" }}><i>Bản ghi từ {currentPage * 20 - 19} đến {currentPage * 20 - 20 + recordInPage} / tổng số {totalRecord} bản ghi</i></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mainContent = {
    marginTop: "70px", marginLeft: "50px"
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
    backgroundColor: " lightgray"
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

const styledTable = {
    width: "1291px",
    marginLeft: "5px",
    marginRight: "5px",
    marginTop: "30px",
}

const actionIconStyle = {
    display: "inline",
    marginLeft: "20px",
    marginRight: "20px",
    fontSize: "20px",
    textAlign: "center"
}

const paginationStyle = {
    marginLeft: "400px",
    marginTop: "15px",
    paddingBottom: "5px",
    marginRight: "400px"
}

const pageNumberStyle = {
    display: "inline",
    width: "5px",
    marginLeft: "10px",
}

const th1 = {
    width: "900px",
}

const td1 = {
    textAlign: "left",
}

export default DepartmentManagementContent