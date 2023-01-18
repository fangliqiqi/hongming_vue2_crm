<template>
  <div class="yZF">
    云帐房 
    <!-- <iframe
      :src="content.goYZFUrl"
      width="100%"
      height="100%"
      scrolling="no"
      frameborder="0"
    ></iframe> -->
  <!-- <include :src="content.goYZFUrl"></include> -->
 </div>
</template>

<script>
import {
  circumscribedYZF //去往云帐房
} from "@/api/crm/yzf/yzf";
export default {
  name: "yZF",
    data() {
    return {
      content:{}
    };
  },
  created() {
    this.circumscribed();
  },
  methods: {
    circumscribed() {
      circumscribedYZF({ userId: 1 }).then(response => {
        this.content=response.data
        window.open(this.content.goYZFUrl,'yzf_name')
        // document.getElementById('yzfId').load(this.content.goYZFUrl,'_parent');
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.yZF{
    width: 100%;
    height: 100%;
}
</style>
