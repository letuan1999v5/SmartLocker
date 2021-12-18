import React, { useState } from "react";
import LockerStatisticGraph24hour from "./graph/LockerStatisticGraph24hour";
import LockerUsingStatusGraph from "./graph/LockerUsingStatusGraph";
import LockerStatusGraph from "./graph/LockerStatusGraph";
import LockerStatisticGraph6month from "./graph/LockerStatisticGraph6month";
import { useSelector, useDispatch } from 'react-redux';
import { getMainpageData } from "../../../service/API/MainpageAPI";

function Content() {
    const menu = useSelector(state => state.currentEnteredButton);
    const space = "  ";
    
    return (
        <div style={{ display: "block", marginTop: "50px", marginLeft: "50px"}}>
            <div className="absolute">
                <div className="locker-statistic-line-chart-24h" style={lockerStatisticStyle24h}>
                    <LockerStatisticGraph24hour />
                </div>
                <div style={{ display: "flex" }}>
                    <div className="locker-using-status-doughnut-chart" style={lockerUsingStyle}>
                        <LockerUsingStatusGraph />
                    </div>
                    <div className="locker-status-doughnut-chart" style={lockerStatusStyle}>
                        <LockerStatusGraph />
                    </div>
                    <div className="locker-statistic-line-chart-6-month" style={lockerStatisticStyle6month}>
                        <LockerStatisticGraph6month />
                    </div>
                </div>
            </div>
        </div>
    );
}

const lockerStatisticStyle24h = {
    marginTop: "80px",
    marginLeft: "80px",
    width: "1380px",
    height: "250px",
    display: "flex",
    marginTop: "20px",
    marginLeft: "50px",
    textAllign: "center"
}

const lockerUsingStyle = {
    width: "250px",
    height: "250px",
    display: "flex",
    marginTop: "130px",
    marginLeft: "50px"
}

const lockerStatusStyle = {
    width: "250px",
    height: "250px",
    display: "flex",
    marginTop: "130px",
    marginLeft: "200px"
}

const lockerStatisticStyle6month = {
    width: "530px",
    display: "flex",
    marginTop: "130px",
    marginLeft: "150px",
}

const option = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Thống kê cảnh báo trong 6 tháng gần nhất',
        },
    },
}


export default Content