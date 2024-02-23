import { VehicleEntity } from '@http-axios/http';
import express, { Request, Response } from 'express';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3001;

const app = express();

const vehicles: Array<VehicleEntity> = [
  {
    id: 1,
    year: 2009,
    make: 'Mazda',
    model: 'Mazda3',
    trim: 'AT'
  }
];

app.use(express.json());

app.get('/', (_: Request, res: Response<Array<VehicleEntity>>) => {
  res.json(vehicles);
});

app.get('/:id', (req: Request, res: Response<VehicleEntity>) => {
  const id = +req.params.id;
  const vehicle = vehicles.find(v => v.id == id);
  res.json(vehicle);
});

app.post('/', (req: Request<VehicleEntity>, res: Response<number>) => {
  const newVehicle: VehicleEntity = {...req.body, id: Math.max(...vehicles.map(x => x.id)) + 1};
  vehicles.push(newVehicle);
  res.status(201).json(newVehicle.id);
});

app.put('/:id', (req: Request<VehicleEntity>, res: Response) => {
  const id = +req.params.id;
  const request: VehicleEntity = req.body;
  const vehicle = vehicles.find(v => v.id === id);

  if (!vehicle) {
    return res.sendStatus(400);
  }
  
  vehicle.year = request.year;
  vehicle.make = request.make;
  vehicle.model = request.model;
  vehicle.trim = request.trim;
  
  res.sendStatus(200);
});

app.delete('/:id', (req: Request, res: Response) => {
  const id = +req.params.id;
  const vehicle = vehicles.find(v => v.id === id);

  if (!vehicle) {
    return res.sendStatus(400);
  }

  vehicles.splice(vehicles.indexOf(vehicle), 1);
  res.sendStatus(200);
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
