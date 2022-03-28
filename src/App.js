import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import About from './pages/About';
import Board from './pages/Board';
import WorldCorona from './pages/WorldCorona';
import Vaccine from './pages/Vaccine';
import React, { Component } from 'react';


class App extends Component {
    render() {
        return (
            <div className="app-root">
                <Router basename="/HJCorona">
                    <Navbar/>
                    <Routes className="pages">
                        <Route className="app-main" path='/' element={<WorldCorona/>}/>
                        <Route path='/about' element={<About/>}/>
                        <Route path='/board' element={<Board/>}/>
                        <Route path='/vaccine' element={<Vaccine/>}/>
                    </Routes>
                </Router>
            </div>
        );
    }
}

export default App;