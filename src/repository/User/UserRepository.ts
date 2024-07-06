import { PrismaClient, User } from "@prisma/client";

const prismaClient:PrismaClient = new PrismaClient()

const createNewUser = async (userName:string, password: string): Promise<User | null>  => {
    try {
        const newUser:User = await prismaClient.user.create({
            data: {
                userName,
                password
            }
        })

        return newUser;
    } catch (error) {
        console.error(error)
        return null;
    }
}

const checkUserNameIsExist = async (userName:string) : Promise<boolean | null> => {
    const user = await prismaClient.user.findFirst({
        where: {
            userName,
        }
    })

    if(user) {
        return true;
    }
    return false;
}

const getUserByUserName = async (userName:string) : Promise<User | null> => {
    const user = await prismaClient.user.findFirst({
        where: {
            userName,
        }
    })
    return user
}

const getUserByUserNameAndId = async (userName:string, userId:number) : Promise<User | null> => {
    const user = await prismaClient.user.findFirst({
        where: {
            id: userId,
            userName,
        }
    })
    return user
}
export default {
    createNewUser,
    checkUserNameIsExist,
    getUserByUserName,
    getUserByUserNameAndId
}