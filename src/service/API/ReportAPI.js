import axios from "axios";
import { API } from "../APIList"
export async function getLockerStatus(data, page) {
    let url = API.report.statusReport.uri;
    url += "?token=" + localStorage.getItem("crfs");
    url += "&page=" + page;
    url += "&imei=" + data.imei;
    url += "&bId=" + data.bId;
    url += "&lId=" + data.lId;
    url += "&lLabel=" + data.lLabel;
    url += "&lStatus=" + data.lStatus;
    try {
        let res = await axios.get(url, {
            access: localStorage.getItem("access"),
            username: localStorage.getItem('username'),
            name: localStorage.getItem('name'),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        });
        if (res.status === 200){
            return res.data;
        }
    } catch (error) {
        return -1;
    }
}

export async function getLockerHistory(data, page) {
    let url = API.report.historyReport.uri;
    url += "?token=" + localStorage.getItem("crfs");
    url += "&page=" + page;
    url += "&imei=" + data.imei;
    url += "&bId=" + data.bId;
    url += "&lId=" + data.lId;
    url += "&lLabel=" + data.lLabel;
    url += "&eName=" + data.eName;
    url += "&eCode=" + data.eCode;
    url += "&sDate=" + data.sDate;
    url += "&eDate=" +data.eDate;

    try {
        let res = await axios.get(url, {
            access: localStorage.getItem("access"),
            username: localStorage.getItem('username'),
            name: localStorage.getItem('name'),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        });
        if (res.status === 200){
            return res.data;
        }
    } catch (error) {
        return -1;
    }
}

