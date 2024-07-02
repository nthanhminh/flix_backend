import bycrypt from 'bcrypt'
import UserRepository from '../../repository/User/UserRepository'

const salt: number = 10

const hashPassword = async (password: string):Promise<string> => {
    const passwordHashed = await bycrypt.hash(password, salt)
    return passwordHashed
}

const register = async(userName:string, password: string) : Promise<string | null> => {
    try {
        const checkUserNameIsExist = await UserRepository.checkUserNameIsExist(userName)
        if(checkUserNameIsExist){
            return "UserName already registered !"
        }
        if (!userName || userName.length < 4) {
            return "Username must be at least 4 characters long."
        }
        if (!password || password.length < 8) {
            return "Password must be at least 8 characters long."
        }
        const passwordHashed = await hashPassword(password)
        const user: Awaited<ReturnType<typeof UserRepository.createNewUser>> = await UserRepository.createNewUser(userName, passwordHashed)
        if(user){
            return "Registered successfully !"
        }
        return "Error occurred. Please try again later !"
    } catch (error) {
        console.error(error)
        return null
    }
}

export default {
    register
}