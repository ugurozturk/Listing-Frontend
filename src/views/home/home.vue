<template>
<div>
  <Card dis-hover>
    <Button @click="plus" type="primary">Sayı Arttır : {{ sayi }}</Button>
  </Card>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data: function () {
    return {
      test: '',
      sayi: 0
    }
  },
  methods: {
    plus: function () {
      let Self = this
      Self.sayi++
    }
  }
})
</script>
