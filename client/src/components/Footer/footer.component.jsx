import React from 'react';
import './styles.scss'
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer section footer-classic context-dark bg-image" >
            <div className="container">
                <div className="row row-30">
                    <div className="col-md-4 col-xl-5">
                        <div className="pr-xl-4"><a className="brand" href="index.html"><img
                            className="brand-logo-light" src="images/agency/logo-inverse-140x37.png" alt="" width="140"
                            height="37" srcSet="images/agency/logo-retina-inverse-280x74.png 2x"/></a>
                            <p>COMMUNITY – социальная платформа для вашего общения и поиска новых связей! Объявления аренды, знакомства и интересные новости для тебя.</p>
                            <p className="rights"><span>©  </span><span
                                className="copyright-year">2020</span><span> </span><span>COMMUNITY LLC</span><span>. </span><span>Все права защищены.</span>
                            </p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <h5>Контакты</h5>
                        <dl className="contact-list">
                            <dt>Адрес редакции:</dt>
                            <dd>101000, Москва, Мясницкая ул., 11 </dd>
                        </dl>
                        <dl className="contact-list">
                            <dt>Email:</dt>
                            <dd><a href="mailto:brgmn@icloud.com">brgmn@icloud.com</a></dd>
                        </dl>
                        {/*<dl className="contact-list">*/}
                        {/*    <dt>phones:</dt>*/}
                        {/*    <dd><a href="tel:#">https://karosearch.com</a> <span>or</span> <a*/}
                        {/*        href="tel:#">https://karosearch.com</a>*/}
                        {/*    </dd>*/}
                        {/*</dl>*/}
                    </div>
                    <div className="col-md-4 col-xl-3">
                        <h5>Категории</h5>
                        <ul className="nav-list">
                            <li><Link to={'/rent'}>Аренда</Link></li>
                            <li><Link to={'/dating'}>Знакомства</Link></li>
                            <li><Link to={'/news'}>Новости</Link></li>
                            {/*<li><Link to={'/questions'}>Вопросы и ответы</Link></li>*/}
                            {/*<li><Link to={'/shop'}>Магазин</Link></li>*/}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="row no-gutters social-container" style={{pointerEvents: 'none'}}>
                <div className="col"><a className="social-inner" href="#"><span
                    className="icon mdi mdi-facebook"></span><span>Facebook</span></a></div>
                <div className="col"><a className="social-inner" href="#"><span
                    className="icon mdi mdi-instagram"></span><span>instagram</span></a></div>
                <div className="col"><a className="social-inner" href="#"><span className="icon mdi mdi-twitter"></span><span>twitter</span></a>
                </div>
                <div className="col"><a className="social-inner" href="#"><span
                    className="icon mdi mdi-youtube-play"></span><span>google</span></a></div>
            </div>
        </footer>
    );
};

export default Footer;
