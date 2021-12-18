import axios from "axios";
import { API } from "../APIList"
export async function getBuilding(data, page) {
    let url = API.building.getBuilding.uri;
    url += "?token=" + localStorage.getItem("crfs");
    url += "&page=" + page;
    url += "&name=" + data.name;
    url += "&addr" + data.addr;
    url += "&bId" + data.bId;
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
