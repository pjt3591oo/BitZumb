<template>
  <div class="price-condition-list">
   <h1>시장현황</h1>
   <table class="table table-bordered">
     <tbody>
       <tr>
        <th>구매/판매</th>
        <th>1코인당 가격</th>
        <th>코인수량</th>
       </tr>
       <tr class="buy" v-for="p in buiesPriceConditions">
           <td>구매</td>
           <td>{{p['priceCondition']}}</td>
           <td>{{p['coinCount']}}</td>
       </tr>
       <tr class="sell" v-for="p in sellsPriceConditions">
           <td>판매</td>
           <td>{{p['priceCondition']}}</td>
           <td>{{p['coinCount']}}</td>
       </tr>
      </tbody>
   </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    props: ['buiesPriceConditions','sellsPriceConditions' ]
}
</script>

<style scoped>
    table{
        width: 400px;
        text-align: center;
    }

    .price-condition-list{
        margin: auto;
    }

    .sell td{
        color: #0e7019;
    }
    .buy td{
        color: #f6742d;
    }
</style>