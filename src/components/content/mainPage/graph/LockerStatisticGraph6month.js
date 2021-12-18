import React from 'react';
import { useState, useEffect } from 'react';
import { getMainpageData } from '../../../../service/API/MainpageAPI';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const lockerStatisticOption = {
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

function LockerStatisticGraph6month() {
    const [data, setData] = useState({
        labels: ['', '', '', '', '', ''],
        datasets: [
            {
                label: "",
                data: [5, 10, 15, 10, 5, 10],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: "",
                data: [10, 5, 10, 5, 10, 5],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ]
    });
    async function getData() {
        let d = await getMainpageData();
        let dt = ({
            labels: d.items3.label,
            datasets: [
                {
                    label: d.items3.datas[0].label,
                    data: d.items3.datas[0].data,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
                {
                    label: d.items3.datas[1].label,
                    data: d.items3.datas[1].data,
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                },
            ]
        })
        return dt;
    }
    useEffect(async () => {
        setData(await getData());
    }, [])


    return (
        <div>
            <Line data={data} options={lockerStatisticOption} height={"250%"} width={"500%"}/> 
        </div>
    )
}

export default LockerStatisticGraph6month;

