import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getAll, search } from "../../../redux2/reducer/UserManagementReducer";
import { getEmployee, exportUser, createUser, editUser, sendPin, unmapPin, unmapTag, removeUser } from "../../../service/API/UserManagementAPI";
import { getDepartment } from "../../../service/API/DepartmentAPI";
import addLogo from "../../../img/add.png";
import downloadLogo from "../../../img/download2.png";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
var Blob = require('cross-blob');
var fileDownload = require('js-file-download');

function UserManagementContent() {
    const [data, setData] = useState([{
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
    const [isSearch, setIsSearch] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRecord, setTotalRecord] = useState(0);
    const [recordInPage, setRecordInPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [paginationNum, setPaginationNum] = useState(1);
    const [requestData, setRequestData] = useState({
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
    const [type, setType] = useState("getAll");
    const [departmentList, setDepartmentList] = useState([]);
    const [departmentPage, setDepartmentPage] = useState(1);
    const [dpTotalPage, setDpTotalPage] = useState(1);
    const [addUserData, setAddUserData] = useState({
        code: "",
        dId: 0,
        email: "",
        eVip: false,
        name: "",
        pin: false,
        tag: "",
        token: localStorage.getItem("crfs"),
    });
    const [editUserData, setEditUserData] = useState({
        eCode: "",
        eId: 0,
        dId: 0,
        email: "",
        eVip: 0,
        name: "",
        tag: "",
        token: localStorage.getItem("crfs"),
    });
    const [editId, setEditId] = useState(0);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();
    const onSearchSubmit = (dt) => {
        setCurrentPage(1);
        setType("search");
        setIsSearch(true);
        setRequestData(dt);
    };
    const [addStatus, setAddStatus] = useState(1);
    const [isAdd, setIsAdd] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editStatus, setEditStatus] = useState(1);
    const addEmployeeSubmit = (dt) => {
        setAddUserData({
            code: dt.addECode,
            dId: dt.addDId,
            email: dt.addEmail,
            eVip: false,
            name: dt.addEName,
            pin: false,
            tag: dt.addETag,
            token: localStorage.getItem("crfs"),
        });
        setIsAdd(true);
    }
    const editEmployeeSubmit = (dt) => {
        setEditUserData({
            eCode: dt.editECode,
            eId: editId,
            dId: dt.editDId,
            email: dt.editEmail,
            eVip: 0,
            name: dt.editEName,
            tag: dt.editETag,
            token: localStorage.getItem("crfs"),
        });
        setIsEdit(true);
    }

    const [sendCode, setSendCode] = useState(false);
    const [sendCodeStatus, setSendCodeStatus] = useState(1);
    const sendCodeEmployeeSubmit = (dt) => {
        setSendCode(true);
    }
    const [isUnmapPin, setUnmapPin] = useState(false);
    const unmapPinSubmit = (dt) => {
        setUnmapPin(true);
    }
    const [unmapPinStatus, setUnmapPinStatus] = useState(1);

    const [isUnmapTag, setUnmapTag] = useState(false);
    const unmapTagSubmit = (dt) => {
        setUnmapTag(true);
    }
    const [unmapTagStatus, setUnmapTagStatus] = useState(1);

    const [isRemoveUser, setRemoveUser] = useState(false);
    const removeUserSubmit = (dt) => {
        setRemoveUser(true);
    }
    const [removeUserStatus, setRemoveUserStatus] = useState(1);

    const [borderStyle, setBorderStyle] = useState({
        marginLeft: "50px",
        marginTop: "26px",
        marginBottom: "20px",
        border: "3px solid #1b8f51",
        width: "1360px",
        height: "1530px",
        borderRadius: "30px/80px",
    });
    const [openAddForm, setOpenAddForm] = useState(false);

    useEffect(async () => {
        if (departmentPage <= dpTotalPage) {
            let d = await getDepartment(departmentPage);
            setDepartmentList(departmentList => [...departmentList, d.items]);
            setDpTotalPage(d.totalPage);
            setDepartmentPage(departmentPage + 1);
        }
        if (isAdd) {
            setAddStatus(await createUser(addUserData));
            setIsAdd(false);
        }

        if (isEdit) {
            setEditStatus(await editUser(editUserData));
            setIsEdit(false);
            setOpenAddForm(false);
        }

        if (sendCode) {
            setSendCodeStatus(await sendPin({
                eId: editId,
                token: localStorage.getItem("crfs")
            }));
            setSendCode(false);
        }

        if (isUnmapPin) {
            setUnmapPinStatus(await unmapPin({
                eId: editId,
                token: localStorage.getItem("crfs")
            }));
            setUnmapPin(false);
        }

        if (isUnmapTag) {
            setUnmapTagStatus(await unmapTag({
                eId: editId,
                token: localStorage.getItem("crfs")
            }));
        }

        if (isRemoveUser) {
            setRemoveUserStatus(await removeUser({
                eId: editId,
                token: localStorage.getItem("crfs")
            }));
            let d = await getEmployee(requestData, currentPage);
            setData(d.items);
            setCurrentPage(d.currentPage);
            setTotalRecord(d.total);
            setTotalPage(d.totalPage);
            setRecordInPage(d.count);
        }
        setIsSearch(false);
        let d = await getEmployee(requestData, currentPage);
        setData(d.items);
        setCurrentPage(d.currentPage);
        setTotalRecord(d.total);
        setTotalPage(d.totalPage);
        setRecordInPage(d.count);
        const contentHeight = document.getElementById("userManagementContent").offsetHeight;
        setBorderStyle({
            marginLeft: "50px",
            marginTop: "26px",
            marginBottom: "20px",
            border: "3px solid #1b8f51",
            width: "1360px",
            height: contentHeight + 30 + "px",
            borderRadius: "30px/80px",
        });
    }, [currentPage, type, requestData, departmentPage, isSearch, isAdd, isEdit, openAddForm, sendCode, isUnmapPin, isUnmapTag, isRemoveUser]);

    function handlePaginationRender(pgNum) {
        if (totalPage >= pgNum) {
            return (currentPage <= totalPage - 7 ? currentPage + pgNum - 1 : currentPage - paginationNum + pgNum);
        }
        else return "-";
    }

    function getDepartmentById(id) {
        departmentList.map(items => {
            items.map(item => {
                if (item.dId === id) {
                    return item.dName;
                }
            })
        })
    }

    function addEmployeeForm() {
        return (
            <div>
                <form onSubmit={handleSubmit(addEmployeeSubmit)}>
                    <div>
                        <input style={searchInputStyle} type={"text"} placeholder="T??n nh??n vi??n..." {...register("eName")} />
                        <button type="submit" style={btnStyle}>T??m ki???m</button>
                    </div>
                </form>
            </div>
        )
    }

    // function changeEmployeeDetail(){
    //     return (

    //     )
    // }

    async function downloadUserList() {
        let res = await exportUser();
        // fileDownload(res,"DanhSachNhanVien.xlsx");
        var data = new Blob([res], { type: 'text/csv' });
        var csvURL = window.URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = csvURL;
        link.setAttribute('download', 'DanhSachNhanVien.xlsx');
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
    }

    function showAddStatus() {
        switch (addStatus) {
            case 0:
                return "T???o nh??n vi??n m???i th??nh c??ng!";
            case 1:
                return "";
            case -1:
                return "Thao t??c th???t b???i.";
        }
    }

    function showEditStatus() {
        switch (editStatus) {
            case 0:
                return "Ch???nh s???a th??ng tin th??nh c??ng!";
            case 1:
                return "";
            case -1:
                return "Thao t??c th???t b???i.";
        }
    }

    function showSendPinStatus() {
        switch (sendCodeStatus) {
            case 0:
                return "Th??nh c??ng!";
            case 1:
                return "";
            case -1:
                return "Thao t??c th???t b???i. Kh??ng t??m th???y d??? li???u nh??n vi??n";
        }
    }

    function showUnmapPinStatus() {
        switch (unmapPinStatus) {
            case 0:
                return "Th??nh c??ng!";
            case 1:
                return "";
            case -1:
                return "API b??? l???i. Vui l??ng th??? l???i sau";
        }
    }

    function showUnmapTagStatus() {
        switch (unmapTagStatus) {
            case 0:
                return "Th??nh c??ng!";
            case 1:
                return "";
            case -1:
                return "API b??? l???i. Vui l??ng th??? l???i sau";
        }
    }

    function showRemoveUserStatus() {
        switch (removeUserStatus) {
            case 0:
                return "Th??nh c??ng!";
            case 1:
                return "";
            case -1:
                return "API b??? l???i. Vui l??ng th??? l???i sau";
        }
    }
    return (
        <div style={mainContent}>
            <h2 className="absolute" style={titleStyle}> Danh s??ch ng?????i d??ng hi???n t???i </h2>
            <div style={{ position: "fixed", bottom: "100px", right: "0px" }}>
                <Popup modal nested trigger={<img src={addLogo} width={"50px"} height={"50px"} />}
                    contentStyle={{
                        width: "300px",
                        height: "500px",
                        padding: '0px',
                        border: 'none',
                        display: 'flex',
                        backgroundColor: "#ecf5d3",
                        borderRadius: "20px",
                        borderStyle: "double"
                    }}
                >
                    {close => (
                        <div>
                            <h3 style={{ color: "red", marginBottom: "30px", marginTop: "30px", textAlign: "center" }}>Th??m nh??n vi??n m???i</h3>
                            <form onSubmit={handleSubmit(addEmployeeSubmit)}>
                                <div style={{ display: "inline-block", textAlign: "center" }}>
                                    <input style={formInputStyle} type={"text"} placeholder="T??n nh??n vi??n..." {...register("addEName")} />
                                    <input style={formInputStyle} type={"text"} placeholder="ID nh??n s???..." {...register("addECode")} />
                                    <input style={formInputStyle} type={"text"} placeholder="Email..." {...register("addEmail")} />

                                    <select id="department" name="department" style={addSelectStyle} {...register("addDId")}>
                                        <option value={0} hidden>B??? ph???n l??m vi???c</option>
                                        {departmentList.map((items) => {
                                            return (
                                                items.map(item => {
                                                    return (
                                                        <option value={item.dId}>{item.dName}</option>
                                                    )
                                                })
                                            )
                                        })}
                                    </select>
                                    <input style={formInputStyle} type={"text"} placeholder="M?? th??? t???..." {...register("addETag")} />
                                    <div className="alert" style={{ color: "red" }}>{showAddStatus()}</div>
                                    <div className="inputBtn" style={{ marginTop: "75px" }}>
                                        <button style={formInputBtnStyle} onClick={() => { close() }}>Quay l???i</button>
                                        <button type="submit" style={formInputBtnStyle}>?????ng ??</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}

                </Popup>
            </div>
            <div style={{ position: "fixed", bottom: "40px", right: "2px" }}>
                <Popup trigger={<img src={downloadLogo} width={"48px"} height={"48px"} onClick={async () => await downloadUserList()} />}
                    position={"left top"}
                    on="hover"
                    closeOnDocumentClick
                    mouseEnterDelay={150}
                    // mouseEnterDelay={0}
                    contentStyle={{ padding: '0px', border: 'none', display: 'flex' }}
                    arrow={false}
                >
                    <div style={popupStyle}>??ang build...</div>
                </Popup>

            </div>
            <div style={borderStyle}>
                <div id="userManagementContent" style={contentStyle}>
                    <form onSubmit={handleSubmit(onSearchSubmit)}>
                        <div>
                            <input style={searchInputStyle} type={"text"} placeholder="T??n nh??n vi??n..." {...register("eName")} />
                            <input style={searchInputStyle} type={"text"} placeholder="ID nh??n s???..." {...register("eCode")} />
                            <select id="department" name="department" style={selectStyle} {...register("dId")}>
                                <option value={0} hidden>B??? ph???n l??m vi???c</option>
                                <option value={0} style={{ color: "gray", fontStyle: "italic" }}>B???t k?? </option>
                                {departmentList.map((items) => {
                                    return (
                                        items.map(item => {
                                            return (
                                                <option value={item.dId}>{item.dName}</option>
                                            )
                                        })
                                    )
                                })}
                            </select>
                            <select id="rank" name="rank" style={selectStyle}  {...register("isVip")}>
                                <option value={0} hidden>X???p h???ng</option>
                                <option value="" style={{ color: "gray", fontStyle: "italic" }}>B???t k??</option>
                                <option value={1}>Nh??n vi??n V.I.P</option>
                                <option value={2}>Nh??n vi??n th?????ng</option>
                            </select>
                            <input style={searchInputStyle} type={"text"} placeholder="Email..." {...register("email")} />
                            <input style={searchInputStyle} type={"text"} placeholder="M?? th??? t???..." {...register("eTag")} />
                        </div>
                        <div>
                            <select id="cardStatus" name="cardStatus" style={selectStyle}  {...register("isTag")}>
                                <option value={0} hidden>T??nh tr???ng s??? d???ng th???</option>
                                <option value={0} style={{ color: "gray", fontStyle: "italic" }}>B???t k??</option>
                                <option value={1}>Ch??a c?? th???</option>
                                <option value={2}>???? c?? th???</option>
                            </select>
                            <select id="lockerStatus" name="lockerStatus" style={selectStyle}  {...register("isGroup")}>
                                <option value={0} hidden>T??nh tr???ng ph??n t???</option>
                                <option value={0} style={{ color: "gray", fontStyle: "italic" }}>B???t k??</option>
                                <option value={1}>Ch??a ???????c ph??n t???</option>
                                <option value={2}>???? ???????c ph??n t???</option>
                            </select>
                            <select id="PINStatus" name="PINStatus" style={selectStyle}  {...register("isPin")}>
                                <option value={0} hidden>T??nh tr???ng PINCode</option>
                                <option value={0} style={{ color: "gray", fontStyle: "italic" }}>B???t k??</option>
                                <option value={1}>Ch??a c??</option>
                                <option value={2}>???? c??</option>
                            </select>
                            <button type="submit" style={btnStyle}>T??m ki???m</button>
                        </div>
                    </form>

                    {/* <UserList /> */}
                    <div>
                        <table className="styled-table" style={styledTable}>
                            <thead>
                                <tr>
                                    <th>H??? v?? t??n</th>
                                    <th>ID nh??n s???</th>
                                    <th>B??? ph???n l??m vi???c</th>
                                    <th>Email c?? nh??n</th>
                                    <th>V.I.P</th>
                                    <th>T??nh tr???ng PINCode</th>
                                    <th>Th??? t??? ??ang s??? d???ng</th>
                                    <th>T??nh tr???ng ph??n t???</th>
                                    <th>T??? ??ang s??? d???ng</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((item) => {
                                        return (
                                            <tr>
                                                <td>{item.name}</td>
                                                <td>{item.eCode}</td>
                                                <td>{getDepartmentById(item.dId)}</td>
                                                <td>{item.email}</td>
                                                <td></td>
                                                <td>{item.pCode === 1 ? "???? c??" : "Ch??a c??"}</td>
                                                <td>{item.rCode}</td>
                                                <td style={{ color: item.gStatus === 1 ? "green" : "red" }}>{item.gStatus === 1 ? "???? ???????c ph??n t???" : "Ch??a ???????c ph??n t???"}</td>
                                                <td>{item.occupiedLockerLabel}</td>
                                                <td>
                                                    <Popup modal nested trigger={<i className="fas fa-pen hovicon effect-1 sub-b" style={actionIconStyle}></i>}
                                                        contentStyle={{
                                                            width: "300px",
                                                            height: "500px",
                                                            padding: '0px',
                                                            border: 'none',
                                                            display: 'flex',
                                                            backgroundColor: "#ecf5d3",
                                                            borderRadius: "20px",
                                                            borderStyle: "double"
                                                        }}
                                                        onClick={() => {
                                                            { setOpenAddForm(true) }
                                                        }}
                                                    >
                                                        {close => (
                                                            <div>

                                                                <h3 style={{ color: "red", marginBottom: "30px", marginTop: "30px", textAlign: "center" }}>Thay ?????i th??ng tin nh??n vi??n</h3>
                                                                <form onSubmit={handleSubmit(editEmployeeSubmit)}>
                                                                    <div style={{ display: "inline-block", textAlign: "center" }}>

                                                                        <label className="absolute" style={addLabel1Style}>T??n nh??n vi??n</label>
                                                                        <input style={formInputStyle} type={"text"}  {...register("editEName")} value={item.name} />
                                                                        <label className="absolute" style={addLabel2Style}>ID nh??n s???</label>
                                                                        <input style={formInputStyle} type={"text"} value={item.eCode} {...register("editECode")} />
                                                                        <label className="absolute" style={addLabel3Style}>Email</label>
                                                                        <input style={formInputStyle} type={"text"} value={item.email} {...register("editEmail")} />
                                                                        <label className="absolute" style={addLabel4Style}>B??? ph???n l??m vi???c</label>
                                                                        <select id="department" name="department" style={addSelectStyle} {...register("editDId")}>
                                                                            <option value={item.dId} hidden>API c???n b??? sung data</option>
                                                                            {departmentList.map((items) => {
                                                                                return (
                                                                                    items.map(item => {
                                                                                        return (
                                                                                            <option value={item.dId}>{item.dName}</option>
                                                                                        )
                                                                                    })
                                                                                )
                                                                            })}
                                                                        </select>
                                                                        <label className="absolute" style={addLabel5Style}>M?? th??? t???</label>
                                                                        <input style={formInputStyle} type={"text"} placeholder="M?? th??? t???..." {...register("editETag")} />
                                                                        <div className="alert" style={{ color: "red" }}>{showEditStatus()}</div>
                                                                        <div className="inputBtn" style={{ marginTop: "75px" }}>
                                                                            <button style={formInputBtnStyle} onClick={() => { close(); setOpenAddForm(false); setAddStatus(1); }}>Quay l???i</button>
                                                                            <button type="submit" onClick={() => {
                                                                                setEditId(item.eId);
                                                                                console.log(item.eId);
                                                                            }} style={formInputBtnStyle}>?????ng ??</button>
                                                                        </div>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        )}
                                                    </Popup>
                                                    <Popup modal nested trigger={<i className="fas fa-envelope hovicon effect-1 sub-b" style={actionIconStyle}></i>}
                                                        contentStyle={{
                                                            width: "300px",
                                                            height: "500px",
                                                            padding: '0px',
                                                            border: 'none',
                                                            display: 'flex',
                                                            backgroundColor: "#ecf5d3",
                                                            borderRadius: "20px",
                                                            borderStyle: "double"
                                                        }}
                                                        onClick={() => {
                                                            { setOpenAddForm(true) }
                                                        }}
                                                    >
                                                        {close => (
                                                            <div>
                                                                <h3 style={{ color: "red", marginBottom: "30px", marginTop: "30px", textAlign: "center" }}>G???i PIN Code</h3>
                                                                <form onSubmit={handleSubmit(sendCodeEmployeeSubmit)}>
                                                                    <div style={{ display: "inline-block", textAlign: "center" }}>
                                                                        <div style={{ color: "red" }}>B???n c?? ch???c ch???n mu???n th???c hi???n h??nh ?????ng n??y?</div>
                                                                        <div className="inputBtn" style={{ marginTop: "300px" }}>
                                                                            <div className="alert" style={{ color: "red" }}>{showSendPinStatus()}</div>
                                                                            <button style={formInputBtnStyle} onClick={() => { close() }}>Quay l???i</button>
                                                                            <button type="submit" onClick={() => {
                                                                                setEditId(item.eId);
                                                                                console.log(item.eId);
                                                                            }} style={formInputBtnStyle}>?????ng ??</button>
                                                                        </div>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        )}
                                                    </Popup>
                                                    <Popup modal nested trigger={<i className="far fa-bullseye hovicon effect-1 sub-b" style={actionIconStyle}></i>}
                                                        contentStyle={{
                                                            width: "300px",
                                                            height: "500px",
                                                            padding: '0px',
                                                            border: 'none',
                                                            display: 'flex',
                                                            backgroundColor: "#ecf5d3",
                                                            borderRadius: "20px",
                                                            borderStyle: "double"
                                                        }}
                                                        onClick={() => {
                                                            { setOpenAddForm(true) }
                                                        }}
                                                    >
                                                        {close => (
                                                            <div>
                                                                <h3 style={{ color: "red", marginBottom: "30px", marginTop: "30px", textAlign: "center" }}>T???o PIN Code</h3>
                                                                <form onSubmit={handleSubmit(sendCodeEmployeeSubmit)}>
                                                                    <div style={{ display: "inline-block", textAlign: "center" }}>
                                                                        <div style={{ color: "red" }}>T??nh n??ng n??y ??ang ???????c build v?? b??? l???i API</div>
                                                                        <div className="inputBtn" style={{ marginTop: "300px" }}>
                                                                            <div className="alert" style={{ color: "red" }}>{}</div>
                                                                            <button style={formInputBtnStyle} onClick={() => { close() }}>Quay l???i</button>
                                                                            {/* <button type="submit" onClick={() => {
                                                                                setEditId(item.eId);
                                                                                console.log(item.eId);
                                                                            }} style={formInputBtnStyle}>?????ng ??</button> */}
                                                                        </div>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        )}
                                                    </Popup>
                                                    <Popup modal nested trigger={<i className="far fa-address-book hovicon effect-1 sub-b" style={actionIconStyle}></i>}
                                                        contentStyle={{
                                                            width: "300px",
                                                            height: "500px",
                                                            padding: '0px',
                                                            border: 'none',
                                                            display: 'flex',
                                                            backgroundColor: "#ecf5d3",
                                                            borderRadius: "20px",
                                                            borderStyle: "double"
                                                        }}
                                                    >
                                                        {close => (
                                                            <div>
                                                                <h3 style={{ color: "red", marginBottom: "30px", marginTop: "30px", textAlign: "center" }}>X??a quy???n s??? d???ng PIN Code</h3>
                                                                <form onSubmit={handleSubmit(unmapPinSubmit)}>
                                                                    <div style={{ display: "inline-block", textAlign: "center" }}>
                                                                        <div style={{ color: "red" }}>B???n c?? ch???c ch???n mu???n th???c hi???n h??nh ?????ng n??y?</div>
                                                                        <div className="inputBtn" style={{ marginTop: "300px" }}>
                                                                            <div className="alert" style={{ color: "red" }}>{showUnmapPinStatus()}</div>
                                                                            <button style={formInputBtnStyle} onClick={() => { close() }}>Quay l???i</button>
                                                                            <button type="submit" onClick={() => {
                                                                                setEditId(item.eId);
                                                                                console.log(item.eId);
                                                                            }} style={formInputBtnStyle}>?????ng ??</button>
                                                                        </div>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        )}
                                                    </Popup>
                                                    <Popup modal nested trigger={<i className="fas fa-tags hovicon effect-1 sub-b" style={actionIconStyle}></i>}
                                                        contentStyle={{
                                                            width: "300px",
                                                            height: "500px",
                                                            padding: '0px',
                                                            border: 'none',
                                                            display: 'flex',
                                                            backgroundColor: "#ecf5d3",
                                                            borderRadius: "20px",
                                                            borderStyle: "double"
                                                        }}
                                                    >
                                                        {close => (
                                                            <div>
                                                                <h3 style={{ color: "red", marginBottom: "30px", marginTop: "30px", textAlign: "center" }}>X??a quy???n s??? d???ng PIN Code</h3>
                                                                <form onSubmit={handleSubmit(unmapTagSubmit)}>
                                                                    <div style={{ display: "inline-block", textAlign: "center" }}>
                                                                        <div style={{ color: "red" }}>B???n c?? ch???c ch???n mu???n th???c hi???n h??nh ?????ng n??y?</div>
                                                                        <div className="inputBtn" style={{ marginTop: "300px" }}>
                                                                            <div className="alert" style={{ color: "red" }}>{showUnmapTagStatus()}</div>
                                                                            <button style={formInputBtnStyle} onClick={() => { close() }}>Quay l???i</button>
                                                                            <button type="submit" onClick={() => {
                                                                                setEditId(item.eId);
                                                                                console.log(item.eId);
                                                                            }} style={formInputBtnStyle}>?????ng ??</button>
                                                                        </div>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        )}
                                                    </Popup>
                                                    <Popup modal nested trigger={<i className="fas fa-trash-alt hovicon effect-1 sub-b" style={actionIconStyle}></i>}
                                                        contentStyle={{
                                                            width: "300px",
                                                            height: "500px",
                                                            padding: '0px',
                                                            border: 'none',
                                                            display: 'flex',
                                                            backgroundColor: "#ecf5d3",
                                                            borderRadius: "20px",
                                                            borderStyle: "double"
                                                        }}
                                                    >
                                                        {close => (
                                                            <div>
                                                                <h3 style={{ color: "red", marginBottom: "30px", marginTop: "30px", textAlign: "center" }}>X??a user kh???i h??? th???ng</h3>
                                                                <form onSubmit={handleSubmit(removeUserSubmit)}>
                                                                    <div style={{ display: "inline-block", textAlign: "center" }}>
                                                                        <div style={{ color: "red" }}>B???n c?? ch???c ch???n mu???n x??a user n??y kh???i h??? th???ng?</div>
                                                                        <div className="inputBtn" style={{ marginTop: "300px" }}>
                                                                            <div className="alert" style={{ color: "red" }}>{showRemoveUserStatus()}</div>
                                                                            <button style={formInputBtnStyle} onClick={() => { close() }}>Quay l???i</button>
                                                                            <button type="submit" onClick={() => {
                                                                                setEditId(item.eId);
                                                                                console.log(item.eId);
                                                                            }} style={formInputBtnStyle}>?????ng ??</button>
                                                                        </div>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        )}
                                                    </Popup>
                                                    
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
                            <div style={{ fontSize: "10px" }}><i>B???n ghi t??? {currentPage * 20 - 19} ?????n {currentPage * 20 - 20 + recordInPage} / t???ng s??? {totalRecord} b???n ghi</i></div>
                        </div>
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
    // marginBottom: "10px"
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

const formInputStyle = {
    width: "250px",
    padding: "12px 20px",
    marginTop: "10px",
    marginBottom: "5px",
    display: "inline-block",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxSizing: "border-box",
    backgroundColor: "#4d6e68"
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

const formInputBtnStyle = {
    width: "120px",
    padding: "10px 15px",
    margin: "5px",
    display: "inline-block",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxSizing: "border-box",
    backgroundColor: "#bda13e",
}

const actionIconStyle = {
    // backgroundColor: "lightgray",
    display: "inline",
    marginLeft: "20px",
    fontSize: "30px",
}

const pageNumberStyle = {
    display: "inline",
    width: "20px",
    marginLeft: "5px",
    marginRight: "5px"
}

const styledTable = {
    marginLeft: "5px",
    marginRight: "5px",
    marginTop: "30px",
}

const paginationStyle = {
    marginLeft: "400px",
    marginTop: "15px",
    paddingBottom: "5px",
    marginRight: "400px"
}

const popupStyle = {
    display: "block",
    flexDirection: "column",
    backgroundColor: "#92eb34",
    cursor: "pointer",
    padding: "5px",
    height: "28px",
    borderBottom: "1px",
    solid: "rgb(187, 187, 187)"
}

const addSelectStyle = {
    width: "250px",
    padding: "12px 20px",
    marginTop: "10px",
    marginBottom: "5px",
    display: "inline-block",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxSizing: "border-box",
    backgroundColor: "#f7e283",
}

const addLabel1Style = {
    zIndex: "1",
    fontFamily: "Courier New",
    color: "red",
    position: "absolute",
    left: "30px",
    top: "80px",
    backgroundColor: "transparent",
    fontSize: "13px",
}

const addLabel2Style = {
    zIndex: "1",
    fontFamily: "Courier New",
    color: "red",
    position: "absolute",
    left: "30px",
    top: "136px",
    backgroundColor: "transparent",
    fontSize: "13px",
}
const addLabel3Style = {
    zIndex: "1",
    fontFamily: "Courier New",
    color: "red",
    position: "absolute",
    left: "30px",
    top: "192px",
    backgroundColor: "transparent",
    fontSize: "13px",
}
const addLabel4Style = {
    zIndex: "1",
    fontFamily: "Courier New",
    color: "red",
    position: "absolute",
    left: "30px",
    top: "248px",
    backgroundColor: "transparent",
    fontSize: "13px",
}
const addLabel5Style = {
    zIndex: "1",
    fontFamily: "Courier New",
    color: "red",
    position: "absolute",
    left: "30px",
    top: "304px",
    backgroundColor: "transparent",
    fontSize: "13px",
}


export default UserManagementContent;