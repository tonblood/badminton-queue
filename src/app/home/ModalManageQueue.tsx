import React, { useState } from 'react'
import { PlayerTeam } from './model'
import { SortableContainer, SortableElement, arrayMove } from "react-sortable-hoc";
import { Button } from '@nextui-org/react';
import { OrderTeam } from './service';

type Param = {
    awaittingTeamList: PlayerTeam[]
    setIsVisibleModal: Function
    courtId: number
    setAwatingTeamList: Function
    setIsLoading: Function
}


const ModalManageQueue = (props: Param) => {
    const [orders, setOrders] = useState<PlayerTeam[]>(props.awaittingTeamList);

    const onSortEnd = ({ oldIndex, newIndex }: any) => {
        setOrders(arrayMove(orders, oldIndex, newIndex));
    };

    const SortableItem = SortableElement<{ order: PlayerTeam }>(({ order }: { order: PlayerTeam }) => (
        <li
            style={{
                padding: "10px",
                margin: "5px",
                background: "#fff",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "grab",
            }}
        >
            {order.firstPlayer} - {order.secondPlayer}
            <span style={{ color: "#6c757d" }}>☰</span>
        </li>
    ));

    // Sortable List Component
    const SortableList = SortableContainer<{ orders: PlayerTeam[] }>(({ orders }: { orders: PlayerTeam[] }) => {
        return (
            <ul style={{ listStyle: "none" }}>
                {orders.map((order: PlayerTeam, index: number) => (
                    <SortableItem key={order.id} index={index} order={order} />
                ))}
            </ul>
        );
    });

    const handleConfirm = () => {
        const data = {
            orders: orders
        }
        props.setIsVisibleModal(false)
        props.setIsLoading(true)
        OrderTeam(props.courtId, data).then((res) => {
            props.setAwatingTeamList(res)
        }).finally(() => {
            props.setIsLoading(false)
        })
        
    }

    const handleCancel = () => {
        props.setIsVisibleModal(false)
        setOrders(props.awaittingTeamList)
    }

    return (
        <div>
            <SortableList orders={orders} onSortEnd={onSortEnd} />
            <div
                style={{
                    display: "flex",
                    gap: "16px",
                    justifyContent: "center",
                    padding: "24px 16px 0px 16px",
                }}
            >
                <Button
                    style={{ width: "100%" }}
                    radius="full"
                    variant="ghost"
                    size="md"
                    className="button-default"
                    onClick={handleCancel}
                >
                    ยกเลิก
                </Button>
                <Button
                    style={{ width: "100%" }}
                    radius="full"
                    variant="solid"
                    size="md"
                    className="button-primary"
                    onClick={handleConfirm}
                >
                    ยืนยัน
                </Button>
            </div>
        </div>
    )
}

export default ModalManageQueue