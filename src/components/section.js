import React from 'react';
import { Link } from 'react-router-dom';
import './section.css';

const Section = () => {
    return(
        <section id="banner">
            <div className="inner">
                <h1>HELLO: <span> 방문해주신 것을<br />
                        진심으로 환영합니다</span></h1>
                <ul className="actions">
                    <li>
                        <Link to="#" className="button alt">
                            Get Started
                        </Link>
                    </li>
                </ul>
            </div>
        </section>
    );

};

export default Section;