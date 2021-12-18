import axios from "axios";
import { API } from "../APIList"
export async function getLocker(page) {
    let url = API.locker.getLocker.uri;
    url += "?token=" + localStorage.getItem("crfs");
    url += '?bId=' + 0;
    url += '&lvId=' + 0;
    url += '&imei=';
    url += '&label=';
    url += '&gLocker=' + 0;
    url += '&gStatus=' + 0;
    url += "&page=" + page;
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
        if (res.status === 200) {
            return res.data;
        }
        else {
            return ("err");
        }
    } catch (error) {
        return -1;
    }
}

export async function getUsage(page){
    let url = API.locker.getUsage.uri;
    url += "?token=" + localStorage.getItem("crfs");
    url += '&imei=';
    url += '&eCode=';
    url += '&label=';
    url += '&lvId=';
    url += 'bId=' ;
    url += "&page=" + page;
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
        if (res.status === 200) {
            return res.data;
        }
        else {
            return ("err");
        }
    } catch (error) {
        return -1;
    }
}