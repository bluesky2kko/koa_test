
exports.getToken = async (a_token) => {

    let jwt = require("jsonwebtoken");
    let secretObj = require("./jwt.js");
    
    let out = "";
    
    try {
        let decoded = jwt.verify(a_token, secretObj.secret);
        
        // console.log("decoded ==> " + decoded);
        // for (let i in decoded) {
        //     console.log("==> " + i + " : " + decoded[i])
        // }
    
        if (decoded) {
            out = "OK";
            //throw new Error("OKK");
        } else {
            //out = "권한없음";
            throw new Error('권한없음');  // 강제로 catch(error) 로 내보내기 ...
        }

    } catch (error) {
        console.log(" catch error => " + error);
        out = "Error";

    } finally {
        return out;
    }
};
exports.setToken = async () => {

    let jwt = require("jsonwebtoken");
    let secretObj = require("./jwt.js");
    
    let token_value = "";
    
    try {
        token_value = jwt.sign(
            {
                email: "xpo@example.com"   // 토큰의 내용(payload)
            },
            secretObj.secret ,    // 비밀 키
            {
                expiresIn: '60m'    // 유효 시간은 60분
            }
        );
    
        console.log("create token => " + token_value);

    } catch (error) {
        console.log(" catch error => " + error);
        //
        token_value = "Error";

    } finally {
        return token_value;
    }
};