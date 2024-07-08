<template>
    <div @click="handleClick">
        <div class="newest-blog-block">
            <vs-row style="width: 100%;height: 100%;" vs-type="flex" vs-justify="space-around">
                <vs-col style="height: 100%;" vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">
                    <p style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                        {{ blog.title }}
                    </p>
                </vs-col>
                <vs-col style="height: 100%;" vs-type="flex" vs-justify="center" vs-align="center" vs-w="4">
                    <vs-icon icon-pack="fa" icon="fa-calendar" color="red"></vs-icon>
                    <span style="margin-left: 5px;">{{ publishTime }}</span>
                </vs-col>
            </vs-row>
        </div>
    </div>
</template>

<script>
export default {
    props: ['blog'],
    computed: {
        publishTime() {
            const date = new Date(this.blog.publishTime);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so +1
            const day = String(date.getDate()).padStart(2, '0');
            return  `${year}-${month}-${day}`;
        }
    },
    methods: {
        // 点击前往博客详情
        handleClick() {
            this.$router.push(`/BlogDetail/${this.blog.id}`)
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