<template>
  <div>
    <vs-tooltip style="float: left;" color="success" position="left" text="Tooltip default delay">
        <vs-button @click="handleTran" style="margin-left: 10px;" color="danger" type="line">
            <img style="float: left;width: 20px;height: 20px;margin-right: 10px;" src="https://www.bilibili.com/favicon.ico"/>
            b站
        </vs-button>
    </vs-tooltip>
  </div>
</template>

<script>
export default {
    methods: {
        // 跳转至目标页面
        handleTran() {
            console.log('跳转')
        }
    }
}
</script>

<style>

</style>