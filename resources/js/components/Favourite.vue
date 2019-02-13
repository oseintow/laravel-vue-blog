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
                isFavourited: this.favourite.is_favourited,
                favouritesCount: this.favourite.favourites_count
            }
        },
        methods: {
            toggle() {
                this.isFavourited = !this.isFavourited

                // this.$emit('favourited', {
                //     id: this.favourite.id,
                //     isFavourited: this.isFavourited
                // })

                if(this.isFavourited) {
                    this.saveFavourite()
                }else{
                    this.deleteFavourite()
                }
            },
            saveFavourite()
            {

            },
            deleteFavourite()
            {

            }
        }
    }
</script>

<style>
    .toggle{
        cursor: pointer
    }
</style>