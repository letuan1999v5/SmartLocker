
const server = "https://localhost:5001/"

export const API = {
    //login:
    login: {
        uri: server + "api/v2/login",
    },
    //check if token is not out out date
    ping: {
        uri: server + "api/v1/ping",
        method: "GET"
    },
    mainpage: {
        uri: server + "api/v1/report/locker_statistical",
    },
    user: {
        createUser: {
            uri: server + 'api/v1/employee/create_employee/',
            method: 'POST'
        },
        // Lấy danh sách nhân viên
        // Page: Quản lý người sử dụng
        getUser: {
            uri: server + 'api/v1/employee/get_employee/',
            method: 'GET',
        },
        exportUser: {
            uri: server + 'api/v1/report/export_user/',
            method: 'GET',
        },
        exportMapLocker: {
            uri: server + 'api/v1/report/export_map_locker/',
            method: 'GET',
        },
        // Lấy danh sách nhân viên kèm theo số lượng tủ được phân
        getUsage: {
            uri: server + 'api/v1/employee/get_usage/',
            method: 'GET',
        },
        editUser: {
            uri: server + 'api/v1/employee/modify_employee/',
            method: 'PUT',
        },
        removeUser: {
            uri: server + 'api/v1/employee/remove_employee/',
            method: 'DELETE',
        },
        unmapPin: {
            uri: server + 'api/v1/employee/unmap_pin/',
            method: 'DELETE',
        },
        mapPin: {
            uri: server + 'api/v1/employee/map_pin/',
            method: 'PATCH',
        },
        unmapTag: {
            uri: server + 'api/v1/employee/unmap_tag/',
            method: 'DELETE',
        },
        mapTag: {
            uri: server + 'api/v1/employee/map_tag/',
            method: 'PATCH',
        },
        sendPin: {
            uri: server + 'api/v1/employee/send_pin/',
            method: 'POST',
        },
        unmapLocker: {
            uri: server + 'api/v1/employee/unmap_locker',
            method: 'DELETE',
        },
        mapNewLocker: {
            uri: server + 'api/v3/employee/map_new_locker',
            method: 'PATCH',
        },
        mapExistedLocker: {
            uri: server + 'api/v3/employee/map_existed_locker',
            method: 'PATCH',
        }
    },
    controller: {
        createController: {
            uri: server + 'api/v1/controller/create_controller/',
            method: 'POST'
        },
        // Lấy danh sách thiết bị điều khiển
        // Page: thêm tủ cho nhân viên
        getController: {
            uri: server + 'api/v1/controller/get_controller/',
            method: 'GET'
        },
        exportController: {
            uri: server + 'api/v1/report/export_controller/',
            method: 'GET'
        },
        editController: {
            uri: server + 'api/v1/controller/modify_controller/',
            method: 'PUT',
        },
        removeController: {
            uri: server + 'api/v1/controller/remove_controller/',
            method: 'DELETE',
        },
        swapController: {
            uri: server + 'api/v1/controller/swap_controller/',
            method: 'PUT',
        }
    },
    department: {
        createDepartment: {
            uri: server + 'api/v1/department/create_department/',
            method: 'POST'
        },
        // Lấy danh sách phòng ban
        // Page: Quản lý người sử dụng
        // Page: Thêm tủ cho nhân viên
        getDepartment: {
            uri: server + 'api/v1/department/get_department/',
            method: 'GET'
        },
        editDepartment: {
            uri: server + 'api/v1/department/modify_department/',
            method: 'PUT',
        },
        removeDepartment: {
            uri: server + 'api/v1/department/remove_department/',
            method: 'DELETE',
        },
    },
    building: {
        createBuilding: {
            uri: server + 'api/v1/building/create_building/',
            method: 'POST'
        },
        // Lấy danh sách tòa nhà
        // Page: Thêm tủ cho nhân viên
        getBuilding: {
            uri: server + 'api/v1/building/get_building/',
            method: 'GET'
        },
        editBuilding: {
            uri: server + 'api/v1/building/modify_building/',
            method: 'PUT'
        }
    },
    level: {
        createLevel: {
            uri: server + 'api/v1/level/create_level/',
            method: 'POST'
        },
        // Lấy danh sách các tầng
        // Page: Thêm tủ cho nhân viên
        getLevel: {
            uri: server + 'api/v1/level/get_level/',
            method: 'GET'
        },
        editLevel: {
            uri: server + 'api/v1/level/modify_level/',
            method: 'PUT',
        },
        removeLevel: {
            uri: server + 'api/v1/level/remove_level/',
            method: 'DELETE',
        },
    },
    report: {
        statusReport: {
            uri: server + 'api/v1/report/locker_status/',
            method: 'GET'
        },
        exportStatusReport: {
            uri: server + 'api/v1/report/export_locker_status/',
            method: 'GET'
        },
        // Page: Trang chủ
        exportStatisticalReport: {
            uri: server + 'api/v1/report/export_locker_statistical/',
            method: 'GET'
        },
        eventReport: {
            uri: server + 'api/v2/report/locker_new_event/',
            method: 'GET'
        },
        historyReport: {
            uri: server + 'api/v1/report/locker_event/',
            method: 'GET'
        },
        exportHistoryReport: {
            uri: server + 'api/v1/report/export_locker_history/',
            method: 'GET'
        },
    },
    manager: {
        createManager: {
            uri: server + 'api/v1/manager/create_manager/',
            method: 'POST',
        },
        getManager: {
            uri: server + 'api/v1/manager/get_manager/',
            method: 'GET',
        },
        editManager: {
            uri: server + 'api/v1/manager/modify_manager/',
            method: 'PUT',
        },
        removeManager: {
            uri: server + 'api/v1/manager/remove_manager',
            method: 'DELETE',
        },
        changePwdManager: {
            uri: server + 'api/v2/manager/change_password/',
            method: 'PUT',
        },
        unmapTag: {
            uri: server + 'api/v1/manager/unmap_tag/',
            method: 'DELETE',
        },
        mapTag: {
            uri: server + 'api/v1/manager/map_tag/',
            method: 'PATCH',
        },
        unmapRole: {
            uri: server + 'api/v1/manager/unmap_role_manager/',
            method: 'DELETE',
        }
    },
    role: {
        createRole: {
            uri: server + 'api/v1/manager/create_role/',
            method: 'POST',
        },
        getRole: {
            uri: server + 'api/v1/manager/get_role/',
            method: 'GET',
        },
        getPermission: {
            uri: server + 'api/v1/manager/get_permission/',
            method: 'GET',
        },
        editRole: {
            uri: server + 'api/v1/manager/create_manager/',
            method: 'POST',
        },
        removeRole: {
            uri: server + 'api/v1/manager/remove_role/',
            method: 'DELETE',
        },
        mapRolePermission: {
            uri: server + 'api/v1/manager/map_role_permission/',
            method: 'PATCH',
        }
    },
    locker: {
        // Lấy danh sách các tủ
        // Page: Thêm tủ cho nhân viên
        getLocker: {
            uri: server + 'api/v1/locker/get_locker/',
            method: 'GET'
        },
        // Lấy danh sách các tủ được phân cho nhân viên đang chọn
        getUsage: {
            uri: server + 'api/v1/locker/get_usage/',
            method: 'GET',
        },
        // Lấy danh sách các tủ kèm trạng thái hiện tại, người dùng
        // Page: Quản lý tủ
        getManage: {
            uri: server + 'api/v1/locker/get_manage_locker/',
            method: 'GET',
        },
        // Lấy danh sách các tủ bị hạn chế???
        getRestrict: {
            // uri: server + 'api/v1/locker/get_restrict_locker/',
            uri: server + 'api/v2/locker/get_restrict_locker/',
            method: 'GET',
        },
        // gửi yêu cầu mở tủ: lưu vào bảng command để controller device request
        openLocker: {
            uri: server + 'api/v1/locker/open_locker/',
            method: 'POST'
        },
        freeLocker: {
            uri: server + 'api/v1/locker/free_locker/',
            method: 'POST'
        },
        freeAllLocker: {
            uri: server + 'api/v1/locker/free_all_locker/',
            method: 'POST'
        },
        disableLocker: {
            uri: server + 'api/v1/locker/disable_locker/',
            method: 'POST'
        },
        enableLocker: {
            uri: server + 'api/v1/locker/enable_locker/',
            method: 'POST'
        },
        reportLocker: {
            uri: server + 'api/v1/locker/error_locker/',
            method: 'POST'
        },
        confirmLocker: {
            uri: server + 'api/v2/locker/confirm_open_locker/',
            method: 'POST'
        },
        mapEmployee2Locker: {
            uri: server + 'api/v2/locker/map_user_2_locker/',
            method: 'PATCH'
        },
        createLayout: {
            uri: server + 'api/v1/locker/create_layout/',
            method: 'POST'
        },
        removeLocker: {
            uri: server + 'api/v1/locker/remove_locker/',
            method: 'DELETE'
        },
        workingLocker:{
            uri: server + 'api/v1/locker/working_locker/',
            method: 'POST'
        }
    },
    warning: {
        getWarning: {
            uri: server + 'api/v1/warning/get_warning/',
            method: 'GET'
        },

        // trang chủ
        getNewWarning: {
            uri: server + 'api/v2/warning/new_warning/',
            method: 'GET'
        }
    },
    tag: {
        createTag: {
            uri: server + 'api/v1/tag/create_tag/',
            method: 'POST'
        },
        createAdminTag: {
            uri: server + 'api/v1/tag/create_admin_tag/',
            method: 'POST'
        },
        getTag: {
            uri: server + 'api/v1/tag/get_tag/',
            method: 'GET',
        },

        getFreeTag: {
            uri: server + 'api/v1/tag/get_free_tag/',
            method: 'GET',
        },

        getFreeAdminTag: {
            uri: server + 'api/v1/tag/get_free_adm_tag/',
            method: 'GET',
        },
    }
}

