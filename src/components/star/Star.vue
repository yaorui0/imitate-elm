<template>
    <div class="star" :class="starType">
        <span
            v-for="(itemClass,index) in itemClasses"
            :key="index"
            :class="itemClass"
            class="star-item"
        ></span>
    </div>
</template>
<style lang="scss">
.star {
    .star-item {
        display: inline-block;
    }
}
.star-48 {
    .on {
        background: url(./star48_on@2x.png) no-repeat;
    }
    .off {
        background: url(./star48_off@2x.png) no-repeat;
    }
    .half {
        background: url(./star48_half@2x.png) no-repeat;
	}
	.star-item {
		display: inline-block;
        width: 20px;
        height: 20px;
        margin-right: 22px;
        background-size: 20px 20px;
    }
}
.star-36 {
    
    .on {
        background: url(./star36_on@2x.png) no-repeat;
    }
    .off {
        background: url(./star36_off@2x.png) no-repeat;
    }
    .half {
        background: url(./star36_half@2x.png) no-repeat;
	}
	.star-item {
		display: inline-block;
        width: 15px;
        height: 15px;
        margin-right: 6px;
        background-size: 15px 15px;
    }
}
.star-24 {
    .on {
        background: url(./star24_on@2x.png) no-repeat;
    }
    .off {
        background: url(./star24_off@2x.png) no-repeat;
    }
    .half {
        background: url(./star24_half@2x.png) no-repeat;
	}
	.star-item {
		display: inline-block;
        width: 10px;
        height: 10px;
        margin-right: 3px;
        background-size: 10px 10px;
    }
}
</style>
<script>
const length = 5;
const cla_on = "on";
const cla_off = "off";
const cla_half = "half";
export default {
    props: {
        size: {
            type: Number
        },
        score: {
            type: Number
        }
    },
    computed: {
        starType() {
            return "star-" + this.size;
        },
        itemClasses() {
			let result = [];
			// 求评分
			let score = Math.floor(this.score * 2) / 2;
			// 求取余后的数
			let hasDecimal = score % 1 !== 0;
			// 求满星
			let integer = Math.floor(score);
			// 将满星的星星push到数组
            for (let i = 0; i < integer; i++) {
                result.push(cla_on);
			}
			// 如果有半颗星的，push在数组，没有不计
            if (hasDecimal) {
                result.push(cla_half);
			}
			// 通过result长度与最多为5星做比较，如果result有星的长度小于5，则其余用空星补满
            while (result.length < length) {
                result.push(cla_off);
            }
            return result;
        }
    }
};
</script>