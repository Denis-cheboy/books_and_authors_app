const bcrypt=require("bcryptjs")

const hash=async(password)=>{
    const salt=await bcrypt.genSalt(10)
    return bcrypt.hash(password,salt)
}

const comparePasswords=async(userPassword,password)=>{
    return bcrypt.compare(password,userPassword)
}

module.exports={
    hash,comparePasswords
}