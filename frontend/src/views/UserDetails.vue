<template>
  <section class="user-details grid" v-if="user">
    <!-- <h1>{{user.fullName}}'s Page</h1> -->
    <section class="user-section">
      <div class="user-details-content flex flex-col flex-around">
        <img class="user-img" :src="user.imgUrl" />
        <h1>{{ user.firstName }}'s Boutique</h1>
        <section class="user-info">
          <h2><i class="fa fa-user"></i>{{ user.fullName }}</h2>
          <h2><i class="fa fa-envelope"></i>{{ user.email }}</h2>
        </section>
        <div class="btns">
          <router-link to="/item/edit" v-if="isLoggedInUser"
            ><button class="btn">Add Item</button></router-link
          >
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
      <!-- <h1>{{itemsFilter}} items:</h1> -->
      <div class="btns">
        <button autofocus class="btn" @click="itemsFilter = 'available' || 'in process'">
          Available Items
        </button>
        <!-- TODO: render order button only if user is loggedInUser -->
        <button
          class="btn"
          @click="itemsFilter = 'in process'" v-if="isLoggedInUser" :class="{ notification : incomingOrderCount }">
          Incoming Orders ( {{incomingOrderCount}} )
        </button>
        <button class="btn" @click="itemsFilter = 'sold'" v-if="isLoggedInUser">
          Sold Items
        </button>
      </div>
      <section class="items grid">
        <item-preview v-for="item in userItems" :key="item._id" :item="item" @addToWishList="addToWishList(item._id)">
          <button
            class="btn"
            v-if="itemsFilter === 'in process'"
            @click="approveSale(item)"
          >
            Approve sell
          </button>
        </item-preview>
      </section>
    </section>
  </section>
</template>

<script>
import ItemPreview from '../components/ItemPreview.vue';
import UtilsService from '../services/UtilsService.js';
import userService from '../services/UserService.js';

export default {
  name: 'user-details',
  data() {
    return {
      userId: null,
      user: null,
      itemsFilter: 'available',
      msg: '',
      isLoggedInUser: false,
      isEdit: false,
      incomingOrderCount: 0
    };
  },
  async created() {
    await this.setUserById()
    const orderedItem = this.user.ownItems.filter(item => item.status === 'in process')
    if (orderedItem) this.incomingOrderCount = orderedItem.length
    console.log('USER DETASILS ' ,orderedItem)
  },
  watch: {
    $route() {
      this.setUserById()
    }
  },
  methods: {
    addToWishList(itemId) { 
      console.log(itemId)   
      this.$store.dispatch('addToWishList', itemId);
    },
    async setUserById(){
      try {
        this.userId = this.$route.params.id;
        const tempUser = await userService.getById(this.userId);
        this.user = JSON.parse(JSON.stringify(tempUser));
        
      } catch (error) {
        console.log('USERDETAILS ERROR WHILE GETTING USERID: ', this.user)
      }
      const userIdFromStore = this.$store.getters.loggedInUser._id
      if (userIdFromStore) this.isLoggedInUser = userIdFromStore === this.userId;
    },
    async approveSale(item) {
      const soldItem = JSON.parse(JSON.stringify(item));
      soldItem.status = 'sold';
      try {
        await this.$store.dispatch({ type: 'saveItem', item: soldItem });
        this.$store.dispatch({ type: 'setMsg', msg: 'Item Sold!'});
      } catch(error) {
        console.log('ERROR: USER DETAILS APPROVING SALE FAILED')
      }
    },
    async uploadImg(ev) {
      const imgUrl = await UtilsService.uploadImg(ev);
      this.user.imgUrl = imgUrl;
    },
    async editUserImg() {
      if (!this.user.imgUrl) return;
      userService.update(this.user);
    },
    toggleIsEdit() {
      this.isEdit = !this.isEdit;
    }
  },
  computed: {
    userItems() {
      return this.user.ownItems.filter(item => item.status === this.itemsFilter);
    }
  },
  components: {
    ItemPreview
  }
};
</script>
