<template>
    <div class="cartControl">
        <transition name="move">
            <div class="cart-decrease remove" v-show="food.count>0" @click="removeCart"></div>
        </transition>
        <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
        <div class="cart-add add" @click="addCart"></div>
    </div>
</template>
<style lang="scss">
.cartControl {
    font-size: 0;
    position: absolute;
    right: -9px;
    top: -14px;
    .move-leave {
        opacity: 1;
        transform: translate3d(0, 0, 0);
    }
    .move-leave-active {
        transition: all 0.3s linear;
    }
    .move-enter-to,
    .move-leave-to {
        opacity: 1;
        transform: translate3d(24px, 0, 0);
    }
    .cart-decrease,
    .cart-add {
        display: inline-block;
        height: 24px;
        line-height: 24px;
        padding: 6px;
        height: 20px;
        width: 20px;
        &.remove {
            display: inline-block;
            background: url(./remove.png) no-repeat;
            background-size: 20px 20px;
        }
    }
    .cart-count {
        display: inline-block;
        vertical-align: top;
        width: 16px;
        line-height: 24px;
        text-align: left;
        font-size: 14px;
        color: rgb(147, 153, 159);
    }
    .cart-add {
        &.add {
            display: inline-block;
            background: url(./add.png) no-repeat;
            background-size: 23px 23px;
        }
    }
}
</style>
<script>
import Vue from "vue";
export default {
    props: {
        food: {
            type: Object
        }
    },

    methods: {
        addCart() {
            if (!this.food.count) {
                Vue.set(this.food, "count", 1);
            } else {
                this.food.count++;
            }
        },
        removeCart() {
            if (this.food.count) {
                this.food.count--;
            }
        }
    }
};
</script>