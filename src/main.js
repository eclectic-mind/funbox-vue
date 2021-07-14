import * as data from './data.json';

const goods = data.goods;

const makeAdditionalClass = (isChosen, available) => {
    if (available === '0') return 'disabled';
    if (!!isChosen) return 'selected';
    else return '';
}

Vue.component('card', {

  props: ['product'],

  data () {
    return {
      mousesQuantity: this.product.mouses, 
      portionsQuantity: this.product.portions,
      isChosen: false
    }
  },

  template: '<div class="card" v-bind:class="{ selected: isChosen, disabled: product.available <= 0 }" v-on:click="choose">\
  <div class="inner">\
    <div class="content">\
      <p class="pre-name">Сказочное заморское яство</p>\
      <h3 class="product-name">Нямушка</h3>\
      <h4 class="ingredient">{{ product.ingredient }}</h4>\
      <p class="details">\
      <span class="portions"><strong>{{ product.portions }}</strong> {{ quantity }}</span>\
      <span v-if="product.mouses > 0" class="mouses"><strong v-if="product.mouses > 1">{{ product.mouses }}</strong> {{ gift }} в подарок</span>\
      <span v-if="product.comment.length > 0" class="comment">{{ product.comment }}</span>\
      </p>\
    </div>\
    <span class="weight">\
      <big>{{ product.weight }}</big> кг\
    </span>\
  </div>\
  <p v-if="!!isChosen && product.available > 0" class="description text-default">{{ product.description }}</p>\
  <p v-else-if="!isChosen && product.available > 0" class="description text-chosen">Чего сидишь? Порадуй котэ, <a href="/" v-on:click.stop.prevent="choose">купи.</a></p>\
  <p v-else="product.available <= 0" class="description text-out">Печалька, {{ product.ingredient }} закончился.</p>\
</div>',

computed: {

  quantity() {
    const lastChar = this.portionsQuantity[this.portionsQuantity.length - 1];
    const lastNumber = parseInt(lastChar, 10);
    if (lastNumber === 1) {
      return ' порция';
    } else if (lastNumber > 1 && lastNumber < 5) {
      return ' порции';
    } else {
      return ' порций';
    }
  },

  gift() {
    const lastChar = this.mousesQuantity[this.mousesQuantity.length - 1];
    const lastNumber = parseInt(lastChar, 10);
    if (lastNumber === 1) {
      return 'мышь';
    } else if (lastNumber > 1 && lastNumber < 5) {
      return ' мыши';
    } else {
      return ' мышей';
    }
  },

},

methods: {
  choose() {
    if (this.product.available > 0) {
    this.isChosen = !this.isChosen;
    } else return;
  }
}

});

const app = new Vue({
  
  el: '#app',

  data: {
    goods,
  }

})