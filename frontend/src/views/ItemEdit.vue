<template>
  <section class="item-edit-container">
    <form class="item-edit-form" ref="itemEdit">
      <table>
        <tbody>
          <tr>
            <td><label for="name">Item Name:</label></td>
            <td><input class="frame" name="name" v-model="newItem.name" /></td>
          </tr>
          <tr>
            <td><label name="description">Item description:</label></td>
            <td>
              <input class="frame" type="textarea" v-model="newItem.description"/>
            </td>
            <td><label name="description">Keywords:</label></td>
            <td>
              <input class="frame" type="text" v-model="newItem.keywords"/>
            </td>
          </tr>
          <tr>
            <td><label for="category">Category:</label></td>
            <td>
              <select class="frame" v-model="newItem.category" placeholder="Item category">
                <option label="Clothes" value="clothes"></option>
                <option label="Shoes" value="shoes"></option>
                <option label="Accessories" value="accessories"></option>
              </select>
            </td>
          </tr>
          <tr v-if="newItem.category !== 'shoes'">
            <td><label for="itemSize">Item Size:</label></td>
            <td>
              <select class="frame" name="itemSize" v-model="newItem.size" placeholder="Size">
                <option label="Small" value="S"></option>
                <option label="Medium" value="M"></option>
                <option label="Large" value="L"></option>
              </select>
            </td>
          </tr>
          <tr v-if="newItem.category === 'shoes'">
            <td><label>Shoe Size: </label></td>
            <td>
              <select class="frame" v-model="newItem.size" placeholder="Choose Size">
                <option v-for="shoeSize in shoeSizes" :key="shoeSize.idx" 
                        :value="shoeSize">{{ shoeSize }}</option>
              </select>
            </td>
          </tr>
          <tr>
            <td><label for="price">Price:</label></td>
            <td>
              <input class="frame" name="price" v-model.number="newItem.price"/>
            </td>
          </tr>
          <tr>
            <td><label>Item condition:</label></td>
            <td>
              <select class="frame" v-model="newItem.condition">
                <option value="Good as new">Good as new</option>
                <option value="Barely used">Barely used</option>
                <option value="Used">Used</option>
              </select>
            </td>
          </tr>
          <tr>
            <td><label> Upload your image:</label></td>
            <td><input class="frame" @change="uploadImg" type="file" /></td>
          </tr>
            <td></td>
            <button class="submit-btn btn" type="primary" @click.prevent="save">
                Save Item
            </button>
            <button class="reset-btn btn" @click.prevent="resetForm">
                Reset
            </button>
        </tbody>
      </table>
    </form>
  </section>
</template>

<script>
import UtilsService from '../services/UtilsService';
import ItemService from '../services/ItemService';

export default {
  name: 'item-edit',
  data() {
    return {
      labelPosition: 'top',
      newItem: {},
      shoeSizes: ['35-36', '36-37', '37-38', '38-39', '39-40', '40-41', '41-42', '43-44'],
      loggedInUser: null
    };
  },
  async created() {
    const itemId = this.$route.params.id;
    if (itemId) {
      let item = await ItemService.getById(itemId);
      this.newItem = JSON.parse(JSON.stringify(item));
    }
    else this.newItem = this.resetForm();
    this.loggedInUser = this.$store.getters.loggedInUser;
  },
  methods: {
    resetForm() {
      return {
        name: '',
        description: '',
        category: '',
        size: '',
        price: '',
        condition: '',
        imgUrl: ''
      };
    },
    async uploadImg(ev) {
      const newImgUrl = await UtilsService.uploadImg(ev);
      this.newItem.imgUrl = newImgUrl;
    },
    async save() {
      try {
        if (!this.newItem.imgUrl) throw 'image not uploaded';
        await this.$store.dispatch({
          type: 'saveItem',
          item: this.newItem,
          userId: this.loggedInUser._id
        });
        this.newItem = this.resetForm();
        this.$router.push(`/user/${this.loggedInUser._id}`);
      } catch (err) {
        console.error('COULD NOT SAVE/ EDIT ITEM ',err);
      }
    }
  }
};
</script>
