<template>
<nav>
      <div class="container">
        <div>
          <router-link to="/home"><img src="../assets/logovue.png" alt="logo"></router-link>
          <div class="menu" :class="{ 'nav-toggle': isNavToggled }">
            <ul>
              <li>
                <router-link to="/home">Accueil</router-link>
              </li>

              <li>
                <router-link to="/about">Homme</router-link>
              </li>

              <li>
                <router-link to="/about">Femme</router-link>
              </li>

              <li>
                <router-link to="/about">Catégories</router-link>
              </li>
            </ul>
              <form action="">
                <div class="search-icon">
                  <i class="fas fas fa-search"></i>
                </div>
                <input 
                  type="text"
                  class="search"
                  placeholder="Rechercher..."
                  >
                  <router-link to="/cart">
                    <button class="nav-btn">
                      <i class="fas fa-cart-plus"></i>
                    </button>
                  </router-link>
              </form>
          </div>
        </div>

        <div class="menu-btn" @click="toggleNav">
          <i class="fas fa-bars"></i>
        </div>
      </div>
    </nav>
</template>
  
  <script>
  export default {
      name: 'NavBar',
  };
  </script>
  
  <style scoped>
  nav{
    background: #090909;
    color: white;
    z-index: 99;
    position: relative;
  }
  
  nav a{
    text-decoration: none;
  }

  nav .container {
    max-width: 1150px;
    padding: 1em;
    margin: 0 auto;
  }  

  nav .container > div {
    display: grid;
    gap: 15px;
    grid-template-columns: 1fr 6fr;
    align-items: center;
  }

  nav .container img{
    width: 50px;
    height: 50px;
  }

  nav .menu, nav form, .footer, .watch {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  nav ul {
    list-style-type: none;
    padding: 0;
    display: inline-block;
  }

  nav ul li{
    display: inline-block;
    margin: 0 0.5em;
  }

  nav ul a{
    font-size: 0.8em;
    text-transform: uppercase;
    transition: 0.2s;
    color: white;
  }

  nav ul a:hover{
    color: rgb(80, 78, 78);
  }
  nav form {
    margin-right: 2em;
    display: flex;
    gap: 6px;
  }

  nav form input {
    background: rgba(128, 126, 126, 0.155);
    color: grey;
    width: 15em;
    padding: 0.5em 1em;
    border: none;
    outline: none;
  }

  nav form input::placeholder{
    color: grey;
  }

  .logo{
    width: 4em;
    display: inline-block;
  }

  .nav-btn{
    background: #71C9CE;
    margin-left: 5px;
    border-radius: 50%;
    border: none;
    outline: none;
    cursor: pointer;
    transition: 0.3s;
    font-size: 1em;
  }

  .nav-btn:hover{
    background: #090909;
  }

  nav .container .menu-btn {
    display: none;
  }

  #page-wrap {
    margin: auto;
    max-width: 800px;
  }

  @media screen and (max-width: 1000px) {
    nav .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    nav .container > div {
      grid-template-columns: 1fr;
    }

    nav .menu {
      flex-direction: column;
      align-items: flex-start;
      height: 0;
      overflow: hidden;
      transition: 0.7s;
    }

    nav ul li {
      display: block;
      margin: 0.5em 0;
    }

    nav ul li:nth-child(1){
      margin-top: 1.5em;
    }

    nav .container .menu-btn{
      display: inline-block;
      font-size: 1.4em;
      cursor: pointer;
    }

    nav .container .nav-toggle {
      height: 16em;
    }
    
  }

  @media screen and (max-width: 800px) {
    html{
      font-size: 14px;
    }
    .footer{
      flex-direction: column;
      margin-top: 3em;
    }
  }


  button {
    background-color: black;
    border: none;
    border-radius: 8px;
    color: white;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    outline: 0;
    padding: 16px;
  }
  </style>