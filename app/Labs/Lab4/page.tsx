"use client"
import PassingFunctions from "./PassingFunctions";
import BooleanStateVariables from "./BooleanStateVariables";
import ClickEvent from "./ClickEvent";
import Counter from "./Counter";
import EventObject from "./EventObject";
import PassingDataOnEvent from "./PassingDataOnEvent";
import StringStateVariables from "./StringStateVariables";
import DateStateVariable from "./DateStateVariable";
import ObjectStateVariable from "./ObjectStateVariable";
import ReduxExamples from "./ReduxExamples/page";
import store from "./store";
import { Provider } from "react-redux";

export default function Lab4() {
  function sayHello() {
    alert("Hello");
  }
  return (
    <Provider store={store}>
    <div id="wd-passing-functions">
      <h2>Lab 4</h2>
      ...
      <PassingFunctions theFunction={sayHello} />
      <BooleanStateVariables/>
      <ClickEvent/>
      <Counter/>
      <EventObject/>
      <PassingDataOnEvent/>
      <StringStateVariables/>
      <DateStateVariable/>
      <ObjectStateVariable/>
      <ReduxExamples/>
    </div>
    </Provider>
);}
