import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Utensils } from "lucide-react";

export function DayOrdersAmountCard() {
    return (
        <Card className="gap-2">
            <CardHeader className="flex-row items-center space-y-0">
                <div className="flex items-center justify-between space-x-2 p-0">
                    <CardTitle className="text-base font-semibold pt-0">
                        Pedidos (dia)
                    </CardTitle>
                    <Utensils className="h-4 w-4 text-muted-foreground" />
                </div>
            </CardHeader>
            <CardContent className="space-y-1">
                <span className="text-2xl font-bold tracking-tight">23</span>
                <p className="text-xs text-muted-foreground">
                    <span className="text-rose-500 dark:text-rose-400">-4%</span> em relação a ontem
                </p>
            </CardContent>
        </Card>
    )
}