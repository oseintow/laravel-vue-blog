<template>
    <div>
        <div >
            <font-awesome-icon icon="thumbs-up" size="2x" @click="toggle" class="toggle"/>
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
                favouritesCount: this.favourite.favourites_count,
                requestSent: false
            }
        },
        methods: {
            toggle() {
                if(this.requestSent) return;

                this.isFavourited
                    ? this.deleteFavourite()
                    : this.saveFavourite()
            },
            saveFavourite()
            {
                this.requestSent = true
                this.$store.dispatch('favourite/saveFavourite', { endpoint: this.favourite.favourite_url })
                    .then(() => {
                        this.isFavourited = true
                        this.favouritesCount++
                    }).finally(() => this.requestSent = false)
            },
            deleteFavourite()
            {
                this.requestSent = true
                this.$store.dispatch('favourite/deleteFavourite', { endpoint: this.favourite.favourite_url })
                    .then(() => {
                        this.isFavourited = false
                        this.favouritesCount--
                    }).finally(() => this.requestSent = false)
            }
        }
    }
</script>

<style>
    .toggle{
        cursor: pointer
    }
</style>