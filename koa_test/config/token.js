
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