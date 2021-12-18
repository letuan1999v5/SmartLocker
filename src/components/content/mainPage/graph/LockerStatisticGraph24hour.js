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

const statisticLabels = ['1AM', '2AM', '3AM', '4AM', '5AM', '6AM', '7AM', '8AM', '9AM', '10AM', '11AM', '12AM',
    '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM', '10PM', '11PM', '12PM'];

const lockerStatisticOption = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Thống kê tình trạng sử dụng tủ trong vòng 24h',
        },
    },
}

function LockerStatisticGraph (){
    const [data, setData] = useState({
        labels: ['', '', '', '', '', '','', '', '', '', '', '','', '', '', '', '', '','', '', '', '', '', ''],
        datasets: [
            {
                label: 'Truy cập trái phép',
                data: [10, 10, 10, 10, 15, 10, 1, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 15, 10, 1, 10, 10, 10, 10],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Trả tủ',
                data: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'Mở tủ',
                data: [5, 18, 10, 12, 14, 11, 15, 10, 12, 12, 10, 10, 10, 10, 10, 10, 10, 15, 10, 1, 10, 10, 10, 10],
                borderColor: 'rgb(100, 15, 142)',
                backgroundColor: 'rgba(100, 15, 142, 0.5)',
            },
            {
                label: 'Đăng ký tủ',
                data: [10, 10, 10, 10, 12, 10, 1, 10, 15, 10, 10, 14, 10, 10, 10, 10, 10, 15, 10, 1, 10, 10, 10, 10],
                borderColor: 'rgb(12, 56, 99)',
                backgroundColor: 'rgba(12, 56, 99, 0.5)',
            },
        ],
    });
    async function getData() {
        let d = await getMainpageData();
        let dt = ({
            labels: d.items4.label,
            datasets: [
                {
                    label: d.items4.datas[0].label,
                    data: d.items4.datas[0].data,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
                {
                    label: d.items4.datas[1].label,
                    data: d.items4.datas[1].data,
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                },
                {
                    label: d.items4.datas[2].label,
                    data: d.items4.datas[2].data,
                    borderColor: 'rgb(100, 15, 142)',
                    backgroundColor: 'rgba(100, 15, 142, 0.5)',
                },
                {
                    label: d.items4.datas[3].label,
                    data: d.items4.datas[3].data,
                    borderColor: 'rgb(12, 56, 99)',
                    backgroundColor: 'rgba(12, 56, 99, 0.5)',
                },
            ],
        })
        return dt;
    }
    useEffect(async () => {
        setData(await getData());
    }, []);
    return (
        <Line data={data} options={lockerStatisticOption} height={"70%"} />
    )
}

export default LockerStatisticGraph;