
import React, { useState } from "react";
interface Param {
    id: number
    message: string
    type: string
}

const Notification = (props: Param) => {
    return (
        <div className={`notification notification-${props.type || 'success'}`}>
            <span>{props.message}</span>
        </div>
    );
};

export default Notification;