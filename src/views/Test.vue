<template>
    <div>
        <transition name="fade">
            <div v-if="show">
                <p>你好啊</p>
            </div>
        </transition>
		<button @click="letShow">显示</button>
		<button @click="letHide">隐藏</button>
    </div>
</template>
<style lang="scss">
.fade-enter-to/*过渡完成后的状态，在过渡效果持续时间结束后下一帧移除*/
	 {
    opacity: 1;
    background: rgba(7, 17, 27, 0.8);
}
.fade-enter,  .fade-leave-to/*过渡开始进入以及离开后的状态*/
	 {
    opacity: 0;
    background: rgba(7, 17, 27, 0);
}

// .fade-leave/*过渡从当前开始离开的状态，一般与fade-enter-to保持一致*/
// 	 {
//     opacity: 1;
//     background: rgba(7, 17, 27, 0.8);
// }

.fade-enter-active/*定义过渡从开始到完全进入的持续时间*/
	 {
    transition: all 5s ease;
}

// .fade-leave-active/*定义过渡从开始离开到完全离开的持续时间*/
// 	 {
//     transition: all 0.7s ease;
//     background-color: rgba(7, 17, 27, 0.8);
// }
</style>
<script>
const length = 5;
const cla_on = "on";
const cla_off = "off";
const cla_half = "half";
export default {
    data() {
        return {
            show: false
        };
    },
    methods: {
		letShow(){
			this.show = true;
		},
		letHide(){
			this.show = false;
		}
	}
};
</script>