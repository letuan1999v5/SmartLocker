import axios from "axios";
import { API } from "../APIList"
export async function getManager(data, page) {
    let url = API.manager.getManager.uri;
    url += "?token=" + localStorage.getItem("crfs");
    url += "&page=" + page;
    url += "&eName=" + data.eName;
    url += "&eCode" + data.eCode;
    url += "&sTag=" + data.sTag;
    url += "&eTag=" + data.eTag;
    url += "&rId=" + data.rId;
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
