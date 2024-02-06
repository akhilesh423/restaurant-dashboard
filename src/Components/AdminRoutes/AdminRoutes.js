
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Signin from "../Signin/Signin.js"
import Signup from "../Signup/Signup.js"
import Content from "../Content/Content.js"
import Fooditems from '../Fooditems/Fooditem.js';


export default function AdminRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Content />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path='/items' element={<Fooditems />} />
            </Routes>
        </Router>
    );
}