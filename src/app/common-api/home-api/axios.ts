import axios, { AxiosRequestConfig } from "axios";

const commonPath = process.env.NEXT_PUBLIC_BADMINTON_API_QUEUE_PLAYER

export const axiosGet = async (path: string) => axios({
    method: 'get',
    baseURL: commonPath,
    url: path,
    headers : {
        'Content-Type': 'application/json',
    }
})

export const axiosPost = (path: string, body: any) => axios({
    method: 'post',
    baseURL: commonPath,
    url: path,
    data: body,
    headers : {
        'Content-Type': 'application/json',
    }
})

export const axiosPatch = (path: string, body: any) => axios({
    method: 'patch',
    baseURL: commonPath,
    url: path,
    data: body,
    headers : {
        'Content-Type': 'application/json',
    }
})

export const axiosDelete = (path: string) => axios({
    method: 'delete',
    baseURL: commonPath,
    url: path,
    headers : {
        'Content-Type': 'application/json',
    }
})


// export const axiosGet = 