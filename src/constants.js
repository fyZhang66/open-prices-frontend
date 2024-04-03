export default {
  APP_NAME: 'Open Prices',
  OFF_NAME: 'Open Food Facts',
  OFF_URL: 'https://world.openfoodfacts.org',
  OFF_WIKI_URL: 'https://wiki.openfoodfacts.org/Main_Page',
  OFF_WIKI_APP_URL: 'https://wiki.openfoodfacts.org/Project:Open-Prices',
  OFF_WIKI_GDPR_REQUEST_URL: 'https://wiki.openfoodfacts.org/GDPR_request',
  OBF_NAME: 'Open Beauty Facts',
  OPFF_NAME: 'Open Pet Food Facts',
  OPF_NAME: 'Open Products Facts',
  PRODUCT_QUANTITY_UNIT_G: 'g',
  PRODUCT_QUANTITY_UNIT_ML: 'ml',
  FILTER_PARAM: 'filter',
  PRODUCT_FILTER_LIST: [
    { key: 'hide_price_count_gte_1', value: 'FilterProductWithPriceCountHide' },
  ],
  PRICE_FILTER_LIST: [
    { key: 'only_last_30d', value: 'FilterPriceMoreThan30DaysHide' },
  ],
  ORDER_PARAM: 'order',
  PRODUCT_ORDER_LIST: [
    { key: '-unique_scans_n', value: 'OrderProductUniqueScansDESC', icon: 'mdi-barcode-scan' },
    { key: '-price_count', value: 'OrderProductPriceCountDESC', icon: 'mdi-tag-multiple-outline' },
  ],
  PRICE_ORDER_LIST: [
    { key: 'price', value: 'OrderPriceASC', icon: 'mdi-order-numeric-ascending' },
    { key: '-date', value: 'OrderPriceDateDESC', icon: 'mdi-calendar' },
    { key: '-created', value: 'OrderPriceCreatedDESC', icon: 'mdi-clock-outline' },
  ],
  OSM_NAME: 'OpenStreetMap',
  OSM_URL: 'https://www.openstreetmap.org',
  // https://wiki.openstreetmap.org/wiki/Key:place
  // https://wiki.openstreetmap.org/wiki/Key:highway
  // https://wiki.openstreetmap.org/wiki/Buildings
  NOMINATIM_RESULT_TYPE_EXCLUDE_LIST: [
    'country', 'state', 'region', 'province', 'district', 'county', 'municipality', 'city', 'borough', 'suburb', 'quarter', 'neighbourhood', 'block', 'city_block', 'plot', 'town', 'village', 'hamlet', 'isolated_dwelling', 'allotments',
    'continent', 'archipelago', 'island', 'islet', 'square', 'locality', 'polder', 'sea', 'ocean',
    'administrative', 'state_district',
    'motorway', 'trunk', 'primary', 'secondary', 'tertiary', 'unclassified', 'residential', 'living_street', 'service', 'pedestrian', 'track', 'road', 'footway',
    'apartments', 'barracks', 'bungalow', 'cabin', 'detached', 'dormitory', 'ger', 'house', 'houseboat', 'residential',  // 'farm', 'hotel'
    'fuel', 'gas', 'casino', 'parking', 'parking_space', 'charging_station', 'atm',
    'car_sharing',
  ],
}
