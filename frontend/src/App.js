import React  from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/home';
import Main from './Pages/main';
import TeacherMain from './Pages/teacher_main';
import Profile from './Pages/profile';
import ContactMe from './Pages/contact_me';
import Signin from './Pages/signin';
import Signup from './Pages/signup';
import Signup2 from './Pages/signup2';
import Signup3 from './Pages/signup3';
import AboutUs from './Pages/about_us';
import Teachers from './Pages/teachers';
import Students from './Pages/students';
import TeacherSelection from './Pages/teacher_selection';
import LearningFeedback from './Pages/learning_feedback';
import TeacherSearch from './Pages/teacher_search';
import Learnings from './Pages/learnings';
import Teachings from './Pages/teachings';
import injectContext from "./Store/app_context";

function App() {
    return (
        <div className='App'>
            <Routes>
                <Route index exact element={<Home/>} />
                <Route exact path="/home" element={<Main/>} />
                <Route exact path="/teacher_home" element={<TeacherMain/>} />
                <Route exact path="/profile" element={<Profile/>} />
                <Route exact path="/teachers" element={<Teachers/>} />
                <Route exact path="/teacher_search" element={<TeacherSearch/>} />
                <Route exact path="/teacher_selection/:teacher_id/:skill" element={<TeacherSelection />} />
                <Route exact path="/teacher_feedback/:learning_id" element={<LearningFeedback />} />
                <Route exact path="/learnings" element={<Learnings/>} />
                <Route exact path="/teachings" element={<Teachings/>} />
                <Route exact path="/students" element={<Students/>} />
                <Route exact path="/about_us" element={<AboutUs/>} />
                <Route exact path="/contact_me" element={<ContactMe/>} />
                <Route exact path="/signin" element={<Signin/>} />
                <Route exact path="/signup" element={<Signup/>} />
                <Route exact path="/signup2" element={<Signup2/>} />
                <Route exact path="/signup3" element={<Signup3/>} />
            </Routes>
        </div>
    );
}

export default injectContext(App); 
