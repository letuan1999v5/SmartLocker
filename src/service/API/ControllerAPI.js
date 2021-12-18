import axios from "axios";
import { API } from "../APIList"
export async function getController(data, page) {
    let url = API.controller.getController.uri;
    url += "?token=" + localStorage.getItem("crfs");
    url += "&page=" + page;
    url += "&lId=" + data.lId;
    url += "&bId=" + data.bId;
    url += "&imei=" + data.imei;
    url += "&mac=" + data.mac;
    url += "&zone=" + data.zone;
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