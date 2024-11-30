import React, { createContext, useState, useContext, ReactNode } from "react";
import Notification from "../component/message";

interface Notification {
    id: number;
    message: string;
    type: "success" | "error";
}

interface NotificationContextType {
    addNotification: (message: string, type: "success" | "error") => void;
}
interface NotificationProviderProps {
    children: ReactNode; // ReactNode is the type for any valid JSX content
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);
export const NotificationProvider: React.FC<NotificationProviderProps>  = ({ children }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const addNotification = (message: string, type: "success" | "error") => {
        const id = Date.now();
        setNotifications((prev) => [...prev, { id, message, type }]);

        // Remove notification after 3 seconds
        setTimeout(() => removeNotification(id), 3000);
    };

    const removeNotification = (id: number) => {
        setNotifications((prev) => prev.filter((notification) => notification.id !== id));
    };

    return (
        <NotificationContext.Provider value={{ addNotification }}>
            {children}
            {notifications.map((notification) => (
                <Notification
                    id={notification.id}
                    message={notification.message}
                    type={notification.type}
                />
            ))}
        </NotificationContext.Provider>
    );
};

export const useNotification = (): NotificationContextType => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error("useNotification must be used within a NotificationProvider");
    }
    return context;
};