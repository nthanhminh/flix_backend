import { Order, SeatingOrderDetail } from "@prisma/client";
declare const _default: {
    addIntoOrder: (customerId: number, totalPrice: string) => Promise<{
        id: number;
        customerId: number;
        date: Date;
        totalPrice: string;
    } | null>;
    addIntoOrderDetail: (orderId: number, foodId: number | null, comboId: number | null) => Promise<{
        id: number;
        orderId: number;
        foodId: number | null;
        comboId: number | null;
    } | null>;
    addIntoSeatingOrderDetail: (orderDetailId: number, value: string, movieScheduleId: number) => Promise<{
        id: number;
        orderDetailId: number;
        value: string;
        movieScheduleId: number;
    } | null>;
    getOrderFromUserId: (customerId: number) => Promise<Order[]>;
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
    getSeatingOrderDetailByOrderDetailId: (orderDetailId: number) => Promise<SeatingOrderDetail | null>;
    getSeatingOrderDetailByMovieSchedule: (movieScheduleId: number) => Promise<SeatingOrderDetail[]>;
};
export default _default;
