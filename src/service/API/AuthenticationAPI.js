import axios from 'axios';
import { API } from '../APIList';
import { useSelector, useDispatch } from 'react-redux';
import { isLogin, isLogout } from '../../redux2/reducer/LoginReducer';
import Interceptor from '../Interceptor';
import { ResponseCode } from '../RespondCode';
var md5 = require('md5');

// hash password. Need to refactor (Hash at BE, not FE)
// let date = new Date();
// let month = date.getUTCMonth() + 1;
// let day = date.getUTCDate();
// let year = date.getUTCFullYear();
// let hour = date.getUTCHours();
// let min = date.getUTCMinutes();
// if (month < 10) {
//     month = '0' + month;
// }

// if (day < 10) {
//     day = '0' + day;
// }

// if (hour < 10) {
//     hour = '0' + hour;
// }

// if (min < 10) {
//     min = '0' + min;
// }

// let time = day + '/' + month + '/' + year + ' ' + hour + ':' + min;


function generateCrfs(username) {
    let intervalId = 0;
    let dt = new Date();
    let min = dt.getUTCMinutes();
    let hrs = dt.getUTCHours();
    if (min < 10) {
        min = '0' + min;
    }

    if (hrs < 10) {
        hrs = '0' + hrs;
    }
    let time = hrs + ':' + min;
    localStorage.setItem('crfs', md5(username + time));
    intervalId = setInterval(() => {
        if (localStorage.getItem('username') !== null) {
            let username = localStorage.getItem('username');
            let dtz = new Date();
            let minz = dtz.getUTCMinutes();
            let hrsz = dtz.getUTCHours();
            if (minz < 10) {
                minz = '0' + minz;
            }

            if (hrsz < 10) {
                hrsz = '0' + hrsz;
            }

            let timez = hrsz + ':' + minz;
            localStorage.setItem('crfs', md5(username + timez));
        }
        else {
            clearInterval(intervalId);
        }
    }, 60000);
}


export async function login(data) {
    let date = new Date();
    let month = date.getUTCMonth() + 1;
    let day = date.getUTCDate();
    let year = date.getUTCFullYear();
    let hour = date.getUTCHours();
    let min = date.getUTCMinutes();
    if (month < 10) {
        month = '0' + month;
    }

    if (day < 10) {
        day = '0' + day;
    }

    if (hour < 10) {
        hour = '0' + hour;
    }

    if (min < 10) {
        min = '0' + min;
    }

    let time = day + '/' + month + '/' + year + ' ' + hour + ':' + min;
    let res = await Interceptor.post(API.login.uri, {
        username: data.username,
        password: md5(md5(data.password) + time)
    });
    if (res.status === 200) {
        if (typeof (Storage) !== undefined) {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("username", res.data.username);
            localStorage.setItem("access", res.data.access);
            localStorage.setItem("name", res.data.name);
            localStorage.setItem("isLogin", true);
            generateCrfs(res.data.username);
        }
        return 0;
    }
    else {
        if (res.status === 400) return 1;
        else return -1
    }
}

export async function logout() {
    localStorage.clear();
    window.location.reload();
}

export async function isWorking() {
    generateCrfs(localStorage.getItem('username'));
    let url = API.ping.uri + "?token=" + localStorage.getItem('crfs');
    let res = await axios.get(url, {
        username: localStorage.getItem('username'),
        name: localStorage.getItem('name'),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        referrerPolicy: 'no-referrer',
    });
    if (res.data.code == ResponseCode.IS_WORKING) {
        return true;
    }
    else {
        return false;
    }
}