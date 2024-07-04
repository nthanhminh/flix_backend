import { Combo, Food } from "@prisma/client";
declare const _default: {
    addCombo: (name: string, price: string, image: Buffer) => Promise<{
        id: number;
        price: string;
        name: string;
        image: Buffer;
    } | undefined>;
    addFood: (name: string, price: string, image: Buffer) => Promise<{
        id: number;
        name: string;
        price: string;
        image: Buffer;
    } | undefined>;
    getImageFromFoodId: (id: number) => Promise<Buffer | null>;
    getImageFromComboId: (id: number) => Promise<Buffer | null>;
    getAllFood: () => Promise<Food[]>;
    getAllCombo: () => Promise<Combo[]>;
};
export default _default;
