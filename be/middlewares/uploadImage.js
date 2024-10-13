const cloudinary = require('cloudinary').v2
const env = require("dotenv")
env.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


// Hàm upload từ URL (đã được truyền từ FE)
async function uploadFromUrl(imageUrl) {
    try {
        const uploadResult = await cloudinary.uploader.upload(imageUrl);
        // console.log("Upload từ URL thành công:", uploadResult);
        return {
            uploadResult:uploadResult,
            code:200
        };
    } catch (error) {
        // console.error("Lỗi khi upload từ URL:", error);
        return {
            code:400,
            message:"Upload failed"
        }
    }
}

module.exports = {
    uploadFromUrl
};