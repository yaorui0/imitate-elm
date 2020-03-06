<template>
    <div class="ratings" ref="ratingCont">
        <div class="ratings-content">
            <div class="overview">
                <div class="overview-left">
                    <h1 class="score">{{seller.score}}</h1>
                    <div class="title">综合评分</div>
                    <div class="rank">高于周边商家{{seller.rankRate}}</div>
                </div>
                <div class="overview-right">
                    <div class="score-wrapper">
                        <span class="title">服务态度</span>
                        <v-star :size="36" :score="seller.serviceScore"></v-star>
                        <span class="score">{{seller.serviceScore}}</span>
                    </div>
                    <div class="score-wrapper">
                        <span class="title">商品评分</span>
                        <v-star :size="36" :score="seller.foodScore"></v-star>
                        <span class="score">{{seller.foodScore}}</span>
                    </div>
                    <div class="delivery-wrapper">
                        <span class="title">送达时间</span>
                        <span class="delivery">{{seller.deliveryTime}}分钟</span>
                    </div>
                </div>
            </div>
            <split></split>
            <ratingSelect
                :selectType="selectType"
                :onlyContent="onlyContent"
                :desc="desc"
                :ratings="ratings"
                @select="getSelect"
                @toggleContent="getToggle"
            ></ratingSelect>
            <div class="ratings-wrapper">
                <ul>
                    <li  v-show="needShow(rating.rateType,rating.text)" v-for="(rating,index) in ratings" :key="index" class="rating-item">
                        <div class="avatar">
                            <img :src="rating.avatar" width="28" height="28" alt />
                        </div>
                        <div class="content">
                            <h1 class="name">{{rating.username}}</h1>
                            <div class="star-wrapper">
                                <v-star :size="24" :score="rating.score" class="star"></v-star>
                                <span
                                    class="delivery"
                                    v-show="rating.deliveryTime"
                                >{{rating.deliveryTime}}</span>
                            </div>
                            <p class="text">{{rating.text}}</p>
                            <div
                                class="recommed"
                                v-show="rating.recommend && rating.recommend.length"
                            >
                                <span class="up"></span>
                                <span
                                    v-for="(item,index) in rating.recommend"
                                    :key="index"
                                    class="recommend-text"
                                >{{item}}</span>
                            </div>
                            <div class="time">{{rating.rateTime | formatDate}}</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
.ratings {
    position: absolute;
    top: 174px;
    bottom: 0;
    width: 100%;
    left: 0;
    overflow: hidden;
    .overview {
        display: flex;
        padding: 18px 0;
        .overview-left {
            flex: 0 0 137px;
            width: 137px;
            border-right: 1px solid rgba(7, 17, 27, 0.1);
            text-align: center;
            @media only screen and (max-width: 320px) {
                flex: 0 0 120px;
                width: 120px;
            }
            .score {
                margin-bottom: 6px;
                line-height: 28px;
                font-size: 24px;
                color: rgb(255, 153, 0);
            }
            .title {
                margin-bottom: 8px;
                line-height: 12px;
                font-size: 12px;
                color: rgba(7, 17, 27);
            }
            .rank {
                padding-bottom: 6px;
                line-height: 10px;
                font-size: 10px;
                color: rgb(147, 153, 159);
            }
        }
        .overview-right {
            flex: 1;
            padding: 6px 0 6px 24px;
            @media only screen and (max-width: 320px) {
                padding-left: 2px;
            }
            .score-wrapper {
                line-height: 18px;
                margin-bottom: 8px;
                .title {
                    display: inline-block;
                    line-height: 18px;
                    font-size: 12px;
                    vertical-align: top;
                    color: rgb(7, 17, 27);
                }
                .star {
                    display: inline-block;
                    vertical-align: top;
                    margin: 0 12px;
                }
                .score {
                    display: inline-block;
                    vertical-align: top;
                    line-height: 18px;
                    color: rgb(255, 153, 0);
                    font-size: 12px;
                }
            }
            .delivery-wrapper {
                .title {
                    line-height: 18px;
                    font-size: 12px;
                    color: rgb(7, 17, 27);
                }
                .delivery {
                    margin-left: 12px;
                    font-size: 12px;
                    color: rgb(147, 153, 159);
                }
            }
        }
    }
    .ratings-wrapper {
        padding: 0 18px;
        .rating-item {
            display: flex;
            padding: 18px 0;
            border-bottom: 1px solid rgb(7, 17, 27, 0.1);
            .avatar {
                flex: 0 0 28px;
                width: 28px;
                margin-right: 12px;
                img {
                    border-radius: 50%;
                }
            }
            &:last-child {
                border-bottom: none;
            }
            .content {
                position: relative;
                flex: 1;
                .name {
                    font-size: 10px;
                    line-height: 12px;
                    color: rgb(7, 17, 27);
                    margin-bottom: 4px;
                }
                .star-wrapper {
                    margin-bottom: 6px;
                    font-size: 0;
                    .star {
                        display: inline-block;
                        margin-right: 16px;
                        vertical-align: middle;
                    }
                    .delivery {
                        display: inline-block;
                        vertical-align: middle;
                        font-size: 10px;
                        line-height: 12px;
                        color: rgb(147, 153, 159);
                    }
                }
                .text {
                    line-height: 18px;
                    margin-bottom: 8px;
                    font-size: 12px;
                    color: rgb(7, 17, 27);
                }
                .recommed {
                    line-height: 16px;

                    .up {
                        display: inline-block;
                        width: 15px;
                        height: 15px;
                        vertical-align: middle;
                        background: url(./up.png) no-repeat;
                        background-size: 15px 15px;
                    }
                    .recommend-text {
                        display: inline-block;
                        padding: 0 6px;
                        border: 1px solid rgb(7, 17, 27, 0.1);
                        border-radius: 1px;
                        background: #fff;
                        margin: 0 8px 4px 0;
                        font-size: 9px;
                        margin-left: 6px;
                    }
                }
                .time {
                    position: absolute;
                    right: 0;
                    top: 0;
                    line-height: 12px;
                    font-size: 10px;
                    color: rgb(147, 153, 159);
                }
            }
        }
    }
}
</style>

<script>
import BScroll from "better-scroll";
import Star from "@/components/star/Star.vue";
import split from "@/components/split/Split.vue";
import ratingSelect from "@/components/ratingSelect/Ratingsel.vue";
import { formatDate } from "@/common/js/date.js";
const ALL = 2;
export default {
    props: {
        seller: {
            type: Object
        }
    },
    components: {
        "v-star": Star,
        split,
        ratingSelect
    },
    data() {
        return {
            ratings: [],
            selectType: ALL,
            onlyContent: true,
            desc: {
                all: "全部",
                positive: "满意",
                negative: "不满意"
            }
        };
    },
    created() {
        this.$get("/ratings").then(res => {
            this.ratings = res.data;
            this.$nextTick(() => {
                this.scroll = new BScroll(this.$refs.ratingCont, {
                    click: true
                });
            });
        });
    },
    filters: {
        formatDate(time) {
            let date = new Date(time);
            return formatDate(date, "yyyy-MM-dd hh:mm");
        }
    },
    methods: {
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
            // 点击评价内容按钮
            if (this.onlyContent && !text) {
                return false;
            }
            // 选择满意/不满意/全部
            if (this.selectType === ALL) {
                return true;
            } else {
                return type === this.selectType;
            }
        }
    }
};
</script>