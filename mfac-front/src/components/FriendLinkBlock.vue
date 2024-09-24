<template>
    <div>
        <vs-card style="width: 280px;height: 200px;margin-left: 15px;" actionable>
            <div slot="header">
                <div style="display: flex;">
                    <img style="width: 25px;height: 25px;"
                        :src="FriendLink.avatar">
                    <h3 style="margin-left: 5px;">
                        {{FriendLink.name}}
                    </h3>
                </div>
            </div>
            <div>
                <span>作者：{{ FriendLink.author }}</span><br><br>
                <span>描述：{{ FriendLink.description }}</span>
            </div>
        </vs-card>
    </div>
</template>

<script>
export default {
    props: ['FriendLink']
}
</script>

<style></style>