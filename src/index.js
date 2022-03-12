import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import './assets/fonts/Poppins/Poppins-Medium.ttf';
import './assets/fonts/Poppins/Poppins-Regular.ttf';
import './assets/fonts/Poppins/Poppins-SemiBold.ttf';
import './assets/fonts/Poppins/Poppins-Bold.ttf';
import './assets/fonts/Poppins/Poppins-ExtraLight.ttf';
import './assets/fonts/Poppins/Poppins-Light.ttf';
import LandingPage from "./landing-page/landingPage";
import Home from "./dashboard/home/home";
import Detail from "./dashboard/details/detail";
import Steps from "./dashboard/steps/steps";
import History from "./dashboard/history/history";
import Feedback from "./dashboard/steps/feedback/feedback";
import Final from "./dashboard/steps/final/final";

import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById("root");
render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<LandingPage />}/>
            <Route path="home" element={<Home />} />
            <Route path="detail/id=:id" element={<Detail />} />
            <Route path="history" element={<History />} />
            <Route path="steps/id=:id&portion=:portion" element={<Steps />} />
            <Route path="steps/feedback/id=:id" element={<Feedback />} />
            <Route path="steps/final" element={<Final />} />
        </Routes>
    </BrowserRouter>,
    rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
