import bycrypt from 'bcrypt'
import UserRepository from '../../repository/User/UserRepository'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const salt: number = 10

const hashPassword = async (password: string):Promise<string> => {
    const passwordHashed = await bycrypt.hash(password, salt)
    return passwordHashed
}

const register = async(userName:string, password: string) : Promise<Object | null> => {
    try {
        const checkUserNameIsExist = await UserRepository.checkUserNameIsExist(userName)
        if(checkUserNameIsExist){
            throw new Error("UserName already registered !")
        }
        if (!userName || userName.length < 4) {
            throw new Error("Username must be at least 4 characters long.")
        }
        if (!password || password.length < 8) {
            throw new Error ("Password must be at least 8 characters long.")
        }
        const passwordHashed = await hashPassword(password)
        const user: Awaited<ReturnType<typeof UserRepository.createNewUser>> = await UserRepository.createNewUser(userName, passwordHashed)
        if(user){
            const accessToken = generateAccessToken(user.userName, user.id)
            return {
                accessToken: accessToken,
                message: "Successfully created new user!"
            }
        }
        throw new Error ("Error occurred. Please try again later !")
    } catch (error) {
        console.error(error)
        return null
    }
}

const login = async(userName: string, password: string) => {
    const user = await UserRepository.getUserByUserName(userName)

    if(!user){
        throw new Error ("Username is not exist!")
    }

    const checkPassword = await comparePassword(user.password, password)

    if(!checkPassword){
        throw new Error ("Incorrect password!")
    }

    const accessToken = generateAccessToken(user.userName,user.id)

    return {
        accessToken,
        message: "Login successfully"
    }
}

const comparePassword = async(password: string, userPassword: string) : Promise<boolean> =>{
    const check =await bycrypt.compare(userPassword, password)
    return check
}

const getUserByUserNameAndId = async(userName: string, userId: number) => {
    const user = await UserRepository.getUserByUserNameAndId(userName, userId)
    return user
}

const generateAccessToken = (userName: string, id: number) : string => {
    const accessToken: string =  jwt.sign({
        userName: userName,
        userId: id,
    },process.env.JWT_SECRET!, {
        expiresIn: '7d'
    })

    return accessToken
}

export default {
    register,
    login,
    getUserByUserNameAndId
}