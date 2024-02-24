import { VehicleDto } from '@http-axios/http';
import {SubmitHandler, useForm} from 'react-hook-form';

export function Form() {
    const {register, handleSubmit} = useForm<VehicleDto>({
        // defaultValues: 
    });
    
    const onSubmit: SubmitHandler<VehicleDto> = (data) => {
        console.log(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('year')} type="number" />
            <input {...register('make')} type="text" />
            <input {...register('model')} type="text" />
            <input {...register('trim')} type="text" />
            <button type="submit">Submit</button>
        </form>
    );
}