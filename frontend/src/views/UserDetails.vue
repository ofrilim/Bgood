<template>
    <section class="user-details grid" v-if="currUser">
        <!-- <h1>{{user.fullName}}'s Page</h1> -->
        <section class="user-section">
            <div class="user-details-content flex flex-col flex-around">
                <img class="user-img" :src="currUser.imgUrl"/>
                <button class="btn" v-if="isLoggedInUser" @click="toggleIsEdit">Edit Picture</button>
                <h1>{{currUser.firstName}}'s Boutique</h1>      
                <section class="user-info">
                    <h2><i class="fa fa-user"></i>{{currUser.fullName}}</h2>
                    <h2><i class="fa fa-envelope"></i>{{currUser.email}}</h2>
                </section>
                <div class="btns">
                    <router-link to='/item/edit'><button class="btn">Add Item</button></router-link>
                    <button class="btn">Contact Me</button>
                </div>
            </div>
            <div v-if="isEdit">
                <label> Upload your image:</label>
                <input class="frame uploadImg-input" type="file" @change="uploadImg">
                <button class="btn" @click="editUserImg">Save Picture</button>
            </div>
        </section>
        <section class="items-section">
            <!-- <h1>{{itemsFilter}} items:</h1> -->
            <div class="btns">
                <button class="btn" @click="itemsFilter = 'available'">Available Items</button>
                <!-- TODO: render order button only if user is loggedInUser -->
                <button class="btn" @click="itemsFilter = 'In process'" v-if="isLoggedInUser">Incoming Orders</button>
                <button class="btn" @click="itemsFilter = 'sold'">Sold Items</button>
            </div>
            <section class="items grid">
                <item-preview v-for="item in userItems" :key="item._id" :item="item">
                    <button class="btn" v-if="itemsFilter === 'In process'" @click="markAsSold(item)">Approve sell</button>
                </item-preview>
            </section>
            <h1 class="sold-msg" v-if="this.msg">{{msg}}</h1>
        </section>
    </section>
</template>

<script>
import ItemPreview from '../components/ItemPreview.vue'
import ItemService from '../services/ItemService.js'

export default {
    name: 'user-details',
    data(){
        return {
            userId: null,
            currUser: null,
            itemsFilter: 'available',
            msg: '',
            isLoggedInUser:false,
            isEdit: false,
        }
    },
    created(){
        this.loadPage()
    },
    // watch: {
    //     loadPage()
    // },
    methods:{
        async loadPage(){
            this.userId = this.$route.params.id
            await this.$store.dispatch({type: 'loadUser', userId: this.userId })
            this.currUser = JSON.parse(JSON.stringify(this.$store.getters.user))
            this.isLoggedInUser = (this.$store.getters.loggedInUser._id === this.userId)
        },
        async markAsSold(item){
            const soldItem = {...item}
            soldItem.status = 'sold'
            await this.$store.dispatch({type: 'saveItem', item: soldItem, user: this.user })
            // this.$store.dispatch({type: 'setMsg', msg: 'Item sold!!' })         
            this.msg = 'Item Sold!!'
            console.log('sold item - ', soldItem, 'user:', this.user);
        },
        async uploadImg(ev){
            const imgUrl = await ItemService.uploadImg(ev)
            console.log('img url:', imgUrl);
            this.currUser.imgUrl = imgUrl
        },
        async editUserImg(){
            if (!this.currUser.imgUrl) return
            await this.$store.dispatch({type: 'updateUser', user : this.currUser })
        },
        toggleIsEdit(){
            this.isEdit = !this.isEdit
        }
        
    },
    computed:{
        // user(){
        //     this.currUser = this.$store.getters.user
        //     console.log('user details user:', this.$store.getters.user);
        //     // return this.$store.getters.user
        // },
        userItems(){            
            return this.$store.getters.user.ownItems.filter(item => {
                return item.status === this.itemsFilter 
            })
        },
    },
    components:{
        ItemPreview
    },
}
</script>
