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
            <div v-if="seller.supports" class="support-count">
                <span class="count">{{seller.supports.length}}个</span>
                <i class="arrow-right"></i>
            </div>
        </div>
        <div class="bullentin-wrapper">
            <span class="bullentin-title"></span>
            <span class="bullentin-text">{{seller.bulletin}}</span>
            <i class="bullentin-arrow-right"></i>
        </div>
    </div>
</template>
<style lang="scss">
.header {
    color: #fff;
    background-color: #999;
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
            top: 9px;
            background: url(./arrow-right.png) no-repeat;
            background-size: 15px 12px;
            color: #fff;
        }
    }
}
</style>
<script>
export default {
    props: {
        seller: {
            type: Object
        }
    },
    created() {
        this.classMap = [
            "decrease",
            "discount",
            "special",
            "invoice",
            "gurantee"
        ];
    }
};
</script>