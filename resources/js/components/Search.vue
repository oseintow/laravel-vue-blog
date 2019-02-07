<template>
    <div>
        <div>
            <input type="text" placeholder="placeholderText">
        </div>
    </div>
</template>

<script>
    export default {
        props: ['placeholder'],
        data() {
            return {
                placeholderText: this.placeholder,
                search: ''
            }
        },
        watch: {
            search(value) {
                this.$eventBus.search(value)
            }
        }
    }
</script>    