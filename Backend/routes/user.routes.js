const express =require('express');
const router=express.Router();

const {body}= require ('express.validator')
  

router.post('registers'[

    body ('email').isEmail().withMessage('invalid Email'),
    body('fullname.firstname').isLength({main:3}).withMessage('firstname must be atlest 3 characters long'),
    body('password').isLength({main:6}).withMessage('password must be atlest 6 characters long')
 ].userController.registerUser)

module.exports=router;