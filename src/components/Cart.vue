<template>
  <div class="products cart">
    <div>
      <h3>
        你的购物车
        <span title="清空购物车" class="clear-cart fa fa-trash-o" @click="clearCart">&nbsp;</span>
      </h3>
    </div>
    <p v-show="!products.length" class="empty-placeholder">Empty Cart</p>
    <ul v-if="products.length" class="products-list">
      <li class="product" v-for="(product, index) in products">
        <article class="product-info">
          <p class="product-info__title" :title="product.title">
            <span class="product-info__badge" v-text="index + 1"></span>
            标题：<span>{{product.title}}</span>
          </p>
          <div class="product-info__saleinfo">
            <p class="product-info__detail">
              价格：￥<span>{{product.price}}</span>
            </p>
            <p class="product-info__detail">
              数量：<span>{{product.quantity}}</span>
            </p>
          </div>
        </article>
        <div class="product__action">
          <button @click="removeFromCart(product)">从购物车移除</button>
        </div>
      </li>
    </ul>
    <p class="total">
      商品总价:￥<span v-text="total">&nbsp;</span>
      <button @click="checkout(products)" :disabled="!products.length">结账</button>
      <span v-show="checkoutStatus" class="checkout-status" :class="checkoutStatus">{{checkoutStatus === 'success' ? '结账成功' : '结账失败'}}</span>
    </p>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  export default {
    computed: {
      ...mapGetters({
        products: 'cartProducts',
        checkoutStatus: 'checkoutStatus'
      }),
      total: function () {
        return this.products.reduce((total, product) => {
          return total + product.price * product.quantity
        }, 0).toFixed(2)
      }
    },
    methods: {
      ...mapActions(['removeFromCart']),
      checkout: function (products) {
        this.$store.dispatch('checkout', products)
      },
      clearCart: function () {
        this.products.forEach((product) => this.removeFromCart(product))
      }
    },
    mounted: function () {
      console.log(this)
    }
  }
</script>

<style>
  .cart{
    position: relative;
  }
  .cart .products-list{
    bottom: 30px;
  }
  .clear-cart{
    margin-left: 10px;
    color: #FC4747;
    transition: color .3s ease;
    cursor: pointer;
  }
  .clear-cart:hover{
    color: #EF0D0D;
  }
  .total{
    margin: 0;
    position: absolute;
    width: 100%;
    height: 30px;
    line-height: 30px;
    bottom: 0;
    text-align: center;
    background-color: #AEF6DB;
  }
  .empty-placeholder{
    margin: 0;
    font-size: 3em;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    text-shadow: 1px 3px #d8d;
    color: #d8d8d8;
  }
  .total button{
    padding: 5px 10px;
    border-color: #fff;
  }
  .total button:hover{
    background-color: #fb6362;
    color: #fff;
  }
  .checkout-status.success{
    color: #00cf9b;
  }
  .checkout-status.error{
    color: #fb6362;
  }
</style>
