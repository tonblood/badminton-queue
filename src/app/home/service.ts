import { axiosDelete, axiosGet, axiosPatch, axiosPost } from "@/app/common-api/home-api/axios"
import { PlayerTeam } from "./model";

export const GetdataListQueues = async (court: number) => {
    try {
        const response = await axiosGet('/api/players?court=' + court)
        return response.data.data
    } catch (err) {
        console.log(err);

    }
}

export const AddNewTeam = async (data: PlayerTeam) => {
    try {
        const response = await axiosPost('/api/players', data)
        return response.data.data
    } catch (err) {
        console.log(err);

    }
}

export const UpdateTeamWin = async (id: string, mode: boolean, court: number, data: {}) => {
    try {
        const response = await axiosPatch(`/api/players/win?id=${id}&mode=${mode ? 'tworound' : 'oneround'}&court=${court}`, data)
        return response.data.data
    } catch (err) {
        console.log(err);

    }
}

export const DeleteTeam = async (id: string, court: number) => {
    try {
        const response = await axiosDelete(`/api/players/delete?id=${id}&court=${court}`)
        return response.data.data
    } catch (err) {
        console.log(err);

    }
}

export const DeleteAllData = async (court: number) => {
    try {
        const response = await axiosDelete(`/api/players/deleteAll?court=${court}`)
        return response.data.data
    } catch (err) {
        console.log(err);

    }
}

export const UpdateTeamData = async (id: string, court: number, data: {}) => {
    try {
        const response = await axiosPatch(`/api/players?id=${id}&court=${court}`, data)
        return response.data.data
    } catch (err) {
        console.log(err);

    }
}

