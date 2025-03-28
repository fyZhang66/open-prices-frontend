<template>
  <v-card v-if="product" :id="'product_' + product.code" data-name="product-card">
    <v-container class="pa-2" :style="latestPrice ? 'position:relative;' : ''">
      <v-row v-if="product">
        <v-col class="pr-0" style="max-width:20%">
          <v-img v-if="product.image_url" :src="product.image_url" style="max-height:100px;" @click="goToProduct()" />
          <v-img v-if="!product.image_url" :src="productImageDefault" style="height:100px;width:100px;filter:invert(.9);" />
        </v-col>
        <v-col style="max-width:80%;">
          <h3 id="product-title" @click="goToProduct()">
            {{ getProductTitle() }}
          </h3>

          <p>
            <PriceCountChip class="mr-1" :count="product.price_count" @click="goToProduct()" />
            <span v-if="hasProductSource">
              <ProductBrands :productBrands="product.brands" :readonly="readonly" />
              <ProductQuantityChip class="mr-1" :productQuantity="product.product_quantity" :productQuantityUnit="product.product_quantity_unit" />
              <br v-if="!hideCategoriesAndLabels">
              <ProductCategoriesChip v-if="!hideCategoriesAndLabels" class="mr-1" :productCategories="product.categories_tags" />
              <ProductLabelsChip v-if="!hideCategoriesAndLabels" :productLabels="product.labels_tags" />
            </span>
            <ProductMissingChip v-else class="mr-1" />
            <br v-if="showProductBarcode || barcodeTooLong || barcodeInvalid || showProductSource">
            <ProductBarcodeChip v-if="showProductBarcode" :product="product" />
            <ProductBarcodeTooLongChip v-if="barcodeTooLong" :barcode="product.code" class="mr-1" />
            <ProductBarcodeInvalidChip v-if="barcodeInvalid" class="mr-1" />
            <ProductSourceChip v-if="showProductSource" :product="product" />
            <ProductActionMenuButton v-if="hasProductSource && !hideActionMenuButton" :product="product" />
          </p>
        </v-col>
      </v-row>
    </v-container>

    <v-divider v-if="latestPrice" />
    <v-container v-if="latestPrice" class="pa-2">
      <h4>{{ $t('ProductCard.LatestPrice') }}</h4>
      <PricePriceRow class="mt-0" :price="latestPrice" :productQuantity="product.product_quantity" :productQuantityUnit="product.product_quantity_unit" />
      <PriceFooterRow :price="latestPrice" />
    </v-container>
  </v-card>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import utils from '../utils.js'

export default {
  components: {
    PriceCountChip: defineAsyncComponent(() => import('../components/PriceCountChip.vue')),
    ProductBrands: defineAsyncComponent(() => import('../components/ProductBrands.vue')),
    ProductQuantityChip: defineAsyncComponent(() => import('../components/ProductQuantityChip.vue')),
    ProductCategoriesChip: defineAsyncComponent(() => import('../components/ProductCategoriesChip.vue')),
    ProductLabelsChip: defineAsyncComponent(() => import('../components/ProductLabelsChip.vue')),
    ProductMissingChip: defineAsyncComponent(() => import('../components/ProductMissingChip.vue')),
    ProductBarcodeChip: defineAsyncComponent(() => import('../components/ProductBarcodeChip.vue')),
    ProductBarcodeTooLongChip: defineAsyncComponent(() => import('../components/ProductBarcodeTooLongChip.vue')),
    ProductBarcodeInvalidChip: defineAsyncComponent(() => import('../components/ProductBarcodeInvalidChip.vue')),
    ProductSourceChip: defineAsyncComponent(() => import('../components/ProductSourceChip.vue')),
    ProductActionMenuButton: defineAsyncComponent(() => import('../components/ProductActionMenuButton.vue')),
    PricePriceRow: defineAsyncComponent(() => import('../components/PricePriceRow.vue')),
    PriceFooterRow: defineAsyncComponent(() => import('../components/PriceFooterRow.vue')),
  },
  props: {
    product: {
      type: Object,
      default: null
    },
    latestPrice: {
      type: Object,
      default: null
    },
    hideCategoriesAndLabels: {
      type: Boolean,
      default: false
    },
    hideProductBarcode: {
      type: Boolean,
      default: true
    },
    hideActionMenuButton: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      productImageDefault: 'https://world.openfoodfacts.org/images/icons/dist/packaging.svg',
    }
  },
  computed: {
    ...mapStores(useAppStore),
    hasProductName() {
      return !!this.product.product_name
    },
    hasProductSource() {
      return !!this.product.source
    },
    hasProductBrands() {
      return !!this.product.brands
    },
    hasProductQuantity() {
      return !!this.product.product_quantity
    },
    showProductBarcode() {
      return !this.hideProductBarcode || this.appStore.user.username && this.appStore.user.product_display_barcode
    },
    barcodeTooLong() {
      return this.product.code && utils.isBarcodeTooLong(this.product.code)
    },
    barcodeInvalid() {
      return this.product.code && !utils.isBarcodeValid(this.product.code)
    },
    showProductSource() {
      return this.appStore.user.username && this.appStore.user.product_display_source
    },
  },
  methods: {
    getProductTitle() {
      return this.product.product_name || this.product.code
    },
    goToProduct() {
      if (this.readonly) {
        return
      }
      this.$router.push({ path: `/products/${this.product.code}` })
    },
  }
}
</script>
