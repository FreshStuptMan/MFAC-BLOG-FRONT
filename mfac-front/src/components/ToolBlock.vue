<template>
  <div>
    <vs-tooltip style="float: left;" :color="tool.color" position="left" :text="tool.description">
        <vs-button @click="handleTran" style="margin-left: 10px;" :color="tool.color" type="line">
            <img style="float: left;width: 20px;height: 20px;margin-right: 10px;" :src="tool.avatar"/>
            {{ tool.name }}
        </vs-button>
    </vs-tooltip>
  </div>
</template>

<script>
export default {
    props: ['tool'],
    methods: {
        // 跳转至目标页面
        handleTran() {
            window.open(this.tool.link, '_blank')
        }
    }
}
</script>

<style>

</style>