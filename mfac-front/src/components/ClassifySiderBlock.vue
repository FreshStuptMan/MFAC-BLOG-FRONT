<template>
    <div>
        <vs-button @click="handleClick" style="margin-top: 5px;margin-left: 5px;height: 40px;" :color="info.color" type="filled">
            <div style="text-align: center;">
                <span style="font-size: 15px;">{{ info.name }}</span>
            </div>
        </vs-button>
    </div>
</template>

<script>
export default {
    props: ['info'],
    methods: {
        handleClick() {
            this.$router.push(`/Classify/${this.info.id}`)
        }
    }

}
</script>

<style lang="less" scoped>

</style>