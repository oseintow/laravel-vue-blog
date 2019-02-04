<template>
    <div>
        <b-modal v-model="show" id="modal-center" hide-footer size="lg" centered title="">
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
            this.$eventBus.$on('sign-up', () => this.showSignUp())
        },
        methods: {
            showSignUp() {
                this.show = true
            }
        }
    }
</script>

<style>
    .modal-backdrop.show { background-color: white !important; opacity: 0.9 }
    .modal-header, .modal-footer { border: 3px }
    .modal-content{ boox-shadow: 5px 10px red !important}
</style>