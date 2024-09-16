import multer, { diskStorage } from "multer";
import { nanoid } from "nanoid";
import { AppError } from "../utils/appError.js";

export const fileupload = (foldername)=>{
    const storage = diskStorage({
        destination: `uploads/${foldername}`,
        filename:(req,file,cb)=>{
            cb(null, nanoid() + "_" + file.originalname)
        }
    })

    function filefilter (req,file,cb){
        if(file.mimetype.startWith('image')){
            cb(null,true)
        }else{
            cb(new AppError('images only' ,401) , false)
        }
    }

    const uplaod =multer({storage,filefilter})
    return uplaod

}

export const uplaodsinglefile = (fieldname,foldername) => fileupload(foldername).single(fieldname)
export const uplaodsmixfiles = (arrayoffileds,foldername) => fileupload(foldername).fields(arrayoffileds)  