import { http, HttpResponse } from 'msw'
import { getMonthCanceledOrderAmountResponse } from '../get-month-canceled-orders-amount'

export const getMonthCanceledOrdersAmountMock = http.get<never, never, getMonthCanceledOrderAmountResponse>(
    '/metrics/month-canceled-orders-amount', () => {
    return HttpResponse.json({
        amount:5,
        diffFromLastMonth: -5,
    })
})