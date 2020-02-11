import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import Todolist from "./components/Todolist";

var destination = document.querySelector("#root")

ReactDOM.render(<Todolist />,destination)