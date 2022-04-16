import React from 'react';
import '../css/footer.css';

const Footer = () => {
    return (
        <section id="footer" style={{"padding": "0px"}}>
            <div className="inner">
                <header>
                    <h2>Get in Touch</h2>
                </header>
                <form method="post" action="#">
                    <div className="field half first">
                        <label for="name">Name</label>
                        <input type="text" name="name" id="name"/>
                    </div>
                    <div className="field half">
                        <label for="email">Email</label>
                        <input type="text" name="email" id="email"/>
                    </div>
                    <div className="field">
                        <label for="message">Message</label>
                        <textarea name="message" id="message" rows="6"></textarea>
                    </div>
                    <ul className="actions">
                        <li><input type="submit" value="Send Message" className="alt"/></li>
                    </ul>
                </form>
                <div className="copyright">
                    &copy;Github: <a href="https://github.com/Hyeong-Jun/HJCorona">
                        Hyeong Jun, Lee
                    </a>
                </div>
            </div>
        </section>

    );
};

export default Footer;