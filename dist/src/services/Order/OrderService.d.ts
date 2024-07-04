type OrderDetailItem = {
    orderDetailId: number;
    value: string;
};
type OrderForCustomer = {
    [key: number]: OrderDetailItem[];
};
declare const _default: {
    addFoodIntoOrderDetail: (orderId: number, foodIdList: number[]) => Promise<void>;
    addComboIntoOrderDetail: (orderId: number, comboIdList: number[]) => Promise<void>;
    addSeatIntoSeatingOrderDetail: (orderId: number, seatingOrderDetail: string[], movieScheduleId: number) => Promise<void>;
    addIntoOrder: (customerId: number, totalPrice: string) => Promise<{
        id: number;
        customerId: number;
        date: Date;
        totalPrice: string;
    } | null>;
    getOrderFromUserId: (customerId: number) => Promise<{
        id: number;
        customerId: number;
        date: Date;
        totalPrice: string;
    }[]>;
    getOrderDetailByOrderId: (orderId: number) => Promise<({
        food: {
            id: number;
            name: string;
            price: string;
            image: Buffer;
        } | null;
        combo: {
            id: number;
            price: string;
            name: string;
            image: Buffer;
        } | null;
    } & {
        id: number;
        orderId: number;
        foodId: number | null;
        comboId: number | null;
    })[]>;
    getSeatingOrderDetailByOrderDetailId: (orderDetailId: number) => Promise<{
        id: number;
        orderDetailId: number;
        value: string;
        movieScheduleId: number;
    } | null>;
    getOrderByCustomerId: (customerId: number) => Promise<OrderForCustomer>;
    getSeatingOrderDetailByMovieSchedule: (movieScheduleId: number) => Promise<string[]>;
};
export default _default;
