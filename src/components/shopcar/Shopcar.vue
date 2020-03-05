<template>
    <div>
        <div class="shopcar">
            <div class="content" @click="toggleList">
                <div class="content-left">
                    <div class="logo-wrapper">
                        <div class="logo" :class="{'hightLight': totalCount>0}">
                            <span class="shopping" :class="{'hightLight': totalCount>0}"></span>
                        </div>
                        <div class="num" v-show="totalCount>0">{{totalCount}}</div>
                    </div>

                    <div class="price" :class="{'hight': totalCount>0}">￥{{totalPrice}}</div>
                    <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
                </div>
                <div class="content-right">
                    <div class="pay" :class="payClass">{{payDesc}}</div>
                </div>
            </div>
            <transition name="fold">
                <div class="shopcart-list" v-show="listShow">
                    <div class="list-header">
                        <h1 class="title">购物车</h1>
                        <span class="empty" @click="clear">清空</span>
                    </div>
                    <div class="list-content" ref="listContent">
                        <ul>
                            <li class="food" v-for="(food,index) in selectFoods" :key="index">
                                <span class="name">{{food.name}}</span>
                                <div class="price">
                                    <span>￥{{food.price*food.count}}</span>
                                </div>
                                <div class="cartcontrol-wrapper">
                                    <cartControl :food="food"></cartControl>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </transition>
        </div>
        <transition name="mask">
            <div class="list-mask" v-show="listShow" @click="hideList"></div>
        </transition>
    </div>
</template>
<style lang="scss">
.shopcar {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    width: 100%;
    height: 48px;
    .content {
        display: flex;
        background: #141d27;
        font-size: 0;
        color: rgba(255, 255, 255, 0.4);
        .content-left {
            flex: 1;
            .logo-wrapper {
                display: inline-block;
                position: relative;
                top: -10px;
                margin: 0 12px;
                padding: 6px;
                width: 56px;
                height: 56px;
                box-sizing: border-box;
                vertical-align: top;
                border-radius: 50%;
                background: #141d27;
                .logo {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    background: #2b343c;
                    line-height: 100%;
                    &.hightLight {
                        background: rgb(0, 160, 220);
                    }
                    .shopping {
                        display: inline-block;
                        width: 100%;
                        height: 100%;
                        background: url(./shop.png) no-repeat center center;
                        &.hightLight {
                            display: inline-block;
                            width: 100%;
                            height: 100%;
                            background: url(./car.png) no-repeat center center;
                        }
                    }
                }
            }
            .num {
                position: absolute;
                top: 0;
                right: 0;
                width: 24px;
                height: 16px;
                line-height: 16px;
                text-align: center;
                border-radius: 16px;
                font-size: 9px;
                font-weight: 700;
                color: #fff;
                background: rgb(240, 20, 20);
                box-shadow: 0 4px 8px 0 rbga(0, 0, 0, 0.4);
            }
            .price {
                display: inline-block;
                vertical-align: top;
                line-height: 24px;
                margin-top: 12px;
                box-sizing: border-box;
                padding-right: 12px;
                border-right: 1px solid rgba(255, 255, 255, 0.1);
                font-size: 16px;
                font-weight: 700;
                &.hight {
                    color: #fff;
                }
            }
            .desc {
                display: inline-block;
                vertical-align: top;
                line-height: 24px;
                margin: 12px 0 0 12px;
                font-size: 10px;
            }
        }
        .content-right {
            flex: 0 0 105px;
            width: 105px;
            .pay {
                height: 48px;
                line-height: 48px;
                text-align: center;
                font-size: 12px;
                font-weight: 700;
                background: #2b333b;
                &.enough {
                    background: #00b43c;
                    color: #fff;
                }
                &.notEnough {
                    background: #2b333b;
                }
            }
        }
    }
    .fold-enter {
        opacity: 1;
        transform: translate3d(0, -100%, 0);
    }
    .fold-enter-active {
        transition: all 1000s;
    }
    // .fold-enter-to, .fold-leave-to {
    //     transform: translate3d(0, 0, 0);
    // }
    .shopcart-list {
        position: absolute;
        left: 0;
        top: 0;
        z-index: -1;
        width: 100%;
        .list-header {
            height: 40px;
            line-height: 40px;
            padding: 0 18px;
            background: #f3f5f7;
            border-bottom: 1px solid rgba(7, 17, 27, 0.1);
            .title {
                float: left;
                font-size: 14px;
                color: rgb(7, 17, 27);
            }
            .empty {
                float: right;
                font-size: 12px;
                color: rgb(0, 160, 220);
            }
        }
        .list-content {
            padding: 0 18px;
            max-height: 217px;
            overflow: hidden;
            background: #fff;
            .food {
                position: relative;
                padding: 12px 0;
                box-sizing: border-box;
                border-bottom: 1px solid rgba(7, 17, 27, 0.1);
                &:last-child {
                    border-bottom: none;
                }
                .name {
                    line-height: 24px;
                    font-size: 14px;
                    color: rgb(7, 17, 27);
                }
                .price {
                    position: absolute;
                    right: 90px;
                    bottom: 12px;
                    line-height: 24px;
                    font-size: 14px;
                    font-weight: 700;
                    color: rgb(240, 20, 20);
                }
                .cartcontrol-wrapper {
                    position: relative;
                    right: 0;
                    bottom: 8px;
                }
            }
        }
    }
}
.list-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 40;
    backdrop-filter: blur(10px);
    &.mask-enter-to {
        background: rgba(7, 17, 27, 0);
    }
    &.mask-enter-active {
        transition: all 1000s;
    }
    &.mask-enter,
    &.mask-leave {
        background: rgba(7, 17, 27, 0.6);
    }
}
</style>
<script>
import cartControl from "@/components/cartControl/Carcontrol.vue";
import BScroll from "better-scroll";
export default {
    props: {
        selectFoods: {
            type: Array,
            default() {
                return [
                    {
                        price: 0,
                        count: 0
                    }
                ];
            }
        },
        deliveryPrice: {
            type: Number,
            default: 0
        },
        minPrice: {
            type: Number,
            default: 0
        }
    },
    components: {
        cartControl
    },
    data() {
        return {
            fold: true
        };
    },
    computed: {
        // 总价格计算
        totalPrice() {
            let total = 0;
            this.selectFoods.forEach(food => {
                total += food.price * food.count;
            });
            return total;
        },
        // 选中数量计算
        totalCount() {
            let count = 0;
            this.selectFoods.forEach(food => {
                count += food.count;
            });
            return count;
        },
        // 控制购物车底部结算按钮提示信息
        payDesc() {
            if (this.totalPrice === 0) {
                return `￥${this.minPrice}元起送`;
            } else if (this.totalPrice < this.minPrice) {
                let diff = this.minPrice - this.totalPrice;
                return `还差￥${diff}元起送`;
            } else {
                return "去结算";
            }
        },
        // 控制结算按钮样式
        payClass() {
            if (this.totalPrice < this.minPrice) {
                return "notEnough";
            } else {
                return "enough";
            }
        },
        // 显示隐藏购物车弹出弹框操作
        listShow() {
            if (!this.totalCount) {
                this.fold = true;
                return false;
            }
            let show = !this.fold;
            if (show) {
                this.$nextTick(() => {
                    if (!this.scroll) {
                        this.scroll = new BScroll(this.$refs.listContent, {
                            click: true
                        });
                    } else {
                        this.scroll.refresh();
                    }
                });
            }
            return show;
        }
    },
    methods: {
        // 若购物车内无商品，则点击无效
        toggleList() {
            if (!this.totalCount) {
                return;
            }
            this.fold = !this.fold;
        },
        hideList() {
            this.fold = true;
        },
        // 购物列表清空
        clear() {
            this.selectFoods.forEach(food => {
                food.count = 0;
            });
        }
    }
};
</script>