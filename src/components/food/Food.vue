<template>
    <div>
        <transition name="move">
            <div v-show="showFlag" class="food" ref="foodContent">
                <div class="food-content">
                    <div class="img-header">
                        <img :src="food.image" alt />
                        <div class="back" @click="back">
                            <i class="arrow-left"></i>
                        </div>
                    </div>
                    <div class="content">
                        <h1 class="title">{{food.name}}</h1>
                        <div class="detail">
                            <span class="sell-count">月售{{food.sellCount}}</span>
                            <span class="rting">好评{{food.rating}}%</span>
                        </div>
                        <div class="price">
                            <span class="now">￥{{food.price}}</span>
                            <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                        </div>
                        <div class="cartcontrol-wrapper">
                            <cartControl :food="food"></cartControl>
                        </div>
                        <transition name="fade">
                            <div
                                @click.stop="addFirst"
                                class="buy"
                                v-show="!food.count || food.count===0"
                            >加入购物车</div>
                        </transition>
                    </div>
                    <split v-show="food.info"></split>
                    <div class="info" v-show="food.info">
                        <h1 class="title">商品信息</h1>
                        <p class="text">{{food.info}}</p>
                    </div>
                    <split v-show="food.info"></split>
                    <div class="rating">
                        <h1 class="title">商品评价</h1>
                        <ratingSelect
                            :selectType="selectType"
                            :onlyContent="onlyContent"
                            :desc="desc"
                            :ratings="food.ratings"
                            @select="getSelect"
                            @toggleContent="getToggle"
                        ></ratingSelect>
                        <div class="rating-wrapper">
                            <ul v-show="food.ratings && food.ratings.length" class>
                                <li
                                    v-show="needShow(rating.rateType,rating.text)"
                                    v-for="(rating,index) in food.ratings"
                                    :key="index"
                                    class="rating-item"
                                >
                                    <div class="user">
                                        <span class="name">{{rating.username}}</span>
                                        <img
                                            :src="rating.avatar"
                                            class="avatar"
                                            width="12"
                                            height="12"
                                            alt
                                        />
                                    </div>
                                    <div class="time">{{rating.rateTime | formatDate}}</div>
                                    <p class="text">
                                        <span
                                            :class="{'up':rating.rateType===0,'down':rating.rateType===1}"
                                        ></span>
                                        <span class="text-text">{{rating.text}}</span>
                                    </p>
                                </li>
                            </ul>
                            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>>
<style lang="scss">
.food {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 48px;
    z-index: 30;
    width: 100%;
    background: #fff;
    &.move-enter-to {
        transform: translate3d(0, 0, 0);
    }
    &.move-enter-active {
        transition: all 0.2s linear;
    }
    &.move-enter,
    &.move-leave {
        transform: translate3d(100%, 0, 0);
    }
    .img-header {
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 100%;
        img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
        .back {
            position: absolute;
            top: 10px;
            left: 10px;
            .arrow-left {
                display: inline-block;
                width: 20px;
                height: 20px;
                padding: 18px;
                background: url(./left.png) no-repeat;
                background-size: 20px 20px;
            }
        }
    }
    .content {
        padding: 18px;
        position: relative;
        .title {
            line-height: 14px;
            margin-bottom: 8px;
            font-size: 14px;
            font-weight: 700;
            color: rgb(7, 17, 27);
        }
        .detail {
            margin-bottom: 18px;
            line-height: 10px;
            height: 10px;
            font-size: 0;
            .sell-count,
            .rating {
                font-size: 10px;
                color: rgb(147, 153, 159);
            }
            .sell-count {
                margin-right: 12px;
            }
        }
        .price {
            line-height: 24px;
            .now {
                font-weight: 700;
                margin-right: 8px;
                font-size: 14px;
                color: rgb(240, 20, 20);
            }
            .old {
                font-weight: 700;
                text-decoration: line-through;
                font-size: 10px;
                color: rgb(147, 153, 159);
            }
        }
        .cartcontrol-wrapper {
            position: absolute;
            right: 18px;
            bottom: 18px;
            width: 80px;
            height: 10px;
        }
        .buy {
            position: absolute;
            right: 18px;
            bottom: 18px;
            z-index: 10;
            height: 24px;
            line-height: 24px;
            padding: 0 12px;
            box-sizing: border-box;
            font-size: 10px;
            border-radius: 12px;
            color: #fff;
            background: rgb(0, 160, 220);
        }
        .fade-enter-to {
            transition: all 0.2s;
            opacity: 1;
        }
        .fade-enter,
        .fade-leave {
            opacity: 0;
        }
    }
    .info {
        padding: 18px;
        .title {
            line-height: 14px;
            margin-bottom: 6px;
            font-size: 14px;
            color: rgb(7, 17, 27);
        }
        .text {
            line-height: 24px;
            padding: 0 8px;
            font-size: 12px;
            color: (77, 85, 93);
        }
    }
    .rating {
        padding-top: 18px;
        .title {
            line-height: 14px;
            margin-left: 18px;
            font-size: 14px;
            color: rgb(7, 17, 27);
        }
        .rating-wrapper {
            padding: 0 18px;
            .rating-item {
                position: relative;
                padding: 16px 0;
                border-bottom: 1px solid rgba(7, 17, 27, 0.1);
                &:last-child {
                    border-bottom: none;
                }
                .user {
                    position: absolute;
                    right: 0;
                    top: 16px;
                    line-height: 12px;
                    .name {
                        display: inline-block;
                        vertical-align: top;
                        font-size: 10px;
                        margin-right: 6px;
                        color: rgb(147, 153, 159);
                    }
                    .avatar {
                        border-radius: 50%;
                    }
                }
                .time {
                    margin-bottom: 6px;
                    font-size: 10px;
                    line-height: 12px;
                    color: rgb(147, 153, 159);
                }
                .text {
                    line-height: 16px;
                    font-size: 12px;
                    color: rgb(7, 17, 27);
                    .up {
                        display: inline-block;
                        width: 15px;
                        height: 15px;
                        vertical-align: middle;
                        background: url(./up.png) no-repeat;
                        background-size: 15px 15px;
                        &.down {
                            vertical-align: middle;
                            background: url(./down.png) no-repeat;
                            background-size: 15px 15px;
                        }
                    }
                    .text-text {
                        vertical-align: middle;
                        margin-left: 6px;
                    }
                }
            }
            .no-rating {
                padding: 16px 0;
                font-size: 12px;
                color: rgb(147, 153, 159);
            }
        }
    }
}
</style>
<script>
import BScroll from "better-scroll";
import Vue from "vue";
import {formatDate} from "@/common/js/date.js";
import cartControl from "@/components/cartControl/Carcontrol.vue";
import split from "@/components/split/Split.vue";
import ratingSelect from "@/components/ratingSelect/Ratingsel.vue";
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;
export default {
    props: {
        food: {
            type: Object
        }
    },
    components: {
        cartControl,
        split,
        ratingSelect
    },
    data() {
        return {
            showFlag: false,
            selectType: ALL,
            onlyContent: true,
            desc: {
                all: "全部",
                positive: "推荐",
                negative: "吐槽"
            }
        };
    },
    filters: {
        formatDate(time) {
            let date = new Date(time);
            return formatDate(date,'yyyy-MM-dd hh:mm')
        }
    },
    methods: {
        show() {
            this.showFlag = true;
            // 和子组件一致的数据
            this.selectType = ALL;
            this.onlyContent = true;
            this.$nextTick(() => {
                if (!this.scroll) {
                    this.scroll = new BScroll(this.$refs.foodContent, {
                        click: true
                    });
                } else {
                    this.scroll.refresh();
                }
            });
        },
        back() {
            this.showFlag = false;
        },
        // 点击“加入购物车”后需+1
        addFirst() {
            Vue.set(this.food, "count", 1);
        },
        // 父组件接收子组件传过来的值
        getSelect(type) {
            this.selectType = type;
            this.$nextTick(() => {
                this.scroll.refresh();
            });
        },
        // 父组件接收子组件传过来的值
        getToggle(meg) {
            this.onlyContent = !meg;
            this.$nextTick(() => {
                this.scroll.refresh();
            });
        },
        // 勾选内容评价显示对应的内容
        needShow(type, text) {
            if (this.onlyContent && !text) {
                return false;
            }
            if (this.selectType === ALL) {
                return true;
            } else {
                return type === this.selectType;
            }
        }
    }
};
</script>