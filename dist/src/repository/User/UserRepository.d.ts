import { User } from "@prisma/client";
declare const _default: {
    createNewUser: (userName: string, password: string) => Promise<User | null>;
    checkUserNameIsExist: (userName: string) => Promise<boolean | null>;
};
export default _default;
