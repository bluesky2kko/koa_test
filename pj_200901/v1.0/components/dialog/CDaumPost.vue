<template>
<div>
    <!-- juso.go.kr에서 제공하는 REST API를 직접 이용해서 개발하시는게 -->
    <!-- iOS에서는 position:fixed 버그가 있음, 적용하는 사이트에 맞게 position:absolute 등을 이용하여 top,left값 조정 필요 -->
    <!--div id="daum_layer" style="display:; background:black; overflow:hidden; -webkit-overflow-scrolling:touch;"-->
    <v-toolbar dense flat>
        <v-toolbar-title>
            <v-chip dark
                :color="$store.state.c_title.bg_color"
                >우편번호검색
            </v-chip> 
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click.stop="click_close()">
            <v-icon>mdi-close</v-icon>
        </v-btn>
    </v-toolbar>

    <div id="daum_layer"></div>
 </div>
</template>
<script>
export default {
    // nuxt.config.js 에서 선언 해야함...
    /*
    head: {
        script: [
            { src: 'http://dmaps.daum.net/map_js_init/postcode.v2.js' }
        ]
    },        
    */
    data() {
        return {
            //
        }
    },
    computed: {
        c_daum_post() {
            return this.$store.state.c_daum_post
        }
    },    
    mounted: function() {
        this.$nextTick(function() {
           this.execDaumPostCode()
        })
        //
        this.$nuxt.$on("PMemberForm.click_zipno_arr", (para) => {
            this.execDaumPostCode()
        })
    },
	methods: {
        closeDaumPostcode() {
            this.c_daum_post.dialog = false
        },
        execDaumPostCode() {
            //alert("execDaumPostCode")
            let self = this;    // 여기가 아주 중요 반드시 지정해야함...
            let element_layer = document.getElementById('daum_layer')
            new daum.Postcode({
                oncomplete: function(data) {
                    // 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                    // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                    // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                    let fullAddr = data.address; // 최종 주소 변수
                    let extraAddr = ''; // 조합형 주소 변수

                    // 기본 주소가 도로명 타입일때 조합한다.
                    if(data.addressType === 'R'){
                        //법정동명이 있을 경우 추가한다.
                        if(data.bname !== ''){
                            extraAddr += data.bname;
                        }
                        // 건물명이 있을 경우 추가한다.
                        if(data.buildingName !== ''){
                            extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                        }
                        // 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
                        fullAddr += (extraAddr !== '' ? ' ('+ extraAddr +')' : '');
                    }

                    // 우편번호와 주소 정보를 해당 필드에 넣는다.
                    //alert(data.zonecode)
                    self.set_addr(data.zonecode, fullAddr);     // this.이 아닌 self. 으로 넘겨 줘야함... 그래야 처리됨....
                },
                width : '100%',
                height : '100%'
            }).embed(element_layer);

            // element를 보이게 한다.
            element_layer.style.display = 'block';

            // element의 위치를 화면의 가운데로 이동시킨다.
            this.initLayerPosition();
        },
        set_addr(p_ad_zipcode, p_ad_address) {
            //alert(p_ad_zipcode + " : " + p_ad_address)
            //
            let obj = {}
            obj.zipno = p_ad_zipcode
            obj.txt_val = p_ad_address
            //
            this.$store.commit("click/click_daumpost_pmember", obj)
            //
            this.closeDaumPostcode()
        },
        // 브라우저의 크기 변경에 따라 레이어를 가운데로 이동시키고자 하실때에는
        // resize이벤트나, orientationchange이벤트를 이용하여 값이 변경될때마다 아래 함수를 실행 시켜 주시거나,
        // 직접 element_layer의 top,left값을 수정해 주시면 됩니다.
        initLayerPosition() {
            let width = 300; //우편번호 서비스가 들어갈 element의 width
            let height = 470; //우편번호 서비스가 들어갈 element의 height
            let borderWidth = 1; //샘플에서 사용하는 border의 두께

            // 위에서 선언한 값들을 실제 element에 넣는다.
            let element_layer = document.getElementById('daum_layer')
            element_layer.style.width = width + 'px';
            element_layer.style.height = height + 'px';
            element_layer.style.border = borderWidth + 'px solid';
            // 실행되는 순간의 화면 너비와 높이 값을 가져와서 중앙에 뜰 수 있도록 위치를 계산한다.
            element_layer.style.left = (((window.innerWidth || document.documentElement.clientWidth) - width)/2 - borderWidth) + 'px';
            element_layer.style.top = (((window.innerHeight || document.documentElement.clientHeight) - height)/2 - borderWidth) + 'px';
        },
        click_close() {
            this.closeDaumPostcode()
        }
    }
}   
</script>