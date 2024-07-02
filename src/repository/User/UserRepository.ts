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

export default {
    createNewUser,
    checkUserNameIsExist
}