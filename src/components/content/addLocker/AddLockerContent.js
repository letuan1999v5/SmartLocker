import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { getEmployee, searchEmployee } from "../../../service/API/UserManagementAPI";
import { getDepartment } from "../../../service/API/DepartmentAPI";
import { getLocker } from "../../../service/API/LockerAPI";

function AddLockerContent() {
    const [employeeData, setEmployeeData] = useState([{
        eId: "",
        fName: "",
        name: "",
        eCode: "",
        dId: "",
        rCode: "",
        email: "",
        pCode: "",
        gStatus: "",
        occupiedLockerLabel: "",
    }]);
    const [currentPage1, setCurrentPage1] = useState(1);
    const [totalRecord1, setTotalRecord1] = useState(0);
    const [recordInPage1, setRecordInPage1] = useState(0);
    const [totalPage1, setTotalPage1] = useState(0);
    const [paginationNum1, setPaginationNum1] = useState(1);
    const [searchInput1, setSearchInput1] = useState({
        eName: "",
        eCode: "",
        dId: 0,
        email: "",
        eTag: "",
        isTag: 0,
        isPin: 0,
        isGroup: 0,
        isVip: 0,
    });
    const [type1, setType1] = useState("getAll");
    const [departmentList1, setDepartmentList1] = useState([]);
    const [departmentPage1, setDepartmentPage1] = useState(1);
    const [dpTotalPage1, setDpTotalPage1] = useState(1);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();
    const onSearchSubmit1 = (dt) => {
        let dt1 = {
            eName: dt.customerName,
            eCode: dt.customerId,
            dId: dt.dId,
            email: "",
            eTag: "",
            isTag: 0,
            isPin: 0,
            isGroup: dt.isGroup,
            isVip: 0,
        }
        setCurrentPage1(1);
        setType1("search");
        setSearchInput1(dt1);
        console.log(dt);
    };
    const [isCheck1, setIsCheck1] = useState(false);
    const [isCheck2, setIsCheck2] = useState(false);
    const [lockerList, setLockerList] = useState([]);
    const [lockerCurrentPage, setlockerCurrentPage] = useState(1);
    const [lockerTotalPage, setLockerTotalPage] = useState(1);
    const [lockerDisplayType, setLockerDisplayType] = useState("getAll");
    const [lockerTotalRecord, setLockerTotalRecord] = useState(0);
    const [lockerPermission, setLockerPermission] = useState(true);
    const [employeePermission, setEmployeePermission] = useState(true);
    function handleCheck1() {
        setIsCheck1(!isCheck1);
    }
    function handleCheck2() {
        setIsCheck2(!isCheck2);
    }

    const [borderStyle1, setBorderStyle1] = useState({
        marginLeft: "20px",
        marginBottom: "20px",
        border: "3px solid #1b8f51",
        width: "700px",
        height: "1180px",
        borderRadius: "30px/80px",
    });

    const [borderStyle2, setBorderStyle2] = useState({
        marginLeft: "20px",
        marginBottom: "20px",
        border: "3px solid #1b8f51",
        width: "700px",
        height: "1180px",
        borderRadius: "30px/80px",
    });

    useEffect(async () => {
        if (departmentPage1 <= dpTotalPage1) {
            let d = await getDepartment(departmentPage1);
            if(d !== -1){
                setDepartmentList1(departmentList1 => [...departmentList1, d.items]);
                setDpTotalPage1(d.totalPage);
                setDepartmentPage1(departmentPage1 + 1);
            }
        }

        if (type1 === "search") {
            let d = await searchEmployee(searchInput1, currentPage1);
            if(d === -1){
                setEmployeePermission(false);
            }
            else{
                setEmployeeData(d.items);
                setCurrentPage1(d.currentPage);
                setTotalRecord1(d.total);
                setTotalPage1(d.totalPage);
                setRecordInPage1(d.count);
            }
        }
        else if (type1 === "getAll") {
            let d = await getEmployee(searchInput1, currentPage1);
            if(d === -1){
                setEmployeePermission(false);
            }
            else{
                setEmployeeData(d.items);
                setCurrentPage1(d.currentPage);
                setTotalRecord1(d.total);
                setTotalPage1(d.totalPage);
                setRecordInPage1(d.count);
            }
        }

        if (lockerDisplayType === "search") {

        }
        else if (lockerDisplayType === "getAll") {
            let d = await getLocker(lockerCurrentPage);
            if (d === -1) setLockerPermission(false);
            else {
                setLockerList(d.items);
                setlockerCurrentPage(d.currentPage);
                setLockerTotalPage(d.totalPage);
                setLockerTotalRecord(d.total);
            }
        }
        const contentHeight1 = document.getElementById("addLockerContent1").offsetHeight;
        const contentHeight2 = document.getElementById("addLockerContent2").offsetHeight;
        setBorderStyle1({
            marginLeft: "20px",
            marginBottom: "20px",
            border: "3px solid #1b8f51",
            width: "700px",
            height: contentHeight1 + 30 + "px",
            borderRadius: "30px/80px",
        });
        setBorderStyle2({
            marginLeft: "20px",
            marginBottom: "20px",
            border: "3px solid #1b8f51",
            width: "700px",
            height: contentHeight2 + 30 + "px",
            borderRadius: "30px/80px",
        });
    }, [currentPage1, type1, searchInput1, departmentPage1, lockerCurrentPage, lockerDisplayType]);

    const onSearchSubmit2 = (data2) => {
        console.log(data2);
    }
    const space = " ";

    function handlePaginationRender1(pgNum) {
        if (totalPage1 >= pgNum) {
            return (currentPage1 <= totalPage1 - 7 ? currentPage1 + pgNum - 1 : currentPage1 - paginationNum1 + pgNum);
        }
        else return "-";
    }
    return (
        <div style={mainContent}>
            <div>
                <h2 className="absolute" style={titleStyle}> Danh sách người dùng hiện tại </h2>
                <div style={borderStyle1}>
                    <div id="addLockerContent1" className="searchContent" style={contentStyle}>
                        <form onSubmit={handleSubmit(onSearchSubmit1)}>
                            <div>
                                <input style={searchInputStyle} type={"text"} placeholder="Tên nhân viên..." {...register("customerName")} />
                                <input style={searchInputStyle} type={"text"} placeholder="ID nhân sự..." {...register("customerId")} />
                                <select id="department" name="department" style={selectStyle} {...register("dId")}>
                                    <option value={0} hidden>Bộ phận làm việc</option>
                                    <option value={0} style={{ color: "gray", fontStyle: "italic" }}>Bất kì </option>
                                    {departmentList1.map((items) => {
                                        return (
                                            items.map(item => {
                                                return (
                                                    <option value={item.dId}>{item.dName}</option>
                                                )
                                            })
                                        )
                                    })}
                                </select>
                            </div>
                            <div>
                                <select id="lockerStatus" name="lockerStatus" style={selectStyle}  {...register("isGroup")}>
                                    <option value={0} hidden>Tình trạng phân tủ</option>
                                    <option value={0} style={{ color: "gray", fontStyle: "italic" }}>Bất kì</option>
                                    <option value={1}>Chưa được phân tủ</option>
                                    <option value={2}>Đã được phân tủ</option>
                                </select>
                                <button type="submit" style={btnStyle}>Tìm kiếm</button>
                            </div>
                        </form>

                        <input type="checkbox" value={isCheck1} {...register("chooseAllCustomers")}
                            onChange={() => handleCheck1()} style={{ marginLeft: "15px", marginTop: "15px" }} />
                        <label for="checkbox1"> Chọn toàn bộ nhân viên phù hợp với tiêu chí tìm kiếm</label>
                        {/* <div style={{ display: "flex" }}>
                            <i style={reloadStyle} className="fas fa-redo-alt"></i>
                            <p style={reloadTextStyle}>Làm mới dữ liệu</p>
                        </div> */}
                        <table className="styled-table" style={styledTable}>
                            <thead>
                                <tr>
                                    <th>Họ và tên</th>
                                    <th>ID nhân sự</th>
                                    <th>Bộ phận làm việc</th>
                                    <th>Tình trạng phân tủ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employeePermission ? employeeData.map((item) => {
                                    return (
                                        <tr>
                                            <td>{item.name}</td>
                                            <td>{item.eCode}</td>
                                            <td></td>
                                            <td>{item.gStatus === 1 ? "Đã được phân tủ" : "Chưa được phân tủ"}</td>
                                        </tr>
                                    )
                                }) : permissionErr()}
                            </tbody>
                        </table>
                        <div className="pgBlock" style={paginationStyle}>
                            <div className="pagination" >
                                <li className="fas fa-chevron-left" onClick={() => {
                                    if (currentPage1 > 1) {
                                        switch (currentPage1) {
                                            case totalPage1 - 5:
                                                setPaginationNum1(2);
                                                break;
                                            case totalPage1 - 4:
                                                setPaginationNum1(3);
                                                break;
                                            case totalPage1 - 3:
                                                setPaginationNum1(4);
                                                break;
                                            case totalPage1 - 2:
                                                setPaginationNum1(5);
                                                break;
                                            case totalPage1 - 1:
                                                setPaginationNum1(6);
                                                break;
                                            case totalPage1:
                                                setPaginationNum1(7);
                                                break;
                                            default:
                                                setPaginationNum1(1);
                                                break;
                                        }
                                        setCurrentPage1(currentPage1 - 1);
                                    }
                                }} style={pageNumberStyle}></li>
                                <li className={paginationNum1 === 1 ? "active" : ""} style={pageNumberStyle} onClick={() => {
                                    setPaginationNum1(1); currentPage1 > totalPage1 - 7 ? setCurrentPage1(currentPage1 - paginationNum1 + 1) : setCurrentPage1(currentPage1)
                                }}>
                                    {currentPage1 <= totalPage1 - 7 ? currentPage1 : currentPage1 - paginationNum1 + 1}
                                </li>
                                <li className={paginationNum1 === 2 ? "active" : ""} style={pageNumberStyle} onClick={() => {
                                    if (totalPage1 >= 2) {
                                        if (currentPage1 >= totalPage1 - 7) {
                                            setCurrentPage1(currentPage1 - paginationNum1 + 2);
                                            setPaginationNum1(2);
                                        }
                                        else setCurrentPage1(currentPage1 + 1)
                                    }
                                }}>
                                    {handlePaginationRender1(2)}
                                </li>
                                <li className={paginationNum1 === 3 ? "active" : ""} style={pageNumberStyle} onClick={() => {
                                    if (totalPage1 >= 3) {
                                        if (currentPage1 >= totalPage1 - 8) {
                                            if (currentPage1 >= totalPage1 - 7) {
                                                setCurrentPage1(currentPage1 - paginationNum1 + 3);
                                                setPaginationNum1(3);
                                            }
                                            else {
                                                setCurrentPage1(currentPage1 + 2);
                                                setPaginationNum1(2);
                                            }
                                        }
                                        else setCurrentPage1(currentPage1 + 2);
                                    }
                                }}>
                                    {handlePaginationRender1(3)}
                                </li>
                                <li className={paginationNum1 === 4 ? "active" : ""} style={pageNumberStyle} onClick={() => {
                                    if (totalPage1 >= 4) {
                                        if (currentPage1 >= totalPage1 - 9) {
                                            if (currentPage1 >= totalPage1 - 7) {
                                                setCurrentPage1(currentPage1 - paginationNum1 + 4);
                                                setPaginationNum1(4);
                                            }
                                            else if (currentPage1 === totalPage1 - 8) {
                                                setCurrentPage1(currentPage1 + 3);
                                                setPaginationNum1(3);
                                            }
                                            else {
                                                setCurrentPage1(currentPage1 + 3);
                                                setPaginationNum1(2);
                                            }
                                        } else setCurrentPage1(currentPage1 + 3);
                                    }
                                }} >
                                    {handlePaginationRender1(4)}
                                </li>
                                <li className={paginationNum1 === 5 ? "active" : ""} style={pageNumberStyle} onClick={() => {
                                    if (totalPage1 >= 5) {
                                        if (currentPage1 >= totalPage1 - 10) {
                                            if (currentPage1 >= totalPage1 - 7) {
                                                setCurrentPage1(currentPage1 - paginationNum1 + 5);
                                                setPaginationNum1(5);
                                            }
                                            else if (currentPage1 === totalPage1 - 8) {
                                                setCurrentPage1(currentPage1 + 4);
                                                setPaginationNum1(4);
                                            }
                                            else if (currentPage1 === totalPage1 - 9) {
                                                setCurrentPage1(currentPage1 + 4);
                                                setPaginationNum1(3);
                                            }
                                            else {
                                                setCurrentPage1(currentPage1 + 4);
                                                setPaginationNum1(2);
                                            }
                                        } else setCurrentPage1(currentPage1 + 4);
                                    }

                                }} >
                                    {handlePaginationRender1(5)}
                                </li>
                                <li className="page__dots" >...</li>
                                <li className={paginationNum1 === 6 ? "active" : ""} style={pageNumberStyle} onClick={() => {
                                    if (totalPage1 >= 6) {
                                        setCurrentPage1(totalPage1 - 2);
                                        setPaginationNum1(6);
                                    }
                                }}>
                                    {totalPage1 >= 6 ? totalPage1 - 2 : "-"}
                                </li>
                                <li className={paginationNum1 === 7 ? "active" : ""} style={pageNumberStyle} onClick={() => {
                                    if (totalPage1 >= 7) {
                                        setCurrentPage1(totalPage1 - 1); setPaginationNum1(7);
                                    }
                                }}>
                                    {totalPage1 >= 7 ? totalPage1 - 1 : "-"}
                                </li>
                                <li className={paginationNum1 === 8 ? "active" : ""} style={pageNumberStyle} onClick={() => {
                                    if (totalPage1 >= 8) {
                                        setCurrentPage1(totalPage1); setPaginationNum1(8);
                                    }
                                }}>
                                    {totalPage1 >= 8 ? totalPage1 : "-"}
                                </li>
                                <li className="fas fa-chevron-right" onClick={() => {
                                    if (currentPage1 < totalPage1) {
                                        switch (currentPage1) {
                                            case totalPage1 - 1:
                                                setPaginationNum1(8);
                                                break;
                                            case totalPage1 - 2:
                                                setPaginationNum1(7);
                                                break;
                                            case totalPage1 - 3:
                                                setPaginationNum1(6);
                                                break;
                                            case totalPage1 - 4:
                                                setPaginationNum1(5);
                                                break;
                                            case totalPage1 - 5:
                                                setPaginationNum1(4);
                                                break;
                                            case totalPage1 - 6:
                                                setPaginationNum1(3);
                                                break;
                                            case totalPage1 - 7:
                                                setPaginationNum1(12);
                                                break;
                                            default:
                                                setPaginationNum1(1);
                                                break;
                                        }
                                        setCurrentPage1(currentPage1 + 1);
                                    }
                                }} style={pageNumberStyle}></li>
                            </div>
                            <div style={{ fontSize: "10px" }}><i>Bản ghi từ {currentPage1 * 20 - 19} đến {currentPage1 * 20 - 20 + recordInPage1} / tổng số {totalRecord1} bản ghi</i></div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h2 className="absolute" style={titleStyle2}> Danh sách các tủ hiện tại </h2>
                <div style={borderStyle2}>
                    <div id="addLockerContent2" className="searchContent" style={contentStyle}>
                        <form onSubmit={handleSubmit(onSearchSubmit2)}>
                            <div>
                                <select id="building" name="building" style={selectStyle} {...register("building")}>
                                    <option value={0} hidden>Tòa nhà</option>
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
                                    <option value="" hidden>Thiết bị quản lý...</option>
                                    <option value="" style={{ color: "gray" }}>Trống</option>
                                    <option value="tool1"> 1</option>
                                    <option value="tool2">2</option>
                                    <option value="tool3"> 3</option>
                                </select>
                            </div>
                            <div>
                                <input style={searchInputStyle} type={"text"} placeholder="Nhãn tủ..." {...register("lockerLabel")} />
                                <select id="lockerStatus" name="lockerStatus" style={selectStyle} {...register("lockerStatus")}>
                                    <option value="" hidden>Tình trạng phân tủ</option>
                                    <option value="" style={{ color: "gray" }}>Trống</option>
                                    <option value="Đã phân">Đã phân</option>
                                    <option value="Chưa phân">Chưa phân</option>
                                    <option value="Hỏng">Hỏng</option>
                                </select>
                                <button type="submit" style={btnStyle}>Tìm kiếm</button>
                            </div>
                        </form>
                        <input type="checkbox" value={isCheck2} {...register("chooseAllLockers")}
                            onChange={() => handleCheck2()} style={{ marginLeft: "15px", marginTop: "15px" }} />
                        <label for="checkbox1"> Chọn toàn bộ tủ phù hợp với tiêu chí tìm kiếm</label>

                        {/* <LockerList /> */}
                        <div>
                            <table className="styled-table" style={styledTable}>
                                <thead>
                                    <tr>
                                        <th>Tòa nhà</th>
                                        <th>Tầng</th>
                                        <th>Tủ</th>
                                        <th>Tình trạng phân tủ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {lockerPermission ? lockerList.map((item) => {
                                        return (
                                            <tr>
                                                <td>{item.bName}</td>
                                                <td>{item.lLv}</td>
                                                <td>{item.lLb}</td>
                                                <td>{item.gName}</td>
                                            </tr>
                                        )
                                    }) : permissionErr()}
                                    
                                </tbody>
                            </table>
                        </div>
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

const styledTable = {
    width: "630px",
    marginLeft: "10px",
    marginRight: "5px",
    marginTop: "20px",
    paddingBottom: "5px",
}



const paginationStyle = {
    marginLeft: "100px",
    marginTop: "15px",
    paddingBottom: "5px",
    marginRight: "100px"
}

const pageNumberStyle = {
    display: "inline",
    width: "20px",
    marginLeft: "5px",
    marginRight: "5px"
}

const permissionErr = () => {
    return(
        <div style={{color: "red", textAlign: "center", marginTop: "10px"}}>
            Đã xảy ra lỗi. Vui lòng kiểm tra lại quyền hạn
        </div>
    )
}

export default AddLockerContent;