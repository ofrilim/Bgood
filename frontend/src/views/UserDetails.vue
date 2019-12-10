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
        <item-preview v-for="item in userItems" :key="item._id" :item="item" :buyerInfo="item.buyerInfo" @addToWishList="addToWishList(item._id)">
          <!-- <template v-if="itemsFilter !== 'available'" class="by" v-slot="buyerName"> -->
              <!-- <router-link :to="`/user/${item.buyerInfo._id}`">
              Ordered By: {{item.buyerInfo.fullName}}
              </router-link> -->
          <!-- </template> -->
            <button class="btn" v-if="itemsFilter === 'in process'" @click="approveSale(item)">
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
    return (this.user.ownItems.map(async item => {
      if (item.status === 'in process') this.incomingOrderCount++;
      if (item.buyer) {
        item.buyerInfo = await userService.getById(item.buyer)
      }
    }))
  },
  watch: {
    $route() {
      this.setUserById()
    }
  },
  methods: {
    addToWishList(itemId) { 
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
      const loggedInUserId = this.$store.getters.loggedInUser._id
      if (loggedInUserId) this.isLoggedInUser = (loggedInUserId === this.userId);
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
        
      // return this.user.ownItems.filter(async function (item) {
      //   if (item.buyer) item.buyerInfo = await userService.getById(item.buyer)
      //     console.log('user items items:', item);
      //   return item.status === this.itemsFilter
      //   });
    }
  },
  components: {
    ItemPreview
  }
};
</script>
