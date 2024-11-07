import { http, HttpResponse } from 'msw'
import { getDailyRevenueInPeriodResponse } from '../get-daily-revenue-in-period'

export const getDailyRevenueInPeriodMock = http.get<never, never, getDailyRevenueInPeriodResponse>(
    '/metrics/daily-receipt-in-period', () => {
    return HttpResponse.json([
        {date: '01/01/2024', receipt: 2000},
        {date: '02/01/2024', receipt: 1010},
        {date: '03/01/2024', receipt: 800},
        {date: '04/01/2024', receipt: 3200},
        {date: '05/01/2024', receipt: 1000},
        {date: '06/01/2024', receipt: 5000},
        {date: '07/01/2024', receipt: 500},
    ])
})