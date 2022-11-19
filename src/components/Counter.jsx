import classes from "./Counter.module.css";
import { useSelector, useDispatch } from "react-redux";
import { counterActions } from "../store/counter";
import { useState } from "react";

const Counter = () => {
  // const [counterState, setCounterState] = useState(true);
  const [step, setStep] = useState(1);

  const toggleCounterHandler = () => {
    dispatchAction(counterActions.initializeCounter());
    setStep(1);
    dispatchAction(counterActions.toggle());
  };

  const stepChangeHandler = (event) => {
    setStep(event.target.value);
  };

  const counter = useSelector((state) => state.counter.counter);
  const counterState = useSelector((state) => state.counter.toggle);

  const dispatchAction = useDispatch();

  const handleIncrement = () => {
    dispatchAction(counterActions.increment({ step }));
  };

  const handleDecrement = () => {
    dispatchAction(counterActions.decrement({ step }));
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {counterState && <div className={classes.value}>{counter}</div>}
      {counterState && (
        <div>
          <label htmlFor="step">Step</label>
          <input
            id="step"
            type="number"
            value={step}
            onChange={stepChangeHandler}
          ></input>
        </div>
      )}
      {counterState && (
        <div>
          <button onClick={handleIncrement}>Increment</button>
          <button onClick={handleDecrement}>Decrement</button>
        </div>
      )}
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
