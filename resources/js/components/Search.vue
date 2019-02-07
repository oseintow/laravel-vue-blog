<template>
    <div>
        <div class="form-group">
            <input type="text" v-model="search" :placeholder="placeholderText" class="form-control form-control-md">
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            placeholder: {
                type: String,
                default: 'Search'
            }
        },
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