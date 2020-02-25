<template>
    <div id="app">
        <Header></Header>
        <div class="tab">
            <div class="tab-item">
                <router-link to="/goods">商品</router-link>
            </div>
            <div class="tab-item">
              <router-link to="/ratings">评论</router-link>
            </div>
            <div class="tab-item">
              <router-link to="/seller">商家</router-link>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<style lang="scss">
#app .tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
}
.tab .tab-item {
    flex: 1;
    text-align: center;
}
</style>

<script>
import Header from "@/components/header/Header.vue";
export default {
    name: "header",
    components: {
        Header
    }
};
</script>
