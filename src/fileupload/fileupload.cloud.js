import multer, { diskStorage } from "multer";
import { nanoid } from "nanoid";
import { AppError } from "../utils/appError.js";

export const cloudupload = (foldername)=>{
    const storage = diskStorage({})

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

export const uplaodsinglefile = (fieldname,foldername) => cloudupload(foldername).single(fieldname)
export const uplaodsmixfiles = (arrayoffileds,foldername) => cloudupload(foldername).fields(arrayoffileds)  