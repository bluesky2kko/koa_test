//
export default () => ({
    authenticated: false,
    platform: "PC",
    //
    token_info: {},
    //
    c_drawer: {
        drawer: null,        // 왼쪽에 display 여부 + 왼쪽에서 열려라 ...
        miniVariant: false,   // 왼쪽의 메뉴 축소 여부
        //
        bg_color: '#00001E',
        bg_image: 'https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg'
        //bg_image: 'https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg'
    },
    c_drawer_right: {
        drawer: false,   // 오른쪽에 display 여부
        right: true          // 오른쪽에서 열려라 ...        
    },
    c_appbar: {
        barLocation: ''
    },
    c_title: {
        icon: '',
        title: '',
        //bg_color: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',   // black
        bg_color: '#2196F3'
    },
    c_toolbar: {
        act: ""
    },
    c_delete: {
        dialog: false
    },
    c_error_msg: {
        dialog: false,
        msg: ""
    },
    c_select: {
        dialog: false,
        fullscreen: false,
        scrollable: false,
        parent_cpnt_nm: "PTreeForm",    // PTreeForm, PMemberForm
        cpnt_nm: "CTreeView",           // CDaumPost
        max_width: "500"                // 
    },
    c_daum_post: {
        dialog: false,
        idx: 0
    },    
    c_form: {
        dialog: false,
        cpnt_nm: "",    // 동적콤포너트명 -> PJepumForm, PTreeForm, PMemberForm, PSiteForm
        s_data: {}
    },
    c_date_view: {
        dialog: false,
        gubun: ''   // start, end
    }, 
    c_date: {
        start: null,
        end: null,
        modal: false,
        modal2: false
    },
    c_time: {
        start: null,
        end: null
    },
    //
    //
    // 이하 리스트 화면 적용 data ...
    PBalju: {
        cond: {
            s_date: "",
            e_date: new Date().toISOString().substr(0, 10),
            title: ""
        },
        idx: 0, // 반드시 이곳에 만들자 확장성 고려....
        remain: 10,
        chk_data: [],
        m_data: [],
        page_no: 0
    },    
    PJepum: {
        cond: {
            prod_nm: ""
        },
        idx: 0, // 반드시 이곳에 만들자 확장성 고려....
        remain: 10,
        chk_data: [],
        m_data: [],
        page_no: 0
    },    
    PBoard: {
        cond: {
            s_date: "",
            e_date: new Date().toISOString().substr(0, 10),
            title: ""
        },
        idx: 0, // 반드시 이곳에 만들자 확장성 고려....
        remain: 10,
        chk_data: [],
        m_data: [],
        page_no: 0
    },
    PIpchulgum: {
        cond: {
            s_date: "",
            e_date: new Date().toISOString().substr(0, 10),
            gubun: "",
            vendor_nm: "",
            memo: ""
        },
        t_data: {
            ip_amt: 0,
            chul_amt: 0,
        },
        idx: 0, // 반드시 이곳에 만들자 확장성 고려....
        remain: 10,
        chk_data: [],
        m_data: [],
        page_no: 0
    },
    PGwanribi: {
        cond: {
            gubun: "1",
            s_date: "",
            e_date: new Date().toISOString().substr(0, 10),
            sangho: ""
        },
        gong_amt_label: "공급가액",
        gong_amt_2_1: 0,
        idx: 0,
        remain: 10,
        chk_data: [],
        m_data: [],
        page_no: 0,
    },
    PTree: {
        cond: {
            group_cd: ["1", "2", "3"], // 배열형태로 1:개인,2:공용,3:사내, G:업체크룹, C:코드
        },
        filter: "",
        sv_item: {},
        sv_tree_id: null,
        idx: 0,
        chk_data: [],
        m_data: []
    },
    PCompany: {
        cond: {
            comp_nm: ""
        },
        idx: 0,
        chk_data: [],
        m_data: [],
        page_no: 0
    },
    PSite: {
        cond: {
            site_nm: ""
        },
        idx: 0,
        chk_data: [],
        m_data: [],
        page_no: 0
    },
    PMember: {
        // s_data: {
        //     sajin: "http://21cnkc.iptims.org:3100/files/64.jpg"
        // },
        cond: {
            s_date: "",
            e_date: new Date().toISOString().substr(0, 10),
        },
        idx: 0,
        chk_data: [],
        m_data: [],
        page_no: 0
    },
   //---------------------------------------------------
   // 실행방법 아래와 같이 (자꾸 작업 방법을 잊어버림...)
   //---------------------------------------------------
   // cd /home/xpo/nuxt/namk2
   // npm run dev
   //-----------------------------------
   // cd /home/xpo/dbconn/21cnkc
   // sudo node app.js
   //----------------------------------
   url: {
        siud: "http://21cnkc.iptime.org:4000/siud",
        trans: "http://21cnkc.iptime.org:4000/trans",
        lguplus: "http://21cnkc.iptime.org:4000/lguplus",
        email: "http://21cnkc.iptime.org:4000/email",
        fax: "http://21cnkc.iptime.org:4000/fax",
        excel: "http://21cnkc.iptime.org:4000/excel"
    },
    //
    db_para: {
        s: "",
        t: "",
        url: "",
        method: "",
        cond: "",
        data: []
    },
});