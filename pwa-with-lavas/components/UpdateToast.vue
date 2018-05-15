<template>
    <transition name="popup">
        <div class="update-toast" v-bind:class="{'success':showType==3}" v-show="show">
            <span>{{ text }}</span>
            <span class="update-toast-close-btn" @click="handleRefresh" v-if="showType==1">
                <i class="iconfont icon-refresh"></i>
            </span>
            <span class="update-toast-close-btn" @click="handleClose" v-if="showType==2||showType==3">
                <i class="iconfont icon-close"></i>
            </span>
        </div>
    </transition>
</template>

<script>

export default {
    name: 'updateToast',
    props: {
        text: {
            type: String,
            default: '站点发生更新，请手动刷新'
        }
    },
    data() {
        return {
            show: false,
            showType: 1 // 1:更新操作 2:提示消息
        };
    },
    mounted() {
        window.addEventListener('sw.update', this.handleUpdate);
        window.addEventListener('offline',this.handleOffline)
        window.addEventListener('online',this.handleOnline)
    },
    beforeDestroy() {
        window.removeEventListener('sw.update', this.handleUpdate);
    },
    methods: {
        handleUpdate(event) {
            this.text = "站点发生更新，请手动刷新";
            this.show = true;
            this.showType = 1;
        },

        handleRefresh() {
            window.location.reload();
        },

        handleClose(){
            this.show = false;
        },

        handleOffline(){
            this.text = "不好意思，当前处于离线状态";
            this.show = true;
            this.showType = 2;
            setTimeout(()=>this.show=false,2000);
        },

        handleOnline(){
            this.text = "恭喜你，可以上网了";
            this.show = true;
            this.showType = 3;
            setTimeout(()=>this.show=false,2000);
        }

    }
};
</script>

<style lang="stylus" scoped>
$height = 56px
$close-btn-height = 28px

.update-toast
    position fixed
    left 0
    right 0
    top 0
    display flex
    flex-direction row
    justify-content space-between
    align-items center
    background-color #333
    color #ffffff
    font-size 16px
    height $height
    line-height $height
    padding 0 13px
    opacity 1
    transform translateY(0)
    z-index 1000

    &.popup-enter-active,
    &.popup-leave-active
        transition all .5s ease-in-out

    &.popup-enter,
    &.popup-leave-to
        opacity 0
        transform translateY(-($height))

    &-close-btn
        width $close-btn-height
        height $close-btn-height
        line-height $close-btn-height
        text-align center
        border-radius $close-btn-height
        background rgba(0, 0, 0, 0.2)
.update-toast.success
    background-color green
</style>
