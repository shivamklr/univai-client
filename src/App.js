import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import "semantic-ui-css/semantic.min.css";

import "./App.css";
axios.defaults.baseURL = "http://localhost:4040";

function App() {
    return (
        <div className="App">
            <h1> Hey there</h1>
        </div>
    );
}

export default App;
