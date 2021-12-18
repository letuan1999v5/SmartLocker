import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import React, { useState, useEffect } from "react";
import { getMainpageData } from '../../../../service/API/MainpageAPI';

ChartJS.register(ArcElement, Tooltip, Legend);

const lockerUsingOption = {
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom',
        },
        title: {
            display: true,
            text: 'Thống kê tình trạng sử dụng tủ',
        },
    },
}

function LockerUsingStatusGraph () {
    const [label1, setLabel1] = useState ("Trống");
    const [label2, setLabel2] = useState ("Đang sử dụng");
    const [label3, setLabel3] = useState ("Vô hiệu hóa");
    const [data, setData] = useState({
        labels: [label1, label2, label3],
        datasets: [
            {
                label: '# of Votes',
                data: [0, 0, 0],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    });
    async function getData() {
        let d = await getMainpageData();
        let dt = ({
            labels: [label1, label2, label3],
            datasets: [
                {
                    label: '# of Votes',
                    data: d.items1,
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 1,
                },
            ],
        });
        return dt;
    }
    useEffect(async () => {
        setData(await getData());
    }, []);
    return (
        <Doughnut data={data} options={lockerUsingOption} />
    )
}

export default LockerUsingStatusGraph;