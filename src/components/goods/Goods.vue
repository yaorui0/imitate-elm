<template>
    <div class="goods">
        <div class="menu-wrapper" ref="menuWrapper">
            <ul>
                <li
                    v-for="(item,index) in goods"
                    :key="index"
                    class="menu-item"
                    :class="{'current':currentIndex===index}"
                    @click="selectMenu(index)"
                >
                    <span class="text">
                        <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
                        {{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" ref="foodsWrapper">
            <ul>
                <li v-for="(item,index) in goods" class="food-list food-list-hook" :key="index">
                    <h1 class="title">{{item.name}}</h1>
                    <ul>
                        <li v-for="(food,index) in item.foods" class="food-item" :key="index">
                            <div class="icon">
                                <img :src="food.icon" alt width="57px" height="57px" />
                            </div>
                            <div class="content">
                                <h2 class="name">{{food.name}}</h2>
                                <p class="desc">{{food.description}}</p>
                                <div class="extra">
                                    <span class="count">月售{{food.sellCount}}份</span>
                                    <span>好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class="now">￥{{food.price}}</span>
                                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
		<car :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></car>
    </div>
</template>

<style lang="scss">
.goods {
    display: flex;
    position: absolute;
    top: 174px;
    bottom: 46px;
    width: 100%;
    overflow: hidden;
    .menu-wrapper {
        flex: 0 0 80px;
        width: 80px;
        background: #f3f5f7;
        .menu-item {
            display: table;
            height: 54px;
            width: 56px;
            line-height: 14px;
            padding: 0 12px;
            &.current {
                position: relative;
                margin-top: -1px;
                z-index: 10;
                background: #fff;
                font-weight: 700;
            }
            .text {
                display: table-cell;
                width: 56px;
                vertical-align: middle;
                font-size: 12px;
                border: 0px solid rgba(7, 17, 27, 0.1);
                .icon {
                    display: inline-block;
                    width: 12px;
                    height: 12px;
                    margin-left: 2px;
                    vertical-align: top;
                    background-size: 12px 12px;
                    background-repeat: no-repeat;
                }
                .decrease {
                    background-image: url(./decrease_3@2x.png);
                }
                .discount {
                    background-image: url(./discount_3@2x.png);
                }
                .gurantee {
                    background-image: url(./guarantee_3@2x.png);
                }
                .invoice {
                    background-image: url(./invoice_3@2x.png);
                }
                .special {
                    background-image: url(./special_3@2x.png);
                }
            }
        }
    }
    .foods-wrapper {
        flex: 1;
        .title {
            padding-left: 14px;
            height: 26px;
            line-height: 26px;
            border-left: 2px solid #d9dde1;
            font-size: 12px;
            color: rgb(147, 153, 159);
            background: #f3f5f7;
        }
        .food-item {
            display: flex;
            margin: 18px;
            padding-bottom: 18px;
            border-bottom: 1px solid rgba(7, 17, 27, 0.1);
            &:last-child {
                border-bottom: none;
                margin-bottom: 0;
            }
            .icon {
                flex: 0 0 57px;
                margin-right: 10px;
            }
            .content {
                flex: 1;
                .name {
                    margin: 2px 0 8px 0;
                    height: 14px;
                    line-height: 14px;
                    font-size: 14px;
                    color: rgb(7, 17, 27);
                    font-weight: 700;
                }
                .desc,
                .extra {
                    line-height: 10px;
                    font-size: 10px;
                    color: rgb(147, 153, 159);
                }
                .desc {
                    line-height: 12px;
                    margin-bottom: 8px;
                }
                .extra {
                    .count {
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
            }
        }
    }
}
</style>

<script>
import BScroll from "better-scroll";
import shopCar from "@/components/shopcar/Shopcar.vue";
export default {
    props: {
        seller: {
            type: Object
        }
	},
	components: {
		'car': shopCar
	},
    data() {
        return {
            goods: [],
            //定义列表高度
            listHeight: [],
            // 定义变量（上下滑动页面）
            scrollY: 0
        };
    },
    computed: {
		// 判断listHeight上下滚动时，停留在哪个元素的高度位置
        currentIndex() {
            for (let i = 0; i < this.listHeight.length; i++) {
                let height1 = this.listHeight[i];
                let height2 = this.listHeight[i + 1];
                if (
                    !height2 ||
                    (this.scrollY >= height1 && this.scrollY < height2)
                ) {
                    return i;
                }
            }
            return 0;
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
        // 请求goods数据
        this.$post("/goods").then(res => {
            this.goods = res.data;
            //2.获取更新后的dom
            this.$nextTick(() => {
                this._initScroll();
                this._calculateHeight();
            });
        });
    },
    methods: {
        //1. 获取页面中的dom，页面中运用ref=“驼峰命名”
        _initScroll() {
            this.menuScroll = new BScroll(this.$refs.menuWrapper, {
                //better-scroll默认false,阻止点击事件
                click: true
            });
            this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
                probeType: 3
            });
            // 监测dom滚动的实时位置
            this.foodsScroll.on("scroll", pos => {
                this.scrollY = Math.abs(Math.round(pos.y));
            });
        },
        //获取每个foodList高度存在listHeight数组中
        _calculateHeight() {
            // 获取指定dom的所有元素的集合
            let foodList = this.$refs.foodsWrapper.getElementsByClassName(
                "food-list-hook"
            );
            let height = 0;
            this.listHeight.push(height);
            for (let i = 0; i < foodList.length; i++) {
                let item = foodList[i];
                //累加每个foodList的高度
                height += item.clientHeight;
                //将每个foodList的高度追加在listHeight
                this.listHeight.push(height);
                // console.log(this.listHeight);
            }
		},
		// 商品左侧栏点击事件
        selectMenu(index) {
            let foodList = this.$refs.foodsWrapper.getElementsByClassName(
                "food-list-hook"
            );
			let el = foodList[index];
			// scrollToElement参数为滚动向目标元素，滚动时长
            this.foodsScroll.scrollToElement(el, 300);
        } 
    }
};
</script>