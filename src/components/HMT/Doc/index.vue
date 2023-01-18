<template>
  <div>
    <svg-icon icon-class="question" @click="goto"/>
  </div>
</template>

<script>
export default {
  name: 'HMTDoc',
  data() {
    return {
      url: 'http://www.modewenti.com'
    }
  },
  methods: {
    goto() {
      window.open(this.url)
    }
  }
}
</script>
