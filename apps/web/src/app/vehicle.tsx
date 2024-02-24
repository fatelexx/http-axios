import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "./state/store";
import { getAll, remove } from "./state/slices/vehicle/thunks";
import { useEffect } from "react";

export function Vehicle() {
    const vehicles = useSelector((state: RootState) => state.vehicle.vehicles);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAll());
    }, [dispatch]);

    const onDelete = async (id: number) => {
        await dispatch(remove(id));
    }

    return (
    <div>
      <div>
        <button
          aria-label="Refresh"
          onClick={() => dispatch(getAll())}
        >
          Refresh
        </button>
        <table>
            <tbody>
                <tr>
                    <th>Id</th>
                    <th>Year</th>
                    <th>Make</th>
                    <th>Model</th>
                    <th>Trim</th>
                    <th>Actions</th>
                </tr>
                {vehicles.map(v => 
                    <tr key={v.id}>
                        <td>{v.id}</td>
                        <td>{v.year}</td>
                        <td>{v.make}</td>
                        <td>{v.model}</td>
                        <td>{v.trim}</td>
                        <td>
                            <button onClick={() => onDelete(v.id)}>Delete</button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
      </div>
    </div>
    )
}