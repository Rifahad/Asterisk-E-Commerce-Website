const userDetails=require("../model/registerModel")
const bcrypt=require("bcrypt")

const passwordSymbols = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validation=async (req,res,next)=>{
    const {fullName,phoneNumber,password,confirmPassword}=userDetails

    const existUser=await userDetails.findOne({fullName})
    
    if (!fullName && !phoneNumber && !password && !confirmPassword) 
    {
        // req.flash('error','All fields are required')
        res.redirect("/signup")
    }else if(existUser) 
    {
        // req.flash('error','User already exists. Please login to your account.')
        res.redirect('/signup');
    }
    else if (!passwordSymbols.test(password)) 
    {
        // req.flash('error','Invalid password format')
        res.redirect('/signup');
    }
     else if (password !==confirmPassword)     
    {   
        // req.flash('error','Password and confirm password must be equal')
        res.redirect('/signup');
    }
    else 
    {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword
        req.body.confirmPassword = hashedPassword
        next()
        
    }
}