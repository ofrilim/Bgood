<template>
  <section class="user-details grid" v-if="user">
    <section class="user-section">
      <div class="user-details-content flex flex-col flex-around">
        <img class="user-img" :src="user.imgUrl" />
        <h1>{{ user.firstName }}'s Boutique</h1>
        <section class="user-info">
          <h2><i class="fa fa-user"></i>{{ user.fullName }}</h2>
          <h2><i class="fa fa-envelope"></i>{{ user.email }}</h2>
        </section>
        <div class="btns">
          <router-link to="/item/edit" v-if="isLoggedInUser"><button class="btn">Add Item</button></router-link>
          <button class="btn" v-if="isLoggedInUser" @click="toggleIsEdit">
            Edit Picture
          </button>
          <button class="btn" v-else>Contact Me</button>
        </div>
      </div>
      <div v-if="isEdit">
        <label> Upload your image:</label>
        <input class="frame uploadImg-input" type="file" @change="uploadImg" />
        <button class="btn" @click="editUserImg">Save Picture</button>
      </div>
    </section>
    <section class="items-section">
      <div class="btns">
        <button autofocus class="btn" @click="itemsFilter = 'available'">
          Available Items
        </button>
        <button class="btn" @click="itemsFilter = 'in process'" 
          v-if="isLoggedInUser" :class="{ notification : incomingOrderCount }">
          Incoming Orders ( {{incomingOrderCount}} )
        </button>
        <span v-if="isNewIncoming && isLoggedInUser" class="icon-red badge bold"></span>
        <button class="btn" @click="itemsFilter = 'sold'" v-if="isLoggedInUser">
          Sold Items
        </button>
      </div>
      <section class="items grid">
        <item-preview v-for="item in userItems" :key="item._id" 
        :item="item" @addToWishList="addToWishList(item)">
          <td>
            <button class="btn btn-wide" v-if="itemsFilter === 'in process'" @click="approveSale(item)">
            Approve Sell
            </button>
          </td>
        </item-preview>
      </section>
    </section>
  </section>
</template>

<script>
import ItemPreview from '../components/ItemPreview.vue';
import UtilsService from '../services/UtilsService.js';
import userService from '../services/UserService.js';
import SocketService from '../services/SocketService';

export default {
  name: 'user-details',
  data() {
    return {
      userId: null,
      user: null,
      itemsFilter: 'available',
      msg: '',
      isEdit: false,
      incomingOrderCount: 0,
      isNewIncoming: false
    };
  },
  async created() {
    await this.setUserById()
    SocketService.setup();
    SocketService.on('BEMsg', msg => {
      this.isNewIncoming = true;
      console.log('USER DETAILS CMP, MSG ARRIVED FROM BE SOCKET: ', msg)
      console.log('USER DETAILS CMP, isnewIncoming', this.isNewIncoming)
    })
    return (this.user.ownItems.map(async item => {
      if (item.status === 'in process') this.incomingOrderCount++;
      if (item.buyer) {
        item.buyerInfo = await userService.getById(item.buyer)
      }
    }))
  },
  watch: {
    '$route'() {
      this.setUserById()
    }
  },
  methods: {
    addToWishList(item) { 
      this.$store.dispatch({ type:'setOnWishList', item });
    },
    async setUserById(){
      this.userId = this.$route.params.id;
      try {
        const tempUser = await userService.getById(this.userId);
        this.user = JSON.parse(JSON.stringify(tempUser));
      } catch (error) {
        console.error('USERDETAILS ERROR WHILE GETTING USERID: ', this.user, 'error:', error)
      }
    },
    async approveSale(item) {
      const soldItem = JSON.parse(JSON.stringify(item));
      soldItem.status = 'sold';
      try {
        await this.$store.dispatch({ type: 'saveItem', item: soldItem });
        this.$store.dispatch({ type: 'setMsg', msg: 'Item Sold!'});
        SocketService.emit('approveMsg', 'ITEM SUCCESSFULLY SOLD')
      } catch(error) {
        console.error('ERROR: USER DETAILS APPROVING SALE FAILED')
      }
    },
    async uploadImg(ev) {
      const imgUrl = await UtilsService.uploadImg(ev);
      this.user.imgUrl = imgUrl;
    },
    editUserImg() {
      if (!this.user.imgUrl) return;
      userService.update(this.user);
    },
    toggleIsEdit() {
      this.isEdit = !this.isEdit;
    }
  },
  computed: {
    userItems() {
      return this.user.ownItems.filter(item => item.status === this.itemsFilter)
    },
    loggedInUser(){
       return this.$store.getters.loggedInUser
    },
    isLoggedInUser(){
      if (!this.loggedInUser) return
      return (this.loggedInUser._id === this.userId)
    }
  },
  components: {
    ItemPreview
  }
};
</script>
