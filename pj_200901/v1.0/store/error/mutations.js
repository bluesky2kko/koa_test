
export default {
    act_error(state, error) {
        //alert(error)
        state.c_error_msg.msg = error
        state.c_error_msg.dialog = true
    },
}