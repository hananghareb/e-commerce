import { Router } from "express";
import *as productcontroller from './product.controller.js'
import { uplaodsmixfiles } from "../../fileupload/fileupload.js";

 const productrouter = Router()

productrouter.post('/', uplaodsmixfiles([{name: 'imagecover',maxCount:1},{name:'images',maxCount:10}],'products'),productcontroller.addproduct)
productrouter.get('/',productcontroller.getproducts)
productrouter.get('/:id',productcontroller.getproduct)
productrouter.put('/:id',uplaodsmixfiles([{name: 'imagecover',maxCount:1},{name:'images',maxCount:10}],'products'),productcontroller.updateproduct)
productrouter.delete('/:id',productcontroller.deleteproduct)




export default productrouter


