<template>
    <div class="home_box">
        <router-view v-slot="{ Component }">
            <transition name="move" mode="out-in">
                <component :is="Component" />
            </transition>
        </router-view>
    </div>
</template>
<script>
export default {
    name: 'Home',
    data() {
        return {
            
        }
    },
    mounted() {
        
    },
    methods: {
        
    },
}
</script>
<style lang="scss" scoped>
.home_box{
    width: 100%;
    height: 100%;
}
</style>