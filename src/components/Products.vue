<template>
  <div class="products">
    <h3>商品列表</h3>
    <ul class="products-list">
      <li class="product" v-for="(product, index) in products">
        <article class="product-info">
          <p class="product-info__title" :title="product.title">
            <span class="product-info__badge" v-text="index + 1"></span>
            标题：<span>{{product.title}}</span>
          </p>
          <div class="product-info__saleinfo">
            <p class="product-info__detail">
              价格：
              <span class="product-info__price">{{product.price}}</span>
            </p>
            <p class="product-info__detail">
              库存：
              <span class="product-info__stock" :class="{'product-info__stock--nostock': !product.stock}">{{product.stock}}</span>
            </p>
          </div>
        </article>
        <div class="product__action">
          <button class="product__addtocart" :disabled="!product.stock" @click="addToCart(product)">添加至购物车</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  export default {
    computed: mapGetters({
      products: 'allProducts'
    }),
    methods: mapActions({
      addToCart: 'addToCart'
    }),
    mounted: function () {
      this.$store.dispatch('getAllProducts')
    }
  }
</script>

<style>
  .products{
    margin: 10px;
    position: relative;
    width: 400px;
    height: 600px;
    box-sizing: border-box;
    border: 1px solid #d8d8d8;
  }
  .products h3{
    margin: 0;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #71b7e6;
  }
  .products-list{
    position: absolute;
    margin: 0;
    padding-left: 0;
    top: 41px;
    bottom: 0;
    width: 100%;
    text-align: left;
    color: #777;
    overflow-y: auto;
  }
  .product{
    margin-bottom: 20px;
    list-style: none;
    border-bottom: 1px dashed #ebebeb;
  }
  .product-info{
    width: 60%;
    padding: 10px;
    display: inline-block;
    box-sizing: border-box;
  }
  .product-info__badge{
    display: inline-block;
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    border: 1px solid #71b7e6;
    border-radius: 50%;
    font-size: 12px;
    cursor: default;
  }
  .product-info__title{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .product-info__detail{
    display: inline-block;
  }
  .product-info__detail + .product-info__detail{
    margin-left: 10px;
  }
  .product-info__price{
    color: #E7E519;
  }
  .product-info__stock{
    color: #13D345;
  }
  .product-info__stock--nostock{
    color: #B8B8B8
  }
  .product__action{
    padding: 10px;
    display: inline-block;
  }
  button{
    padding: 10px 20px;
    background-color: transparent;
    outline: none;
    box-shadow: none;
    border: 1px solid #ebebeb;
    border-radius: 4px;
    color: #777;
    cursor: pointer;
    transition: background-color .3s ease, color .3s ease, border-color .3s ease;
    font-weight: 700;
  }
  .product__action button:hover{
    background-color: #47b2fb;
    color: #fff;
    border-color: #d8d8d8;
  }
  .product__action button:disabled{
    background-color: #ccc;
    color: #fff;
    border-color: #ccc;
    cursor: not-allowed;
  }
</style>
