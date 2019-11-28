<template>
    <section class="footer flex flex-col justify-center border-top">
        <div class="footer-content flex flex-col flex-between">
            <router-link to="/signin">Not a member yet ?</router-link>
            <div class="nav">
                <router-link to="/about">About</router-link> | 
                <router-link to="/about">Contact Us</router-link> | 
                <router-link to="/about">Help</router-link>
            </div>
            <small>Created With Love &copy; {{ new Date().getFullYear() }}</small>
        </div>
    </section>
</template>
