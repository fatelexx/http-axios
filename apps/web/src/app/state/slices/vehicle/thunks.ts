import { HttpService, IHttpService, VehicleDto } from "@http-axios/http";
import { createAsyncThunk } from "@reduxjs/toolkit";

const httpService: IHttpService = new HttpService();

export const getAll = createAsyncThunk(
    'vehicle/getAll',
    async () => {
        const response = await httpService.get<Array<VehicleDto>>('http://[::1]:3000/');
        return response;
    },
)

export const get = createAsyncThunk(
    'vehicle/get',
    async (id: number) => {
        const response = await httpService.get<VehicleDto>(`http://[::1]:3000/${id}`);
        return response;
    },
)

export const remove = createAsyncThunk(
    'vehicle/remove',
    async (id: number) => {
        await httpService.delete<undefined>(`http://[::1]:3000/${id}`);
        return id;
    },
)

export const create = createAsyncThunk(
    'vehicle/create',
    async (vehicle: VehicleDto) => {
        const result = await httpService.post<VehicleDto, number>(`http://[::1]:3000/`, vehicle);
        return result;
    },
)

export const update = createAsyncThunk(
    'vehicle/update',
    async (vehicle: VehicleDto) => {
        const result = await httpService.put<VehicleDto, undefined>(`http://[::1]:3000/${vehicle.id}`, vehicle);
        return result;
    },
)