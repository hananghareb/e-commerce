import { Router } from "express";
import *as brandcontroller from './brand.controller.js'
import { uplaodsinglefile } from "../../fileupload/fileupload.js";

 const brandrouter = Router()

brandrouter.post('/', uplaodsinglefile('logo', 'brand'),brandcontroller.addbrand)
brandrouter.get('/',brandcontroller.getbrands)
brandrouter.get('/:id',brandcontroller.getbrand)
brandrouter.put('/:id',uplaodsinglefile('logo', 'brand'),brandcontroller.updatebrand)
brandrouter.delete('/:id',brandcontroller.deletebrand)




export default brandrouter


