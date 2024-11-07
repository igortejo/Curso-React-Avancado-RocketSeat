import { api } from "@/lib/axios";


export interface getMonthCanceledOrderAmountResponse {
    amount: number 
    diffFromLastMonth: number
}

export async function getMonthCanceledOrderAmount() {
    const response = await api.get<getMonthCanceledOrderAmountResponse>(
        '/metrics/month-canceled-orders-amount'
    )

    return response.data
}