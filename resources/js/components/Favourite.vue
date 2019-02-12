<template>
    <div>
        <div @click="toggle" class="toggle">
            <font-awesome-icon icon="thumbs-up" size="2x"/>
            <span v-text="favouritesCount" class="ml-2"></span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Favourite",
        props: {
            favourite: Object
        },
        data() {
            return {
                isFavourited: this.favourite.isFavourited,
                favouritesCount: this.favourite.favouritesCount
            }
        },
        methods: {
            toggle() {
                this.isFavourited = !this.isFavourited

                this.$emit('favourited', {
                    id: this.favourite.id,
                    isFavourited: this.isFavourited
                })
            }
        }
    }
</script>

<style>
    .toggle{
        cursor: pointer
    }
</style>