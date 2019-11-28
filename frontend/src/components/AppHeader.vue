<template>
    <section class="app-header border-bottom flex flex-between">
        <div class="left-nav bold">
          <router-link to="/"><h1 class="logo inline" title="Home Page">B-good</h1></router-link>
          <select class="select pointer">Categiries
            <option>Clothes</option>
            <option>Accessories</option>
            <option>Shoes</option>
          </select>
        </div>
        <div class="nav bold flex align-center">
          <input class="header-search border-bottom" type="text"/>
          <span class="search pointer"><i class="fa fa-search"></i></span>
            <router-link to="/item">Item App</router-link> | 
            <router-link to="/user/:id">SignIn</router-link> | 
            <router-link to="/" title="WishList">WishList</router-link>
          </div>
    </section>
</template>

