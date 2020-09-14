
// getters

export default {
    get_mobile_chk(state) {

        console.log("==> state.platform : " + state.platform)

        if (state.platform == "MOBILE") {
            return true
        } else {
            return false
        }
    },
    //
    get_timestamp: function(state) {
        let d = new Date()
        let s =
            // 년월일
            getters.call_zeros(d.getFullYear(), 4) + "-" +
            getters.call_zeros(d.getMonth() + 1, 2) + "-" +
            getters.call_zeros(d.getDate(), 2) + " " +
            // 시분초
            getters.call_zeros(d.getHours(), 2) + ":" +
            getters.call_zeros(d.getMinutes(), 2) + ":" +
            getters.call_zeros(d.getSeconds(), 2)

        return s
    },
    call_zeros(n, digits) {
        let zero = ""
        n = n.toString()
        let i
        if (n.length < digits) {
            for (let i = 0; i < digits - n.length; i++)
                zero += "0"
        }
        return zero + n
    },
    //----------------------------------------------------
    /*
    someMethod: (state) => (id) => {
        return state.things.find(thing => thing.id === id)
      }
    */
    get_row_index: (state) => (cpnt_nm, row_id) => {
        let idx = state[cpnt_nm].m_data
                    .map(function (x) {
                    return x.id
                    })
                    .indexOf(row_id)
        //
        return idx
    },
    get_cpnt_nm: (state) => (para) => {
        let cpnt_nm = ""
        if (para == "list_cpnt") {
            cpnt_nm = state.tab.list_cpnt
            console.log("cpnt_nm : " + cpnt_nm)
            return state[cpnt_nm]
        }
    },
    get_date: (state) => (gubun) => {
        console.log("===> gubun : " + gubun)
        let date = new Date()
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = 0

        if (gubun == "today") {
            day = date.getDate()
        } else if (gubun == "first") {
            day = 1
        } else if (gubun == "last") {
            day = (new Date(year, month, 0)).getDate().toString() // 마지막 일자
        }

        if (month < 10) {
            month = "0" + month
        }
        if (day < 10) {
            day = "0" + day
        }
        date = year + "-" + month + "-" + day
            //
        console.log("date : " + date)
        return date
    },
    // 조건검색의 s_date
    get_s_date: (state) => (val) => {
        //console.log("val : " + val)
        let today = new Date()
        let s_date = new Date(today - (3600000 * 24 * val))
            //console.log("s_date : " + s_date)
        return s_date.toISOString().substr(0, 10)
    },
    //
    comma_clear: (state) => (val) => {
        return val.toString().replace(/,/g, "") // 콤마 제거 
    },
    comma_1000: (state) => (val) => {
        //alert(val)
        if (val == undefined) {
            return 0
        }
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    },
};
