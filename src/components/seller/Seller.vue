<template>
    <div class="seller" ref="seller">
        <div class="seller-content">
            <div class="overview">
                <h1 class="title">{{seller.name}}</h1>
                <div class="desc">
                    <v-star :size="36" :score="seller.score" class="star"></v-star>
                    <span class="text">({{seller.ratingCount}})</span>
                    <span class="text">月销售{{seller.sellCount}}单</span>
                </div>
                <ul class="remark">
                    <li class="block">
                        <h2>起送价</h2>
                        <div class="content">
                            <span class="stress">{{seller.minPrice}}</span>元
                        </div>
                    </li>
                    <li class="block">
                        <h2>商家配送</h2>
                        <div class="content">
                            <span class="stress">{{seller.deliveryPrice}}</span>元
                        </div>
                    </li>
                    <li class="block">
                        <h2>平均配送时间</h2>
                        <div class="content">
                            <span class="stress">{{seller.deliveryTime}}</span>分钟
                        </div>
                    </li>
                </ul>
                <div class="favorite">
                    <span
                        class="icon icon-favorite"
                        :class="{'active': favorite}"
                        @click="toggleFavorite"
                    ></span>
                    <span class="text">{{favoriteText}}</span>
                </div>
            </div>
            <split></split>
            <div class="bulletin">
                <h1 class="title">公告与活动</h1>
                <div class="content-wrapper">
                    <p class="content">{{seller.bulletin}}</p>
                </div>
                <ul v-if="seller.supports" class="supports">
                    <li class="support-item" v-for="(item, index) in seller.supports" :key="index">
                        <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                        <span class="text">{{seller.supports[index].description}}</span>
                    </li>
                </ul>
            </div>
            <split></split>
            <div class="pics">
                <h1 class="title">商家实景</h1>
                <div class="pic-wrapper" ref="picWrapper">
                    <ul class="pic-list" ref="picList">
                        <li class="pic-item" v-for="(pic,index) in seller.pics" :key="index">
                            <img :src="pic" alt width="120" height="90" />
                        </li>
                    </ul>
                </div>
            </div>
            <split></split>
            <div class="info">
                <h1 class="title">商家信息</h1>
                <ul>
                    <li class="info-item" v-for="(info,index) in seller.infos" :key="index">{{info}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.seller {
    position: absolute;
    top: 174px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    .overview {
        position: relative;
        padding: 18px;
        .title {
            margin-bottom: 8px;
            line-height: 14px;
            color: rgb(7, 17, 27);
            font-size: 14px;
        }
        .desc {
            padding-bottom: 18px;
            font-size: 0;
            border-bottom: 1px solid rgba(7, 17, 27, 0.1);
            &:last-child {
                border-bottom: none;
            }
            .star {
                display: inline-block;
                margin-right: 8px;
                vertical-align: middle;
            }
            .text {
                display: inline-block;
                line-height: 18px;
                vertical-align: middle;
                margin-right: 12px;
                font-size: 10px;
                color: rgb(77, 85, 93);
            }
        }
        .remark {
            display: flex;
            padding-top: 18px;
            .block {
                flex: 1;
                text-align: center;
                border-right: 1px solid rgba(7, 17, 27, 0.1);
                &:last-child {
                    border: none;
                }
                h2 {
                    margin-bottom: 4px;
                    line-height: 10px;
                    font-size: 10px;
                    color: rgb(147, 153, 159);
                }
                .content {
                    line-height: 24px;
                    font-size: 10px;
                    color: rgb(7, 17, 27);
                    .stress {
                        font-size: 24px;
                    }
                }
            }
        }
        .favorite {
            position: absolute;
            width: 50px;
            margin: 0 auto;
            right: 11px;
            top: 18px;
            .icon {
                display: block;
                margin-bottom: 4px;
                &.icon-favorite {
                    background: url(./noFavorite.png) no-repeat center;
                    width: 20px;
                    height: 20px;
                    background-size: 20px 20px;
                    margin: 0 auto;
                    &.active {
                        background: url(./favorite.png) no-repeat center;
                        width: 20px;
                        height: 20px;
                        background-size: 20px 20px;
                        margin: auto;
                    }
                }
            }
            .text {
                display: inherit;
                line-height: 10px;
                text-align: center;
                font-size: 10px;
                color: rgb(77, 85, 93);
            }
        }
    }
    .bulletin {
        padding: 18px 18px 0 18px;
        .title {
            margin-bottom: 8px;
            line-height: 14px;
            font-size: 14px;
            color: rgb(7, 17, 27);
            font-weight: 700;
        }
        .content-wrapper {
            padding: 0 12px 16px 12px;
            border-bottom: 1px solid rgba(7, 17, 27, 0.1);
            &:last-child {
                border-bottom: none;
            }
            .content {
                line-height: 24px;
                font-size: 12px;
                color: rgb(240, 20, 20);
            }
        }
        .supports {
            .support-item {
                padding: 16px 12px;
                font-size: 0;
                border-bottom: 1px solid rgba(7, 17, 27, 0.1);
                &:last-child {
                    border-bottom: none;
                }
                .icon {
                    display: inline-block;
                    width: 16px;
                    height: 16px;
                    vertical-align: top;
                    margin-right: 6px;
                    background-size: 16px 16px;
                    background-repeat: no-repeat;
                }
                .decrease {
                    background-image: url(./decrease_4@2x.png);
                }
                .discount {
                    background-image: url(./discount_4@2x.png);
                }
                .gurantee {
                    background-image: url(./guarantee_4@2x.png);
                }
                .invoice {
                    background-image: url(./invoice_4@2x.png);
                }
                .special {
                    background-image: url(./special_4@2x.png);
                }
                .text {
                    font-size: 12px;
                    line-height: 16px;
                    color: rgb(7, 17, 27);
                }
            }
        }
    }
    .pics {
        padding: 18px;
        .title {
            margin-bottom: 12px;
            line-height: 14px;
            font-size: 14px;
            color: rgb(7, 17, 27);
        }
        .pic-wrapper {
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            .pic-list {
                font-size: 0;
                .pic-item {
                    display: inline-block;
                    margin-right: 6px;
                    width: 120px;
                    height: 90px;
                    &:last-child {
                        margin: 0;
                    }
                }
            }
        }
    }
    .info {
        padding: 18px 18px 0 18px;
        .title {
            padding-bottom: 12px;
            line-height: 14px;
            font-size: 12px;
            color: rgb(7, 17, 27);
            font-weight: 700;
            border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        }
        .info-item {
            padding: 16px 12px;
            line-height: 16px;
            border-bottom: 1px solid rgba(7, 17, 27, 0.1);
            &:last-child {
                border-bottom: none;
            }
            font-size: 12px;
        }
    }
}
</style>
	
<script>
import BScroll from "better-scroll";
import Star from "@/components/star/Star.vue";
import split from "@/components/split/Split.vue";
import { saveToLocal, loadFromLocal } from "@/common/js/store.js";
export default {
    props: {
        seller: {
            type: Object
        }
    },
    components: {
        "v-star": Star,
        split
    },
    data() {
        return {
            //未做存储前的定义
            // favorite: false,
            // 读取localStorage中的数据
            favorite: (() => {
                return loadFromLocal(this.seller.id, "favorite", false);
            })()
        };
    },
    created() {
        this.classMap = [
            "decrease",
            "discount",
            "special",
            "invoice",
            "gurantee"
        ];
    },
    mounted() {
        // 商品页上下滚动
        this.scroll = new BScroll(this.$refs.seller, {
            click: true
        });
        // 商品实景左右滚动
        if (this.seller.pics) {
            let picWidth = 120;
            let margin = 6;
            // 图片真实宽度
            let width = (picWidth + margin) * this.seller.pics.length - margin;
            // 设置图片宽度
            this.$refs.picList.style.width = width + "px";
            this.$nextTick(() => {
                this.picScroll = new BScroll(this.$refs.picWrapper, {
                    scrollX: true,
                    eventPassthrough: "vertical"
                });
            });
        }
    },
    computed: {
        favoriteText() {
            return this.favorite ? "已收藏" : "收藏";
        }
    },
    methods: {
        toggleFavorite() {
            this.favorite = !this.favorite;
            // 将favorite存储localStorage里
            saveToLocal(this.seller.id, "favorite", this.favorite);
        }
    }
};
</script>