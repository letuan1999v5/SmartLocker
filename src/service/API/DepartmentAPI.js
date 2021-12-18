import axios from "axios";
import { API } from "../APIList"
export async function getDepartment(page) {
    let url = API.department.getDepartment.uri;
    url += "?token=" + localStorage.getItem("crfs");
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
        if (res.status === 200){
            return res.data;
        }
        
    } catch (error) {
        return -1;
    }
}

export async function searchDepartment(name, page) {
    let url = API.department.getDepartment.uri;
    url += "?token=" + localStorage.getItem("crfs");
    url += "&page=" + page;
    url += "&name=" + name;
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