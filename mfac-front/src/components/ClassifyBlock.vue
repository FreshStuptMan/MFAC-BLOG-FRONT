<template>
    <div @click="handleClassifyClick" style="width: 200px;height: 40px;border-radius: 10px;">
        <div class="classify-block"
            style="width: 200px;height: 40px;border-radius: 10px;">
            <vs-row 
                :style="{ height: '100%', borderRadius: '10px', backgroundColor: classify.color }" vs-align="flex-end" vs-type="flex"
                vs-justify="space-between" vs-w="12">
                <vs-col style="height: 100%;
                    border-style: solid;border-left: 0px;border-top: 0px;border-bottom: 0px;border-color: white;"
                    vs-type="flex" vs-justify="center" vs-align="center" vs-w="9">
                    {{ classify.name }}
                </vs-col>
                <vs-col style="height: 100%;" vs-type="flex" vs-justify="center" vs-align="center" vs-w="3">
                    {{ classify.blogTotal }}
                </vs-col>
            </vs-row>
        </div>
    </div>
</template>

<script>
export default {
    props: ['classify'],
    methods: {
        handleClassifyClick() {
            this.$emit('classify-click', this.classify.id)
        }
    }
}
</script>

<style lang="less" scoped>
.classify-block{
  transition: color 0.3s ease, box-shadow 0.3s ease;
}
.classify-block:hover{
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>