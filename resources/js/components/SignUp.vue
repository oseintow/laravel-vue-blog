<template>
    <div>
        <b-modal v-model="show" id="modal-center" centered title="Bootstrap-Vue">
            <p class="my-4">Vertically centered modal!</p>
        </b-modal>
    </div>
</template>

<script>
    export default {
        name: "SignUp",
        data() {
            return {
                show: false
            }
        },
        created() {
            this.$eventBus.$on('sign-up', () => this.show = true)
        },
        methods: {
            showSignUp() {
                this.show = true
            }
        }
    }
</script>

<style scoped>

</style>