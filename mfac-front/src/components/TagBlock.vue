<template>
    <div @click="handleTagClick" style="width: 200px;height: 40px;border-radius: 10px;">
        <div class="tag-block" style="width: 200px;height: 40px;border-radius: 10px;">
            <vs-row style="height: 100%;border-radius: 10px;background-color: aqua;" vs-align="flex-end" vs-type="flex"
                vs-justify="space-between" vs-w="12">
                <vs-col style="height: 100%;
                    border-style: solid;border-left: 0px;border-top: 0px;border-bottom: 0px;border-color: white;"
                    vs-type="flex" vs-justify="center" vs-align="center" vs-w="9">
                    标签名称标签名称
                </vs-col>
                <vs-col style="height: 100%;" vs-type="flex" vs-justify="center" vs-align="center" vs-w="3">
                    1
                </vs-col>
            </vs-row>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        handleTagClick() {
            this.$emit('tag-click', 1)
            console.log(1111)
        }
    }
}
</script>

<style lang="less" scoped>
.tag-block {
    transition: color 0.3s ease, box-shadow 0.3s ease;
}

.tag-block:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>