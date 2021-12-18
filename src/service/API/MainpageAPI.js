import axios from "axios";
import { API } from "../APIList";

export async function getMainpageData(){
    let url = API.mainpage.uri + "?token=" + localStorage.getItem('crfs');
    let res = await axios.get(url,{
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
    else {
        return "Error" + res.status;
    }
}