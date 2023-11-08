<template>
    <div class="footer">
        <div class="contain">
            <div class="col">
                <h1>Developers</h1>
                <ul>
                    <li>Mosh</li>
                    <li>Mike</li>
                    <li>John Smith</li>
                    <li>Jayed Ahsan</li>
                    <li>Jarif Kahn</li>
                </ul>
            </div>
            <div class="col">
                <h1>Creation</h1>
                <ul>
                    <li>Chat-bot</li>
                    <li>Social-site</li>
                    <li>Software</li>
                    <li>Games</li>
                    <li>News-blogs</li>
                </ul>
            </div>
            <div class="col">
                <h1>About</h1>
                <ul>
                    <li>Terms</li>
                    <li>Mission</li>
                    <li>Services</li>
                    <li>Education</li>
                    <li>Get in touch</li>
                </ul>
            </div>
            <div class="col">
                <h1>Website</h1>
                <ul>
                    <li>Codoxia</li>
                    <li>Codo Code</li>
                    <li>CodePotro</li>
                    <li>CodeRunner</li>
                    <li>Code-templates</li>
                    <li>CodeKhan</li>
                </ul>
            </div>
            <div class="col">
                <h1>Support</h1>
                <ul>
                    <li>Contact us</li>
                    <li>Send Email</li>
                    <li>Buy a phone</li>
                </ul>
            </div>
            <div class="col">
                <h1>Social</h1>
                <div class="body-footer">
                    <div class="social">
                        <a href="#"><i class="fab fa-facebook"></i></a>
                        <a href="#"><i class="fab fa-instagram"></i></a>
                        <a href="#"><i class="fab fa-twitter"></i></a>
                    </div>
            </div>
            </div>
            <div class="clearfix"></div>
            <footer class="foot">
                <p> Copyright © 2020 - All rights Reserved </p>
            </footer>
        </div>

        </div>  </template>
  
  <script>
  export default {
      name: 'BottomBar',
  };
  </script>
  
  <style scoped>
    /* FOOTER  */
    .footer {
    width: 100%;
    position: relative;
    height: auto;
    background-color: #090909;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .footer .col {
    width: 190px;
    height: auto;
    float: left;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    padding: 0px 20px 20px 20px;
  }
  .footer .col h1 {
    margin: 0;
    padding: 0;
    font-family: inherit;
    font-size: 12px;
    line-height: 17px;
    padding: 20px 0px 5px 0px;
    color: #71C9CE;
    font-weight: normal;
    text-transform: uppercase;
    letter-spacing: 0.250em;
  }
  .footer .col ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  .footer .col ul li {
    color: #999999;
    font-size: 14px;
    font-family: inherit;
    font-weight: bold;
    padding: 5px 0px 5px 0px;
    cursor: pointer;
    transition: .2s;
    -webkit-transition: .2s;
    -moz-transition: .2s;
  }
  .footer .body-footer .social{
    display: flex;
    gap: 15px;
    width: 100px;
  }

  .footer .body-footer .social a{
    color: white;
    }
  
  .footer .col ul li:hover {
    color: #ffffff;
    transition: .1s;
    -webkit-transition: .1s;
    -moz-transition: .1s;
  }
  .clearfix {
    clear: both;
  }

  .foot {
    border-top: 1px solid #e2e2e2;
  }

  .foot p{
    text-align: center;
    color: #999999;
    font-size: 10px;
  }
  </style>