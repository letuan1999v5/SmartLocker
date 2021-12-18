import { login, isWorking } from '../service/API/AuthenticationAPI';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { isLogin, isLogout, emptyInput, isIncorrect, isDisconnected } from '../redux2/reducer/LoginReducer';
import loading from "../img/loading.svg";

function Login() {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState("hide");
    const [errMessage, setErrMessage] = useState("");
    let loginErr = useSelector((state) => state.login.err);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();
    async function onSubmit(data) {
        setIsLoading("");
        if (data.username == "" || data.password == "") {
            setIsLoading("hide");
            setErrMessage("Tên đăng nhập/mật khẩu không được để trống");
        }
        else {
            let lg = await login(data);
            if (lg === 0) {
                dispatch(isLogin());
            }
            else {
                if (lg === 1) {
                    setIsLoading("hide");
                    setErrMessage("Tài khoản và mật khẩu không chính xác");
                }
                else {
                    setIsLoading("hide");
                    setErrMessage("Không thể kết nối tới máy chủ");
                }
            }
        }
    };
    useEffect(async () => {
        try {
            let work = await isWorking();
            if (work) {
                dispatch(isLogin());
            }
        } catch (error) {
        }

    }, []);
    
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-2"></div>
                    <div className="col-lg-6 col-md-8 login-box">
                        <div className="col-lg-12 login-key">
                            <i className="fa fa-key" aria-hidden="true"></i>
                        </div>
                        <div className="col-lg-12 login-title">
                            ĐĂNG NHẬP
                        </div>

                        <div className="col-lg-12 login-form">
                            <div className="col-lg-12 login-form">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="form-group">
                                        <label className="form-control-label"></label>
                                        <input type={"text"} placeholder="Username..."  {...register("username")} />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-control-label"></label>
                                        <input type={"password"} placeholder="Password..." {...register("password")} />
                                    </div>
                                    <div className={isLoading} style={{ textAlign: "center" }}>
                                        <img src={loading} alt="loading..." />
                                    </div>

                                    <div className="col-lg-12 loginbttm">
                                        <div className="col-lg-6 login-btm login-text" style={{ color: "red", textAlign: "center" }}>
                                            {errMessage}
                                        </div>
                                        <div className="col-lg-6 login-btm login-button">
                                            <button type="submit" className="btn btn-outline-primary">LOGIN</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-2"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login