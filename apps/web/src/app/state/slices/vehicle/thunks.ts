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

export const remove = createAsyncThunk(
    'vehicle/remove',
    async (id: number) => {
        await httpService.delete<undefined>(`http://[::1]:3000/${id}`);
        return id;
    },
)