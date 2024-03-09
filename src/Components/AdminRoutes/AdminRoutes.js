import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Content = lazy(() => import('../Content/Content'));
const Signin = lazy(() => import('../Signin/Signin'));
const Signup = lazy(() => import('../Signup/Signup'));
const Fooditems = lazy(() => import('../Fooditems/Fooditems'));

export default function AdminRoutes() {
    return (
        <Router>
            <Suspense fallback={<div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>Loading...</div>}>
                <Routes>
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path='/' element={<Content />} />
                    <Route path='/items' element={<Fooditems />} />
                </Routes>
            </Suspense>
        </Router>
    );
}
