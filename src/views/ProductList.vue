<template>
  <v-row v-if="!loading">
    <v-col>
      <v-chip label variant="text" prepend-icon="mdi-database-outline">
        {{ $t('Common.ProductCount', { count: productTotal }) }}
      </v-chip>
      <FilterMenu kind="product" :currentFilter="currentFilter" :currentSource="currentSource" @update:currentFilter="toggleProductFilter($event)" @update:currentSource="toggleProductSource($event)" />
      <OrderMenu kind="product" :currentOrder="currentOrder" @update:currentOrder="selectProductOrder($event)" />
    </v-col>
  </v-row>

  <v-row class="mt-0">
    <v-col v-for="product in productList" :key="product" cols="12" sm="6" md="4" xl="3">
      <ProductCard :product="product" elevation="1" height="100%" />
    </v-col>
  </v-row>

  <v-row v-if="loading">
    <v-col align="center">
      <v-progress-circular indeterminate :size="30" />
    </v-col>
  </v-row>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import api from '../services/api'
import constants from '../constants'
import utils from '../utils.js'

export default {
  components: {
    FilterMenu: defineAsyncComponent(() => import('../components/FilterMenu.vue')),
    OrderMenu: defineAsyncComponent(() => import('../components/OrderMenu.vue')),
    ProductCard: defineAsyncComponent(() => import('../components/ProductCard.vue')),
  },
  data() {
    return {
      // data
      productList: [],
      productTotal: null,
      productPage: 0,
      loading: false,
      // filter & order
      currentFilter: '',
      currentSource: '',
      currentOrder: constants.PRODUCT_ORDER_LIST[0].key,  // price_count
    }
  },
  computed: {
    getProductsParams() {
      let defaultParams = { order_by: this.currentOrder, page: this.productPage }
      if (this.currentFilter) {
        if (this.currentFilter === 'price_count_gte_1') {
          defaultParams['price_count__gte'] = 1
        } else if (this.currentFilter === 'price_count_0') {
          defaultParams['price_count'] = 0
        }
      }
      if (this.currentSource) {
        defaultParams['source'] = this.currentSource
      }
      return defaultParams
    },
  },
  watch: {
    $route (newRoute, oldRoute) { // only called when query changes to avoid having an API call when the path changes
      if (oldRoute.path === newRoute.path && JSON.stringify(oldRoute.query) !== JSON.stringify(newRoute.query)) {
        this.initProductList()
      }
    }
  },
  mounted() {
    this.currentFilter = this.$route.query[constants.FILTER_PARAM] || this.currentFilter
    this.currentSource = this.$route.query[constants.SOURCE_PARAM] || this.currentSource
    this.currentOrder = this.$route.query[constants.ORDER_PARAM] || this.currentOrder
    this.initProductList()
    // load more
    this.handleDebouncedScroll = utils.debounce(this.handleScroll, 100)
    window.addEventListener('scroll', this.handleDebouncedScroll)
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleDebouncedScroll)
  },
  methods: {
    initProductList() {
      this.productList = []
      this.productTotal = null
      this.productPage = 0
      this.getProducts()
    },
    getProducts() {
      if ((this.productTotal != null) && (this.productList.length >= this.productTotal)) return
      this.loading = true
      this.productPage += 1
      return api.getProducts(this.getProductsParams)
        .then((data) => {
          this.productList.push(...data.items)
          this.productTotal = data.total
          this.loading = false
        })
    },
    toggleProductFilter(filterKey) {
      this.currentFilter = (this.currentFilter !== filterKey) ? filterKey : ''
      this.$router.push({ query: { ...this.$route.query, [constants.FILTER_PARAM]: this.currentFilter } })
      // this.initProductList() will be called in watch $route
    },
    toggleProductSource(sourceKey) {
      this.currentSource = (this.currentSource !== sourceKey) ? sourceKey : ''
      this.$router.push({ query: { ...this.$route.query, [constants.SOURCE_PARAM]: this.currentSource } })
      // this.initProductList() will be called in watch $route
    },
    selectProductOrder(orderKey) {
      if (this.currentOrder !== orderKey) {
        this.currentOrder = orderKey
        this.$router.push({ query: { ...this.$route.query, [constants.ORDER_PARAM]: this.currentOrder } })
        // this.initProductList() will be called in watch $route
      }
    },
    handleScroll(event) {  // eslint-disable-line no-unused-vars
      if (utils.getDocumentScrollPercentage() > 90) {
        this.getProducts()
      }
    },
  }
}
</script>
