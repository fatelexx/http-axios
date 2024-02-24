import { CreateVehicleDto, VehicleDto, VehicleEntity } from '@http-axios/http';
import express, {Response, Request} from 'express';
import { DbService, MangoDbService } from './mangodb-service';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();
app.use(express.json());

const mangoDbService: DbService = new MangoDbService();

app.get('/', async (_, res: Response<Array<VehicleDto>>) => {
  const vehicles = await mangoDbService.getAll();
  const result = vehicles.map<VehicleDto>(v => <VehicleDto>{...v})
  res.send(result);
});

app.get('/:id', async (req: Request, res: Response<VehicleDto>) => {
  const id = +req.params.id;
  const vehicle = await mangoDbService.get(id);
  res.json(vehicle);
});

app.post('/', async (req: Request<CreateVehicleDto>, res: Response<number>) => {
  const createDto: CreateVehicleDto = req.body;
  const vehicle: VehicleEntity = {...createDto, id: undefined};
  const id = await mangoDbService.add(vehicle);
  res.status(201).json(id);
});

app.put('/:id', async (req: Request<VehicleDto>, res: Response) => {
  const id = +req.params.id;
  const vehicleDto: VehicleDto = req.body;
  const vehicle: VehicleEntity = {...vehicleDto, id};
  console.log(vehicle);
  await mangoDbService.update(vehicle);
  res.sendStatus(200);
});

app.delete('/:id', async (req: Request, res: Response) => {
  const id = +req.params.id;
  await mangoDbService.delete(id);
  res.sendStatus(200);
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
