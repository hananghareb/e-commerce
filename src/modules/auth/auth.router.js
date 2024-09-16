import { Router } from "express"
import *as authcontroller from './auth.controller.js'
import {  checkemail } from "../../middleware/checkEmail.js"

const authrouter = Router()

authrouter.post('/signup',checkemail, authcontroller.signup)
authrouter.post('/signin', authcontroller.signin)
authrouter.patch('/changepasssword', authcontroller.changepassword)



export default authrouter