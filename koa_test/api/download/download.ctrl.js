// GET => http://21cnkc.iptime.org:4000/api/updown/64.jpg
exports.download = async (ctx) => {
    try {
        let file = "./files/" + ctx.params.filename;
        const img =  await fs.createReadStream(file);
        //
        //console.log("file : " + file);
        //console.log(img);
        //
        ctx.response.set("content-type", "image/png");
        ctx.body = img;

    } catch (error) {
        ctx.body = "error : " + error;
    }
};