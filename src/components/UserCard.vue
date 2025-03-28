<template>
  <v-card
    :title="user.user_id"
    prepend-icon="mdi-account"
    data-name="user-card"
    @click="goToUser(user)"
  >
    <v-card-text>
      <v-row>
        <v-col :cols="hideActionMenuButton ? '12' : '11'">
          <PriceCountChip class="mr-1" :count="user.price_count" :withLabel="true" />
          <v-chip v-if="user.price_currency_count > 1" label size="small" density="comfortable" class="mr-1">
            <v-icon start icon="mdi-cash" />
            <span id="currency-count">{{ $t('Common.CurrencyCount', { count: user.price_currency_count }) }}</span>
          </v-chip>
          <LocationCountChip class="mr-1" :count="user.location_count" :withLabel="true" />
          <v-chip v-if="user.location_type_osm_country_count > 1" label size="small" density="comfortable" class="mr-1">
            <v-icon start icon="mdi-map-outline" />
            <span id="country-count">{{ $t('Common.CountryCount', { count: user.location_type_osm_country_count }) }}</span>
          </v-chip>
          <ProductCountChip v-if="user.product_count" class="mr-1" :count="user.product_count" :withLabel="true" />
          <ProofCountChip v-if="user.proof_count" class="mr-1" :count="user.proof_count" :withLabel="true" :to="getUserProofListUrl" />
        </v-col>
      </v-row>

      <UserActionMenuButton v-if="!hideActionMenuButton" :user="user" />
    </v-card-text>
  </v-card>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    PriceCountChip: defineAsyncComponent(() => import('../components/PriceCountChip.vue')),
    LocationCountChip: defineAsyncComponent(() => import('../components/LocationCountChip.vue')),
    ProductCountChip: defineAsyncComponent(() => import('../components/ProductCountChip.vue')),
    ProofCountChip: defineAsyncComponent(() => import('../components/ProofCountChip.vue')),
    UserActionMenuButton: defineAsyncComponent(() => import('../components/UserActionMenuButton.vue')),
  },
  props: {
    user: {
      type: Object,
      required: true
    },
    hideActionMenuButton: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    getUserProofListUrl() {
      return `/users/${this.user.user_id}/proofs`
    }
  },
  methods: {
    goToUser(user) {
      if (this.readonly) {
        return
      }
      this.$router.push({ path: `/users/${user.user_id}` })
    },
  }
}
</script>
