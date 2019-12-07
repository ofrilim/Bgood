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
        <button class="btn" @click="itemsFilter = 'available'">
          Available Items
        </button>
        <!-- TODO: render order button only if user is loggedInUser -->
        <button
          class="btn"
          @click="itemsFilter = 'in process'"
          v-if="isLoggedInUser"
        >
          Incoming Orders
        </button>
        <button class="btn" @click="itemsFilter = 'sold'" v-if="isLoggedInUser">
          Sold Items
        </button>
      </div>
      <section class="items grid">
        <item-preview v-for="item in userItems" :key="item._id" :item="item">
          <button
            class="btn"
            v-if="itemsFilter === 'in process'"
            @click="markAsSold(item)"
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
      isEdit: false
    };
  },
  async created() {
    this.setUserById()
  },
  watch: {
    $route() {
      this.setUserById()
    }
  },
  methods: {
    async setUserById(){
      this.userId = this.$route.params.id;
      const tempUser = await userService.getById(this.userId);
      this.user = JSON.parse(JSON.stringify(tempUser));
      this.isLoggedInUser = this.$store.getters.loggedInUser._id === this.userId;
    },
    async markAsSold(item) {
      const soldItem = { ...item };
      soldItem.status = 'sold';
      await this.$store.dispatch({
        type: 'saveItem',
        item: soldItem,
        user: this.user
      });
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
      return this.user.ownItems.filter(
        item => item.status === this.itemsFilter
      );
    }
  },
  components: {
    ItemPreview
  }
};
</script>
