<template>
    <div @click="handleClick">
        <div class="newest-blog-block">
            <vs-row style="width: 100%;height: 100%;" vs-type="flex" vs-justify="space-around">
                <vs-col style="height: 100%;" vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">
                    <p style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                        博客标题博客标题博客标题
                    </p>
                </vs-col>
                <vs-col style="height: 100%;" vs-type="flex" vs-justify="center" vs-align="center" vs-w="4">
                    <vs-icon icon-pack="fa" icon="fa-calendar" color="red"></vs-icon>
                    <span style="margin-left: 5px;">2024-12-25</span>
                </vs-col>
            </vs-row>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        // 点击前往博客详情
        handleClick() {
            console.log("前往博客详情")
        }
    }
}
</script>

<style lang="less" scoped>
.newest-blog-block{
  width: 350px;
  height: 40px;
  position: relative;
  left: 50%;
  margin-left: -175px;
  transition: background-color 0.5s ease;
}
.newest-blog-block:hover{
  background-color: pink;
}
</style>