<template>
    <div class="ratings">
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
}
</style>

<script>
import Star from "@/components/star/Star.vue";
export default {
    props: {
        seller: {
            type: Object
        }
    },
    components: {
        "v-star": Star
    }
};
</script>