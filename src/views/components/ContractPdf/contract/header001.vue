<template>
  <div style="display: flex;align-items: center;justify-content: space-between;margin-top: 10pt;">
    <div style="display: flex;align-items: center;margin-left: 26.0pt;">
<!--            <img :src="require('@/assets/image/contract/logo.png')" width="46pt" height="46pt" />-->
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1000 1000" width="46pt" height="46pt">
        <defs>
          <linearGradient id="yangshi" y1="500" x2="1000" y2="500" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#007cc4"/>
            <stop offset="1" stop-color="#006eb8"/>
          </linearGradient>
        </defs>
        <title>莫的问题-方形+圆形 - 副本</title>
        <rect class="cls-1" style="fill:url(#yangshi)" width="1000" height="1000" rx="500"/>
        <path class="cls-2" style="fill: #fff;"
              d="M462.18,281.64h-34.7V290H383.06v-8.32H243.21V290H198.79v-8.32h-50V251.79l11.1,5.9h38.87v-4.51l-.11-6.59h44.53v11.1H383.06v-4.51l-.06-6.59h44.48v11.1h47.19v24M461.83,415.93H362.24l24.63,15.62h76.35l11.1-5.9v26H359.81l-48.59-33-48.23,33H148.82V431.55h86.76l25-15.62H148.82V389.56l10.75,5.9h126v-5.21L279,383.66h51v11.8H474.32v20.47M463.57,294.82V379.5h-303V294.74ZM419.15,315.3H205v11.45H394.51v20.46c-3.55,0-1.67,0-5.08,0-2.78,0-5.33,0-7.41,0H205V359H419.15Z"
              transform="translate(0 0)"/>
        <path class="cls-2" style="fill: #fff;"
              d="M671.09,275.74V451.68H524.3V275.74h37.13l14.92-22.21,4.66-6.94h39.76l-16.31,29.15Zm-44.42,23.94H568.72v50.67h57.95Zm0,130.48V374.29H568.72v55.87ZM718.28,320.5H674.21l24.29-62.64-6.24-6.59H744l-4.51,12.15h110V451.68H773.11V422.53l10.76,5.55H805V287.36H731.12Z"
              transform="translate(0 0)"/>
        <path class="cls-2" style="fill: #fff;"
              d="M200.51,563.24V746.47H155.75V570.18l-6.25-6.94Zm72.88,16.31H229.32l-19.78-36.09-4.06-6.94h46.39Zm128.74,15.62V711.08H226.54V603.15l-4.86-8Zm-44.76,92v-68H271v68ZM465,745.78h-70.1V715.94l10.41,5.89h27.41V565.33H286.92v-24H477.09v204.4"
              transform="translate(0 0)"/>
        <path class="cls-2" style="fill: #fff;"
              d="M526.37,548.32l-4.86-6.59h160v84H526.37ZM669.34,701h-39.9v25.68H851.19v26.72a9.65,9.65,0,0,0-5.56-4.85,20.43,20.43,0,0,0-6.94-1.39H594l-34.7-25-2.09,25H525.68l5.89-73.57-6.24-6.6h38.52l-2.08,25,27.06,19.09V657.29H525.68V630.57l10.75,5.9H681.49v27.76a9.38,9.38,0,0,0-5.55-5.55,19.76,19.76,0,0,0-6.6-1.39h-39.9V678.8h52V701M614.86,593.44H568v11.1h71.84V562.9H568V574h59v19.44m223.48-24a9.56,9.56,0,0,0-5.2-5.2,17.74,17.74,0,0,0-6.6-1.39H795.31l-4.85,21.51h59.68l.35,85.72H814.4v-64.2h-85l.35,59.34,28.45-43L754,616h50l-70.1,103.76h-41.3l34.19-49.62H693.64V584.41h35.74v.35l1-.35h19.43l6.25-21.51H692.25V541.73H850.49ZM810.24,719.75l-43.73-44.42h37l6.75,6.94,39.9,37.48Z"
              transform="translate(0 0)"/>
        <circle class="cls-3" style="fill: #e50012;" cx="734.23" cy="374.29" r="45.81"/>
      </svg>
      <span style="font-size:10.0pt;color: #808080;margin-left: 12px;font-weight: bold; ">互联网+企业一站式服务平台</span>
    </div>
    <div style="display: flex;align-items: center;margin-right: 26.0pt;">
      <span style="font-size:10.0pt;color: #808080; ">合同编号：</span>
      <span style="font-size:10.0pt;color: #808080;">{{htNo}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      htNo: {
        type: String,
        default: ''
      }
    },
    name: 'header.vue'
  }
</script>

<style scoped>

</style>
