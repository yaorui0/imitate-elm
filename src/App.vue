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
        <keep-alive><router-view :seller="seller"></router-view></keep-alive>
        
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
import { urlParse } from "@/common/js/until.js";
export default {
    name: "app",
    components: {
        aHeader
    },
    data() {
        return {
            isActive: "one",
            seller: {
                id: (() => {
                    let queryParam = urlParse();
                    return queryParam.id;
                })()
            }
        };
    },

    created() {
        // Mock.mock('/seller', 'get', getSeller);
        // Mock.mock('/goods', 'post', getGoods);
        // Mock.mock('/ratings', 'get', getRatings);
        // console.log(this.seller.id)
        this.$get(`/seller?id=${this.seller.id}`).then(res => {
            this.seller = res.data;
            this.seller = Object.assign({}, this.seller,res.data);
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
