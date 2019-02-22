<template>
    <div>
        <div class="row xs-column-reverse">
            <div class="col-md-8">
                <div class="mr-4">
                    <blogs></blogs>
                </div>
            </div>
            <div class="col-md-4">
                <div class="row mb-4">
                    <ul class="list-group searchBox">
                        <li class="list-group-item"><h6>Search</h6></li>
                        <li class="list-group-item">
                            <search placeholder="search for blog"></search>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Blogs from '@/components/blog/Blogs'

    export default {
        name: "Home",
        components: {
            Blogs
        },
        methods: {
            showSignUp() {
                this.$eventBus.signUp()
            },
            showSignIn() {
                this.$eventBus.signIn()
            }
        }
    }
</script>

<style scoped>
    .searchBox {
        width: 100%;
    }
    @media only screen and (max-width: 768px) {
        .xs-column-reverse {
            display: flex;
            flex-direction: column-reverse;
        }
        .searchBox {
            margin-left: 5%;
            margin-right: 5%;
        }
    }
</style>