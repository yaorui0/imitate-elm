<template>
    <div id="app">
        <a-header :seller="seller"></a-header>
        <div class="tab">
            <div class="tab-item">
                <router-link
                    to="/goods"
                    :class="{active:isActive=='one'}"
                    @click.native="activeOne"
                >商品</router-link>
            </div>
            <div class="tab-item">
                <router-link
                    to="/ratings"
                    :class="{active:isActive=='two'}"
                    @click.native="activeTwo"
                >评论</router-link>
            </div>
            <div class="tab-item">
                <router-link
                    to="/seller"
                    :class="{active:isActive=='three'}"
                    @click.native="activeThree"
                >商家</router-link>
            </div>
        </div>
        <router-view :seller="seller"></router-view>
    </div>
</template>

<style lang="scss">
#app .tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}
.tab .tab-item {
    flex: 1;
    text-align: center;
}
.tab-item > a {
    display: block;
    font-size: 14px;
    color: rgb(77, 85, 93);
}
.tab-item .active {
    color: red;
}
</style>

<script>
import aHeader from "@/components/aheader/aheader.vue";
export default {
    name: "app",
    components: {
        aHeader
    },
    data() {
        return {
            isActive: "one",
            seller: {}
        };
    },

    created() {
        // Mock.mock('/seller', 'get', getSeller);
        // Mock.mock('/goods', 'post', getGoods);
        // Mock.mock('/ratings', 'get', getRatings);
        this.$get('/seller').then(res=>{
          this.seller = res.data;
          console.log(this.seller);
        });

    },
    methods: {
        activeOne() {
            this.isActive = "one";
        },
        activeTwo() {
            this.isActive = "two";
        },
        activeThree() {
            this.isActive = "three";
        }
    }
};
</script>
