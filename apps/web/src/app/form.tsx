import { VehicleDto } from '@http-axios/http';
import {SubmitHandler, useForm} from 'react-hook-form';
import { RootState, useAppDispatch } from './state/store';
import { create, update } from './state/slices/vehicle/thunks';
import { useSelector } from 'react-redux';
import { hideForm } from './state/slices/vehicle/slice';

export function Form() {
    const dispatch = useAppDispatch();
    const form = useSelector((state: RootState) => state.vehicle.form);
    const {register, handleSubmit} = useForm<VehicleDto>({
        defaultValues: form 
    });
    
    const onSubmit: SubmitHandler<VehicleDto> = async (data) => {
        if (form) {
            await dispatch(update({...data, id: form.id}));
        } else {
            await dispatch(create(data));
        }
        
        onCancel();
    }

    const onCancel = () => {
        dispatch(hideForm());
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('year')} type="number" /> <br />
            <input {...register('make')} type="text" /> <br />
            <input {...register('model')} type="text" /> <br />
            <input {...register('trim')} type="text" /> <br />
            <button type="submit">Submit</button>
            <button type="reset" onClick={onCancel}>Cancel</button>
        </form>
    );
}