import { axiosDelete, axiosGet, axiosPatch, axiosPost } from "@/app/common-api/home-api/axios"
import { PlayerTeam } from "./model";

export const GetdataListQueues = async () => {
    try {
        const response =  await axiosGet('/')
        return response.data.data
    } catch (err) {
        console.log(err);
        
    }  
}

export const AddNewTeam = async (data: PlayerTeam) => {
    try {
        const response =  await axiosPost('/', data)
        return response.data.data
    } catch (err) {
        console.log(err);
        
    }  
}

export const UpdateTeamWin = async (id: string, data: {}) => {
    try {
        const response =  await axiosPatch(`/win/${id}`, data)
        return response.data.data
    } catch (err) {
        console.log(err);
        
    }  
}

export const DeleteTeam = async (id: string) => {
    try {
        const response =  await axiosDelete(`/delete/${id}`)
        return response.data.data
    } catch (err) {
        console.log(err);
        
    }  
}

export const DeleteAllData = async () => {
    try {
        const response =  await axiosDelete(`/deleteAll`)
        return response.data.data
    } catch (err) {
        console.log(err);
        
    }  
}



