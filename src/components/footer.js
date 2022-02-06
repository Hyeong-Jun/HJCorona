import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';

const Footer = () =>{
    return (
        <footer id="footer">
            <div className="inner">
                <header>
                    <h2>Get in Touch</h2>
                </header>

                <table text-align="center">
                    <form method="post" action="#">
                        <tr>
                            <td>
                                <div className="field half first">
                                    <label for="name">Name</label>
                                    <input type="text" name="name" id="name" />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="field half">
                                    <label for="email">Email</label>
                                    <input type="text" name="email" id="email" />

                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="field">
                                    <label for="message">Message</label>
                                    <textarea name="message" id="message" rows="6"></textarea>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <ul className="submit">
                                    <li><input type="submit" value="Send Message" class="alt" /></li>
                                </ul>
                            </td>
                        </tr>
                    </form>
                </table>
                <div className="copyright">
                    <Link to = "https://github.com/Hyeong-Jun/WebProgramming1" target="_blank">
                        &copy; Github: Hyeong Jun, Lee
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;