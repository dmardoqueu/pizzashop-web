import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableRow, TableCell } from "@/components/ui/table";
import { Search, ArrowRight, X } from "lucide-react";
import { OrderDetails } from "./order-details";
import { OrderStatus } from "@/components/order-status";
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { cancelOrder } from "@/api/cancel-order";
import { queryClient } from "@/lib/react-query";
import { GetOrderDetailsResponse } from "@/api/get-order-details";
import { GetOrdersResponse } from "@/api/get-orders";
import { approveOrder } from "@/api/approve-order";
import { deliverOrder } from "@/api/deliver-order";
import { dispatchOrder } from "@/api/dispatch-order";

interface OrderTableRowProps {
    order: {
        orderId: string;
        createdAt: string;
        status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
        customerName: string;
        total: number;
    }
}

function updateStatusOnCache(orderId: string, status: OrderStatus) {
    const ordersLisitCache = queryClient.getQueriesData<GetOrdersResponse>({
        queryKey: ['orders'],
    })

    ordersLisitCache.forEach(([cacheKey, cacheData]) => {
        if (!cacheData) {
            return
        }

        queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
            ...cacheData,
            orders: cacheData.orders.map((order) => {
                if (order.orderId === orderId) {
                    return { ...order, status }
                }

                return order
            })
        })
    }
    )
}

export function OrderTableRow({ order }: OrderTableRowProps) {
    const [isDetailsOpen, setIsDetailsOpen] = useState(false)

    const { mutateAsync: cancelOrderFn, isPending: isCancelingOrder } = useMutation({
        mutationFn: cancelOrder,
        async onSuccess(_, { orderId }) {
            updateStatusOnCache(orderId, 'canceled')
        },
    })

    const { mutateAsync: approveOrderFn, isPending: isApprovingOrder } = useMutation({
        mutationFn: approveOrder,
        async onSuccess(_, { orderId }) {
            updateStatusOnCache(orderId, 'processing')
        },
    })

    const { mutateAsync: dispatchOrderFn, isPending: isDispathingOrder } = useMutation({
        mutationFn: dispatchOrder,
        async onSuccess(_, { orderId }) {
            updateStatusOnCache(orderId, 'delivering')
        },
    })

    const { mutateAsync: deliverOrderFn, isPending: isDeliveringOrder } = useMutation({
        mutationFn: deliverOrder,
        async onSuccess(_, { orderId }) {
            updateStatusOnCache(orderId, 'delivered')
        },
    })

    return (
        <TableRow>
            <TableCell>
                <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline" size="xs">
                            <Search className="h-3 w-3" />
                            <span className="sr-only">Detalhes do pedido</span>
                        </Button>
                    </DialogTrigger>
                    <OrderDetails open={isDetailsOpen} orderId={order.orderId} />
                </Dialog>
            </TableCell>
            <TableCell className="font font-mono text-xs font-medium">
                {order.orderId}
            </TableCell>
            <TableCell className="text-muted-foreground">
                {formatDistanceToNow(order.createdAt, {
                    locale: ptBR,
                    addSuffix: true,
                })}
            </TableCell>
            <TableCell>
                <OrderStatus status={order.status} />
            </TableCell>
            <TableCell className="font-medium">
                {order.customerName}
            </TableCell>
            <TableCell className="font-medium">{(order.total / 100).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            })}</TableCell>

            <TableCell>
                {order.status === 'pending' && (
                    <Button
                        onClick={() => approveOrderFn({ orderId: order.orderId })}
                        disabled={isApprovingOrder}
                        variant="outline" size="xs">
                        <ArrowRight className="mr-2 h-3 w-3" />
                        Aprovar
                    </Button>
                )}

                {order.status === 'processing' && (
                    <Button
                        disabled={isDispathingOrder}
                        onClick={() => dispatchOrderFn({ orderId: order.orderId })}
                        variant="outline" size="xs">
                        <ArrowRight className="mr-2 h-3 w-3" />
                        Em entrega
                    </Button>
                )}

                {order.status === 'delivering' && (
                    <Button
                        disabled={isDeliveringOrder}
                        onClick={() => deliverOrderFn({ orderId: order.orderId })}
                        variant="outline" size="xs">
                        <ArrowRight className="mr-2 h-3 w-3" />
                        Entregue
                    </Button>
                )}
            </TableCell>
            <TableCell>
                <Button
                    variant="ghost"
                    size="xs"
                    disabled={!['pending', 'processing'].includes(order.status) || isCancelingOrder}
                    onClick={() => cancelOrderFn({ orderId: order.orderId })}>
                    <X className="mr-2 h-3 w-3" />
                    Cancelar
                </Button>
            </TableCell>
        </TableRow>)
}