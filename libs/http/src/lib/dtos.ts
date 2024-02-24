// contains only required/essential fields for creating vehicle
export interface CreateVehicleDto {
    year: number;
    make: string;
    model: string;
    trim: string;
  }
  
  // this most likely be the same for get and update endpoints
  export interface VehicleDto extends CreateVehicleDto {
    id: number;
  }
  