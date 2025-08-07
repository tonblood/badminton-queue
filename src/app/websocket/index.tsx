'use client';
import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:8081")

const websocketPlayersQueue = () => {

    useEffect(() => {
        socket.on("dataResponse", data => {
            console.log(data);

        })
        fetchData()
    }, [])

    const fetchData = () => {
        socket.emit('fetchData')
    }
}

export default websocketPlayersQueue