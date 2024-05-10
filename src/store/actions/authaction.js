
import { LOG_IN } from "store/constant"
import { LOG_OUT } from "store/constant"

export const loggedInAction = (loginData) => {
    console.log(loginData)
    return {
        type: LOG_IN,
        payload: loginData
    }
}

export const loggedOutAction = () => {

    localStorage.removeItem('userData')
    window.location.reload()

    return {
        type: LOG_OUT
    }
}

export const forgotPasswordAction = () => {
    return {
        type: "Forgot Password"
    }
}

export const updatePasswordAction = () => {
    return {
        type: "Update Password"
    }
}

// export default {
//     loggedInAction,
//     loggedOutAction,
//     forgotPasswordAction
// }


