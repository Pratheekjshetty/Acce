import multer from "multer";
const storage =multer.diskStorage({
    destination :"./public/uploads",
    filename:function(req,file,cb){
        const uniqueSuffix=Date.now();
        const extension=file.originalname.subString(
            file.originalname.lastIndexof("."),
            file.originalname.length
        );
        cb(null,uniqueSuffix+extension);
    },
});

const maxSize=1024*1024*2 //2mb validation
const fileFilter=()=>{
   if(!file.mimetype.includes("jpg")&&!file.mimetype.includes("jpeg")&&!file.mimetype.includes("png")){
    return cb(null,false,new Error("only images are allowed"));
   }
   cb(null,true);
};
const upload =multer({
    storage:storage,
    limit:maxSize,
    fileFilter:fileFilter,
});
export default upload;