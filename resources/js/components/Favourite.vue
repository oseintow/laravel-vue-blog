<template>
    <div>
        <div @click="toggle" class="toggle">
            <font-awesome-icon icon="thumbs-up" size="2x"/>
            <span v-text="favouritesCount"></span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Favourite",
        props: {
            isFavourited: Boolean,
            favouritesCount: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                favourited: this.isFavourited
            }
        },
        methods: {
            toggle() {
                this.favourited = !this.favourited
                this.$emit('favourited', this.favourited)
            }
        }
    }
</script>

<style>
    .toggle{
        cursor: pointer
    }
</style>