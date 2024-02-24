import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { decrement, increment } from "../vehicle-slice";

export function Vehicle() {
    const count = useSelector((state: RootState) => state.vehicle.value);
    const dispatch = useDispatch();

    return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
    )
}