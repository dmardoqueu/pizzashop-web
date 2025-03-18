import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import colors from "tailwindcss/colors"

const data = [
    { date: '14/03', revenue: 1200 },
    { date: '15/03', revenue: 944 },
    { date: '16/03', revenue: 900 },
    { date: '17/03', revenue: 1204 },
    { date: '18/03', revenue: 1457 },
    { date: '19/03', revenue: 1003 },
    { date: '20/03', revenue: 579 },
]

export function RevenueChart() {
    return (
        <Card className="col-span-6">
            <CardHeader className="flex-row items-center justify-between pb-8">
                <div className="space-y-1">
                    <CardTitle className="text-base font-medium">
                        Receitas no período
                    </CardTitle>
                    <CardDescription>
                        Receita diária no período
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="98%" height={240}>
                    <LineChart data={data} style={{ fontSize: 12 }}>
                        <XAxis dataKey="date" tickLine={false} axisLine={false} dy={16} />

                        <YAxis stroke="#888" width={80} axisLine={false} tickLine={false} tickFormatter={(value: number) => value.toLocaleString('pt-BR', {
                            style: "currency",
                            currency: "BRL",
                        })}
                        />
                        <CartesianGrid vertical={false} className="stroke-muted" />
                        
                        <Line type="linear" strokeWidth={2} dataKey="revenue" stroke={colors.violet['400']} />

                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}