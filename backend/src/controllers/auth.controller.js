import User from '../models/user.model.js';
import { errorHandler } from '../utils/errorHandler.js'
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signUp = async(req, res, next)=> {
    const { firstName, lastName, email, phoneNo, role, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ firstName, lastName, email, phoneNo, role, password:hashedPassword });

    try{
        await newUser.save();
        res.status(201).json({message : "User created succesfully !!!"});
    }catch(error){
        next(error);
    }
};

export const signIn = async (req, res, next) => {
    const {email, role,  password} = req.body;
    try{
        const validUser = await User.findOne({ email });
        if( !validUser ) return next(errorHandler(404, "User not found"));
        if(role != validUser.role) return next(errorHandler(404, "User role mismatched!" ))
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if( !validPassword ) return next(errorHandler(401, "Wrong Credentials! "));
        const token = jwt.sign({ id : validUser._id}, process.env.JWT_SECRET);
        const { password: pass, phoneNo: phoneNo,  ...rest } = validUser._doc;
        res
            .cookie("accessToken", token, {httpOnly: true})
            .status(200)
            .json(rest);
    } catch(error){
        next(error);
    }
};

export const signOut = (req, res)  => {
    try {
        res.clearCookie('accessToken');
        res.status(200).json('User has been loged out!');
    } catch (error) {
        next(error)
    }
};

export const test = (req, res)=>{
    res.send("Api working");
};