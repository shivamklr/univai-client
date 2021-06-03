import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import "semantic-ui-css/semantic.min.css";

import "./App.css";
import Student from "./pages/Student";
import Teacher from "./pages/Teacher";
import Test from "./pages/Test";

axios.defaults.baseURL = "http://localhost:4040";

function App() {
    return (
        <Router>
            <Route exact path="/student" component={Student} />
            <Route exact path="/teacher" component={Teacher} />
            <Route exact path="/teacher/:testId" component={Test} />
            <Route exact path="/student/:testId" component={Test} />
        </Router>
    );
}

export default App;
