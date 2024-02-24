import { HttpService, IHttpService, VehicleEntity } from "@http-axios/http";

export interface DbService {
    getAll(): Promise<Array<VehicleEntity>>;
    get(id: number): Promise<VehicleEntity>;
    add(vehicle: VehicleEntity): Promise<number>;
    update(vehicle: VehicleEntity): Promise<void>;
    delete(id: number): Promise<void>;
}

export class MangoDbService implements DbService {
    httpService: IHttpService = new HttpService();

    async getAll(): Promise<VehicleEntity[]> {
        const result = await this.httpService.get<VehicleEntity[]>('http://localhost:3001/');
        return result;
    }
    async get(id: number): Promise<VehicleEntity> {
        const result = await this.httpService.get<VehicleEntity>(`http://localhost:3001/${id}`);
        return result;
    }
    async add(vehicle: VehicleEntity): Promise<number> {
        const result = await this.httpService.post<VehicleEntity, number>('http://localhost:3001/', vehicle);
        return result;
    }
    async update(vehicle: VehicleEntity): Promise<void> {
        await this.httpService.put<VehicleEntity, undefined>(`http://localhost:3001/`, vehicle);
    }
    async delete(id: number): Promise<void> {
        await this.httpService.delete<undefined>(`http://localhost:3001/${id}`);
    }
}