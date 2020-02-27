<template>
    <div class="header">
        <div class="content-wrapper">
            <div class="avatar">
                <img width="64" height="64" :src="seller.avatar" alt />
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
                <div v-if="seller.supports" class="support">
                    <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
            </div>
            <div v-if="seller.supports" class="support-count" @click="showDetail">
                <span class="count">{{seller.supports.length}}个</span>
                <i class="arrow-right"></i>
            </div>
        </div>
        <div class="bullentin-wrapper" @click="showDetail">
            <span class="bullentin-title"></span>
            <span class="bullentin-text">{{seller.bulletin}}</span>
            <i class="bullentin-arrow-right"></i>
        </div>
        <div class="background">
            <img :src="seller.avatar" alt width="100%" height="100%" />
        </div>

        <transition name="fade">
            <div v-show="detailShow" class="detail">
                <div class="detail-wrapper clearfix">
                    <div class="detail-main">
                        <h1 class="name">{{seller.name}}</h1>
                        <div class="star-wrapper">
                            <v-star :size="48" :score="seller.score"></v-star>
                        </div>
                        <div class="title">
                            <div class="line"></div>
                            <div class="text">优惠信息</div>
                            <div class="line"></div>
                        </div>
                        <ul v-if="seller.supports" class="supports">
                            <li
                                class="support-item"
                                v-for="(item, index) in seller.supports"
                                :key="index"
                            >
                                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                                <span class="text">{{seller.supports[index].description}}</span>
                            </li>
                        </ul>
                        <div class="title">
                            <div class="line"></div>
                            <div class="text">商家公告</div>
                            <div class="line"></div>
                        </div>
                        <div class="bulletin">
                            <p class="content">{{seller.bulletin}}</p>
                        </div>
                    </div>
                </div>
                <div class="detail-close">
                    <i class="chaClose" @click.self="closeDetail"></i>
                </div>
            </div>
        </transition>
    </div>
</template>
<style lang="scss">
.header {
    position: relative;
    color: #fff;
    background-color: rgba(7, 17, 27, 0.5);
    .content-wrapper {
        position: relative;
        padding: 24px 12px 18px 24px;
        .avatar {
            display: inline-block;
            vertical-align: top;
            img {
                border-radius: 2px;
            }
        }
        .content {
            display: inline-block;
            margin-left: 16px;
            font-size: 14px;
            .title {
                margin: 2px 0 8px 0;
                .brand {
                    display: inline-block;
                    vertical-align: top;
                    width: 30px;
                    height: 18px;
                    background: url(./brand@2x.png) no-repeat;
                    background-size: 30px 18px;
                }
                .name {
                    margin-left: 6px;
                    font-size: 16px;
                    line-height: 18px;
                    font-weight: 700;
                }
            }
            .description {
                margin-bottom: 10px;
                line-height: 12px;
                font-size: 12px;
            }
            .support {
                .icon {
                    display: inline-block;
                    width: 12px;
                    height: 13px;
                    margin-left: 2px;
                    vertical-align: top;
                    background-size: 12px 13px;
                    background-repeat: no-repeat;
                }
                .decrease {
                    background-image: url(./decrease_1@2x.png);
                }
                .discount {
                    background-image: url(./discount_1@2x.png);
                }
                .gurantee {
                    background-image: url(./guarantee_1@2x.png);
                }
                .invoice {
                    background-image: url(./invoice_1@2x.png);
                }
                .special {
                    background-image: url(./special_1@2x.png);
                }
                .text {
                    line-height: 12px;
                    font-size: 10px;
                    margin-left: 4px;
                }
            }
        }
        .support-count {
            position: absolute;
            right: 12px;
            bottom: 18px;
            padding: 0 8px;
            height: 24px;
            line-height: 21px;
            border-radius: 14px;
            background-color: rgba(0, 0, 0, 0.2);
            text-align: center;
            .count {
                font-size: 10px;
            }
            .arrow-right {
                display: inline-block;
                height: 10px;
                width: 10px;
                vertical-align: middle;
                margin-left: 3px;
                background: url(./arrow-right.png) no-repeat;
                background-size: 10px 10px;
                color: #fff;
            }
        }
    }
    .bullentin-wrapper {
        position: relative;
        background: rgba(7, 17, 27, 0.2);
        height: 28px;
        line-height: 24px;
        padding: 0 22px 0 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        .bullentin-title {
            display: inline-block;
            vertical-align: middle;
            width: 22px;
            height: 12px;
            background: url(./bulletin@2x.png) no-repeat;
            background-size: 22px 12px;
        }
        .bullentin-text {
            font-size: 10px;
            font-weight: 200;
            margin: 0 4px;
        }
        .bullentin-arrow-right {
            position: absolute;
            height: 15px;
            width: 12px;
            right: 10px;
            top: 8px;
            background: url(./arrow-right.png) no-repeat;
            background-size: 15px 12px;
            color: #fff;
        }
    }
    .background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        filter: blur(10px);
    }
    .detail {
        position: fixed;
        z-index: 100;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgba(1, 17, 27, 0.8);
        .detail-wrapper {
            min-height: 100%;
            width: 100%;
            .detail-main {
                margin-top: 64px;
                padding-bottom: 64px;
                .name {
                    line-height: 16px;
                    text-align: center;
                    font-size: 16px;
                    font-weight: 700;
                }
                .star-wrapper {
                    margin-top: 18px;
                    padding: 2px 0;
                    text-align: center;
                }
                .title {
                    display: flex;
                    width: 80%;
                    margin: 28px auto 24px auto;
                    .line {
                        flex: 1;
                        position: relative;
                        top: -6px;
                        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
                    }
                    .text {
                        font-size: 12px;
                        padding: 0 12px;
                        font-weight: 700;
                    }
                }
                .supports {
                    width: 80%;
                    margin: 0 auto;
                    .support-item {
                        padding: 0 12px;
                        margin-bottom: 12px;
                        font-size: 0;
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
                            background-image: url(./decrease_2@2x.png);
                        }
                        .discount {
                            background-image: url(./discount_2@2x.png);
                        }
                        .gurantee {
                            background-image: url(./guarantee_2@2x.png);
                        }
                        .invoice {
                            background-image: url(./invoice_2@2x.png);
                        }
                        .special {
                            background-image: url(./special_2@2x.png);
                        }
                        .text {
                            display: inline-block;
                            font-size: 12px;
                        }
                    }
                    .support-item:last-child {
                        margin-bottom: 0;
                    }
                }
                .bulletin {
                    width: 80%;
                    margin: 0 auto;
                    .content {
                        padding: 0 12px;
                        font-size: 12px;
                        line-height: 24px;
                    }
                }
            }
        }
        .detail-close {
            position: relative;
            width: 32px;
            height: 32px;
            margin: -64px auto 0 auto;
            clear: both;
            .chaClose {
                display: inline-block;
                height: 32px;
                width: 32px;
                background: url(./cha.png) no-repeat;
                background-size: 32px 32px;
            }
        }
        .clearfix {
            display: inline-block;
            .clearfix:fater {
                display: block;
                content: ".";
                height: 0;
                line-height: 0;
                clear: both;
                visibility: hidden;
            }
        }
    }
    .fade-enter {
        // width: 0;
        // margin-top: 100%;
        // margin-left: 100%;
        background-color: rgba(7, 17, 27, 0);
    }
    .fade-enter-active/*定义过渡从开始到完全进入的持续时间*/ {
        transition: all 0.5s;
    }
     .fade-enter-to {
        // width: 100%;
        // margin-top: 0;
        background-color: rgba(7, 17, 27, 0.8);
    }
}
</style>
<script>
import Star from "@/components/star/Star.vue";
export default {
    name: "star",
    components: {
        "v-star": Star
    },
    props: {
        seller: {
            type: Object
        }
    },
    data() {
        return {
            detailShow: false
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
    methods: {
        showDetail() {
            this.detailShow = true;
        },
        closeDetail() {
            this.detailShow = false;
        }
    }
};
</script>