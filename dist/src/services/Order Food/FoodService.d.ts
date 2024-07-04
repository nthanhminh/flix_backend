declare const _default: {
    addFood: (name: string, price: string, image: Buffer) => Promise<string>;
    addCombo: (name: string, price: string, image: Buffer) => Promise<string>;
    getImageFromFoodId: (id: number) => Promise<Buffer | null>;
    getImageFromComboId: (id: number) => Promise<Buffer | null>;
    getAllFood: () => Promise<{
        image: string;
        id: number;
        name: string;
        price: string;
    }[]>;
    getAllCombo: () => Promise<{
        image: string;
        id: number;
        price: string;
        name: string;
    }[]>;
    orderFood: (customerId: number, totalPrice: string, foodIdList: number[], comboIdList: number[]) => Promise<"Successfully" | "Error occured when creating new order">;
};
export default _default;
