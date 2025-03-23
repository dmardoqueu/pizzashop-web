import { getMonthCanceledOrdersAmount } from "@/api/get-month-canceled-orders-amount";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { DollarSign } from "lucide-react";

export function MonthCanceledOrdersAmountCard() {
    const { data: monthCanceledOrdersAmount } = useQuery({
        queryFn: getMonthCanceledOrdersAmount,
        queryKey: ['metrics', 'month-canceled-orders-amount']
    })

    return (
        <Card className="gap-2">
            <CardHeader className="flex-row items-center space-y-0">
                <div className="flex items-center justify-between space-x-2 p-0">
                    <CardTitle className="text-base font-semibold pt-0">
                        Cancelamentos (mês)
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </div>
            </CardHeader>
            <CardContent className="space-y-1">
                {monthCanceledOrdersAmount && (
                    <>
                        <span className="text-2xl font-bold tracking-tight">{monthCanceledOrdersAmount.amount.toLocaleString('pt-BR')}</span>
                        <p className="text-xs text-muted-foreground">
                            {monthCanceledOrdersAmount.diffFromLastMonth < 0 ? (
                                <>
                                    <span className="text-emerald-500 dark:text-emerald-400">{monthCanceledOrdersAmount.diffFromLastMonth}%</span>{' '} em relação ao último mês
                                </>
                            ) : (
                                <>
                                    <span className="text-rose-500 dark:text-rose-400">+{monthCanceledOrdersAmount.diffFromLastMonth}%</span>{' '} em relação ao último mês
                                </>
                            )}
                        </p>
                    </>
                )}
            </CardContent>
        </Card>
    )
}