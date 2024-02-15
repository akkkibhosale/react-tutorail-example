import React from 'react';
import '../css/home.css';
import { Link } from 'react-router-dom';
const Home = () => {
  return <>
    <div class="container-fluid home-main">
      <h2>Hey<span class="blinker"> Developer.</span> Welcome</h2>
      <Link type="button" class="btn btn-success" to="/login">Login</Link>
    </div>
    <div class="container-fluid home-content1">
      <div class="row">
        <div class="col-md-6 content1-left">
          <h3>Why to use Bootstrap <span class="blinker">?</span></h3>
          <p>Build responsive, mobile-first projects on the web with the world’s most popular front-end component library.</p>
        </div>
        <div class="col-md-6 content1-right">
          <p>Bootstrap is an open source toolkit for developing with HTML, CSS, and JS. Quickly prototype your ideas or build your entire app with our Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful plugins built on jQuery.</p>
        </div>
      </div>
    </div>
    <div class="container-fluid home-content2">
      <p><span>News</span> and <span>announcements</span> for all things <span>Bootstrap</span>, including new <span>releases</span> and <span>Bootstrap Themes</span>.</p>
    </div></>
}

export default Home;


