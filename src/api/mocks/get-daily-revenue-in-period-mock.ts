import { http, HttpResponse } from 'msw'

import { GetDailyRevenueInPeriodResponse } from '../get-daily-revenue-in-period'

export const getDailyRevenueInPeriodMock = http.get<
    never,
    never,
    GetDailyRevenueInPeriodResponse>('/metrics/daily-receipt-in-period', () => {
        return HttpResponse.json([
            { date: '01/01/2025', receipt: 2000 },
            { date: '02/01/2025', receipt: 234 },
            { date: '03/01/2025', receipt: 546 },
            { date: '04/01/2025', receipt: 787 },
            { date: '05/01/2025', receipt: 3350 },
            { date: '06/01/2025', receipt: 4663 },
            { date: '07/01/2025', receipt: 1006 },
        ])
    })