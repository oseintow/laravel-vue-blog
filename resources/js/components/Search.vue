<template>
    <div>
        <div class="form-group">
            <input type="text" v-model="search" :placeholder="placeholderText" class="form-control form-control-md">
        </div>
    </div>
</template>

<script>
    import {pluck, debounceTime, distinctUntilChanged, map} from 'rxjs/operators'

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
        methods: {
            emitSearchValue() {
                this.$eventBus.search(this.search)
            }
        },
        subscriptions() {
            return {
                results: this.$watchAsObservable('search')
                    .pipe(
                        pluck('newValue'),
                        debounceTime(500),
                        distinctUntilChanged(),
                        map(this.emitSearchValue)
                    )
            }
        }
    }
</script>    