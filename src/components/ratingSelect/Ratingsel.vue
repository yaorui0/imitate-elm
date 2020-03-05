<template>
    <div class="ratingSelect">
        <div class="rating-type">
            <span class="block positive" @click="select(2)" :class="{'active':selectType===2}">
                {{desc.all}}
                <span class="count">{{ratings.length}}</span>
            </span>
            <span class="block positive" @click="select(0)" :class="{'active':selectType===0}">
                {{desc.positive}}
                <span class="count">{{positives.length}}</span>
            </span>
            <span class="block negative" @click="select(1)" :class="{'active':selectType===1}">
                {{desc.negative}}
                <span class="count">{{negatives.length}}</span>
            </span>
        </div>
        <div class="switch" @click="toggleContent">
            <span class="check" :class="{'checked':onlyContent}"></span>
            <span class="text">只看内容的评价</span>
        </div>
    </div>
</template>
<style lang="scss">
.ratingSelect {
    .rating-type {
        padding: 18px 0;
        margin: 0 18px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        font-size: 0;
        .block {
            display: inline-block;
            padding: 8px 12px;
            margin-right: 8px;
            border-radius: 2px;
            font-size: 12px;
            color: rgba(77, 85, 93);
            &.active {
                color: #fff;
            }
            .count {
                font-size: 8px;
                margin-left: 2px;
                line-height: 16px;
            }
        }
        .positive {
            background: rgba(0, 160, 220, 0.2);
            &.active {
                background: rgb(0, 160, 220);
            }
        }
        .negative {
            background: rgba(77, 85, 93, 0.2);
            &.active {
                background: rgb(77, 85, 93);
            }
        }
    }
    .switch {
        padding: 12px 18px;
        line-height: 24px;
        font-size: 12px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        color: rgb(147, 153, 159);
        .check {
            display: inline-block;
            vertical-align: middle;
            margin-right: 4px;
            width: 20px;
            height: 20px;
            background: url(./select.png) no-repeat;
            background-size: 20px 20px;
            &.checked {
                background: url(./checked.png) no-repeat;
                background-size: 20px 20px;
            }
        }
        .text {
            vertical-align: middle;
            font-size: 12px;
        }
    }
}
</style>
<script>
import BScroll from "better-scroll";
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;
export default {
    props: {
        ratings: {
            type: Array,
            default() {
                return [];
            }
        },
        selectType: {
            type: Number,
            default: ALL
        },
        onlyContent: {
            type: Boolean,
            default: false
        },
        desc: {
            type: Object,
            default() {
                return {
                    all: "全部",
                    positive: "满意",
                    negative: "不满意"
                };
            }
        }
    },
    computed: {
        positives() {
            return this.ratings.filter((rating)=>{
                return rating.rateType === POSITIVE;
            })
        },
        negatives() {
            return this.ratings.filter((rating)=> {
                return rating.rateType === NEGATIVE;
            })
        }
    },
    methods: {
        select(type) {
            this.$emit("select", type);
        },
        toggleContent() {
            this.$emit("toggleContent", this.onlyContent);
        }
    }
};
</script>