import { env } from '@/env'
import { setupWorker } from 'msw/browser'
import { signInMock } from './sign-in-mock'
import { registerRestaurantMock } from './register-restaurant-mock'
import { getDayOrdersAmountMock } from './get-day-orders-amount-mock'
import { getMonthOrdersAmountMock } from './get-month-orders-amount-mock'
import { getMonthCanceledOrdersAmountMock } from './get-month-canceled-orders-amount-mock'
import { getMonthRevenueMock } from './get-month-revenue'
import { getDailyRevenueInPeriodMock } from './get-daily-revenue-in-period-mock'
import { getPopularProductsMock } from './get-popular-products-mock'
import { updateProfileMock } from './update-profile-mock'
import { getProfileMock } from './get-profile-mock'
import { getManagedRestaurantMock } from './get-managed-restaurant-mock'
import { getOrdersMock } from './get-orders-mock'
import { getOrderDetailsMock } from './get-orders-details-mock'
import { approveOrderMock } from './approve-order-mock'
import { cancelOrderMock } from './cancel-order-mock'
import { deliverOrderMock } from './deliver-order-mock'
import { dispatchOrderMock } from './dispatch-order-mock'

export const worker = setupWorker(
    approveOrderMock,
    cancelOrderMock,
    deliverOrderMock,
    dispatchOrderMock,
    getDailyRevenueInPeriodMock,
    getDayOrdersAmountMock,
    getManagedRestaurantMock,
    getMonthCanceledOrdersAmountMock,
    getMonthOrdersAmountMock,
    getMonthRevenueMock,
    getOrderDetailsMock,
    getOrdersMock,
    getPopularProductsMock,
    getProfileMock,
    registerRestaurantMock,
    signInMock,
    updateProfileMock,
)

export async function enableMSW() {
    if (env.MODE !== 'test') {
        return
    }

    await worker.start()
}