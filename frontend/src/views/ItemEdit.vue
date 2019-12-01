<template>
    <section class="item-edit-container">

    <!-- <div style="margin: 20px;"></div> -->
        <form class="item-edit-form" ref="itemEdit" @click.prevent>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <label for="name">Item Name:</label>
                        </td>
                        <td>
                            <input class="frame" name="name" v-model="newItem.name">
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label name="description">Item description:</label>
                        </td>
                        <td>
                            <input class="frame" type="textarea" v-model="newItem.description">
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label for="category">Category:</label>
                        </td>
                        <td>
                            <select class="frame" v-model="newItem.category" placeholder="Item category">
                                <option label="Clothes" value="clothes"></option>
                                <option label="Shoes" value="shoes"></option>
                                <option label="Accessories" value="accessories"></option>
                            </select>
                        </td>
                    </tr>
                    <tr v-if="newItem.category !== 'shoes'">
                        <td>
                            <label for="itemSize">Item Size:</label>
                        </td>
                        <td>
                            <select class="frame" name="itemSize" v-model="newItem.size" placeholder="size">
                                <option label="Small" value="S"></option>
                                <option label="Medium" value="M"></option>
                                <option label="Large" value="L"></option>
                            </select>
                        </td>
                    </tr>
                    <tr v-if="newItem.category === 'shoes'">
                        <td>
                            <label>Shoe Size</label>
                        </td>
                        <td>
                            <input type="number" class="frame" min="32" max="43" v-model="newItem.size" >
                            <!-- <select class="frame" v-model="newItem.shoeSize" placeholder="Choose Size" min="30" max="43">
                                <option v-for='32 in 43' :key='value'>{{value}}</option>
                                <option v-for="32 in 43" key="value">{{value}}</option>
                            </select> -->
                        </td>
                    </tr>     
                    <tr>
                        <td>
                            <label for="price">Price:</label>
                        </td>
                        <td>
                            <input class="frame" name="price" v-model.number="newItem.price">
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Item condition:</label>
                        </td>
                        <td>
                            <select class="frame" v-model="newItem.condition">
                                <option value="Good as new">Good as new</option>
                                <option value="Barely used">Barely used</option>
                                <option value="Used">Used</option>
                            </select>
                        </td>
                    </tr>
                    <button class="submit-btn btn" type="primary" @click="submitForm">Save Item</button>
                    <button class="reset-btn btn" @click="resetForm">Reset</button>
                </tbody>
            </table>
        </form>
    </section>
</template>

// {
//     "_id": "2521",
//     "name": "molestie odio",**
//     "category": "shoes",
//     "price": 44, 
//     "size": "S",
//     "condition": "Good as new",
//     "wishCount": 5,
//     "description": "amet facilisis nec magna non risus tortor",
//     "createdAt" : 1574857047314,
//     "imgUrl": "https://i.pinimg.com/564x/d3/c4/98/d3c498b00aea193def129af9b2a868b1.jpg",
//     "status": "available",
//     "owner": {
//         "_id": "2386",
//         "name": "Melody",
//         "imgUrl": "https://api.adorable.io/avatars/100/Travis@adorable.png"
//     }
//     }
<script>
import ItemService from '../services/ItemService.js'
  export default {
    name: 'item-edit',
    data() {
        return {
        labelPosition: 'top',
        newItem: {},
        }
    },
    methods: {
        async getCurrItem(){
            const itemId = this.$route.params.id;
            let item = null;
            if (itemId) {
                this.$store.commit({type: 'setCurrItem', itemId})
                item = await ItemService.getById(itemId)
            // console.log('item:', item);
            }
            this.newItem = JSON.parse(JSON.stringify(item));
            // console.log('New Item:', this.newItem);
        },
        resetForm() {
            this.newItem = {
                name: '',
                description: '',
                category: '',
                size: '',
                price: '',
                condition: '',
            }
        },

        async submitForm(){
            const item = await this.$store.dispatch({type: 'saveItem', item: this.newItem});
            this.resetForm();
            // console.log('new item after service is:', item);
            this.$router.push(`/item/${item._id}`)
        },
    },
    created(){
        this.getCurrItem();
    },
    // TODO: need to check the relevance of watch
    // watch:{
    //     '$route.params.id'() {
    //         this.newItem = {...this.item()}
    //         console.log(this.newItem);
    //     }
    // }
  }
</script>