import axios from "axios";
import { API } from "../APIList";
import Interceptor from '../Interceptor';

// export async function getEmployee(page) {
//     let signal;
//     let url = API.user.getUser.uri;
//     url += '?uName=';
//     url += '&token=' + localStorage.getItem('crfs');
//     url += '&eName=';
//     url += '&eCode=';
//     url += '&eTag=';
//     url += '&sTag=';
//     url += '&rId=';
//     url += '&page=' + page;
//     try {
//         let res = await axios.get(url, {
//             access: localStorage.getItem("access"),
//             username: localStorage.getItem('username'),
//             name: localStorage.getItem('name'),
//             signal: signal,
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': 'Bearer ' + localStorage.getItem('token')
//             },
//         });
//         if (res.status === 200) {
//             return res.data;
//         }

//     } catch (error) {
//         return -1
//     }

// }

export async function getEmployee(data, page) {
    let url = API.user.getUser.uri;
    url += "?dId=" + data.dId
    // url += '&uName=' + data.uName;
    url += '&token=' + localStorage.getItem('crfs');
    url += '&name=' + data.eName;
    url += '&eCode=' + data.eCode;
    url += "&email" + data.email;
    url += '&tag=' + data.eTag;
    url += "&isGroup=" + data.isGroup;
    url += '&isTag=' + data.isTag;
    url += '&isPin=' + data.isPin;
    url += "&eVip=" + data.isVip;
    url += '&page=' + page;
    try {
        let res = await axios.get(url, {
            access: localStorage.getItem("access"),
            username: localStorage.getItem('username'),
            name: localStorage.getItem('name'),
            // signal: signal,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        });
        if (res.status === 200) {
            return res.data;
        }

    } catch (error) {
        return -1;
    }

}

export async function searchEmployee(data, page) {
    let url = API.user.getUser.uri;
    url += "?dId=" + data.dId
    // url += '&uName=' + data.uName;
    url += '&token=' + localStorage.getItem('crfs');
    url += '&name=' + data.eName;
    url += '&eCode=' + data.eCode;
    url += "&email" + data.email;
    url += '&tag=' + data.eTag;
    url += "&isGroup=" + data.isGroup;
    url += '&isTag=' + data.isTag;
    url += '&isPin=' + data.isPin;
    url += "&eVip=" + data.isVip;
    url += '&page=' + page;
    try {
        let res = await axios.get(url, {
            access: localStorage.getItem("access"),
            username: localStorage.getItem('username'),
            name: localStorage.getItem('name'),
            // signal: signal,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        });
        if (res.status === 200) {
            return res.data;
        }

    } catch (error) {
        return -1;
    }
}

export async function exportUser() {
    let url = API.user.exportUser.uri;
    url += "?token=" + localStorage.getItem("crfs");
    url += "&dId=0"
    url += "&name=";
    url += "&eCode=";
    url += "&email=";
    url += "&tag=";
    url += "&isTag=0";
    url += "&isPin=0";
    url += "&isGroup=0";
    url += "&page=1";

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
    } catch (error) {
        return -1;
    }
}

export async function createUser(data) {
    let url = API.user.createUser.uri;
    try {
        let res = await axios.post(url, data, {
            access: localStorage.getItem("access"),
            username: localStorage.getItem('username'),
            name: localStorage.getItem('name'),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            mode: 'cors',
            cache: 'no-cache',
        });
        if (res.status === 200) {
            return 0
        }
    } catch (error) {
        return -1;
    }
}

export async function editUser(data) {
    let url = API.user.editUser.uri;
    try {
        let res = await axios.put(url, data, {
            access: localStorage.getItem("access"),
            username: localStorage.getItem('username'),
            name: localStorage.getItem('name'),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            mode: 'cors',
            cache: 'no-cache',
        });
        if (res.status === 200) {
            return 0
        }
    } catch (error) {
        return -1;
    }
}

export async function sendPin(data) {
    let url = API.user.sendPin.uri;
    try {
        let res = await axios.post(url, data, {
            access: localStorage.getItem("access"),
            username: localStorage.getItem('username'),
            name: localStorage.getItem('name'),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            mode: 'cors',
            cache: 'no-cache',
        });
        if (res.status === 200) {
            return 0
        }
    } catch (error) {
        return -1;
    }
}

export async function unmapPin(data) {
    let url = API.user.unmapPin.uri;
    try {
        let res = await axios.delete(url, {
            access: localStorage.getItem("access"),
            username: localStorage.getItem('username'),
            name: localStorage.getItem('name'),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            referrerPolicy: 'no-referrer',
            data: JSON.stringify(data)
        });
        if (res.status === 200) {
            return 0
        }
    } catch (error) {
        return -1;
    }
}

export async function unmapTag(data) {
    let url = API.user.unmapTag.uri;
    try {
        let res = await axios.delete(url, {
            access: localStorage.getItem("access"),
            username: localStorage.getItem('username'),
            name: localStorage.getItem('name'),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            referrerPolicy: 'no-referrer',
            data: JSON.stringify(data)
        });
        if (res.status === 200) {
            return 0
        }
    } catch (error) {
        return -1;
    }
}

export async function removeUser(data) {
    console.log("xxxx", data);
    let url = API.user.removeUser.uri;
    try {
        let res = await axios.delete(url, {
            access: localStorage.getItem("access"),
            username: localStorage.getItem('username'),
            name: localStorage.getItem('name'),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            referrerPolicy: 'no-referrer',
            data: JSON.stringify(data)
        });
        if (res.status === 200) {
            return 0
        }
    } catch (error) {
        return -1;
    }
}