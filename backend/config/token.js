import jwt from "jsonwebtoken"

const genToken = async(userId)=>{
    try{
        const token = await jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"7d"})
        return token
        console.log(`JWT token:${token}`)
    }catch(error){
        console.log(`JWT generation error:${error}`)
    }
}

export default genToken;