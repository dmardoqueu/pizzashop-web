import { getMonthRevenue } from "@/api/get-month-revenue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { DollarSign } from "lucide-react";

export function MonthRevenueCard() {
    const { data: monthRevenue } = useQuery({
        queryFn: getMonthRevenue,
        queryKey: ['metrics', 'month-revenue']
    })

    return (
        <Card className="gap-2">
            <CardHeader className="flex-row items-center space-y-0">
                <div className="flex items-center justify-between space-x-2 p-0">
                    <CardTitle className="text-base font-semibold pt-0">
                        Receita total (mês)
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </div>
            </CardHeader>
            <CardContent className="space-y-1">
                {monthRevenue && (
                    <>
                        <span className="text-2xl font-bold tracking-tight">{(monthRevenue.receipt / 100).toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        })}
                        </span>
                        <p className="text-xs text-muted-foreground">
                            {monthRevenue.diffFromLastMonth >= 0 ? (
                                <>
                                    <span className="text-emerald-500 dark:text-emerald-400">+{monthRevenue.diffFromLastMonth}%</span>{' '} em relação ao último mês
                                </>
                            ) : (
                                <>
                                    <span className="text-rose-500 dark:text-rose-400">{monthRevenue.diffFromLastMonth}%</span>{' '} em relação ao último mês
                                </>
                            )}
                        </p>
                    </>
                )}
            </CardContent>
        </Card>
    )
}