<template>
    <section class="footer flex flex-col justify-center border-top center">
        <div class="footer-content flex flex-col flex-between">
            <div class="member">
                <router-link to="/signin">Not a member yet ?</router-link>
            </div>
            <div class="nav bold">
                <router-link to="/about">About</router-link> | 
                <router-link to="/signin">Become a Seller</router-link> |
                <router-link to="/">Contact Us</router-link>  
            </div>
            <small>Created With Love &copy; {{ new Date().getFullYear() }}</small>
        </div>
    </section>
</template>
