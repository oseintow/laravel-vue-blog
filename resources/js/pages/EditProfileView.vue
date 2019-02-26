<template>
    <div>
        <h3 class="mb-4">Edit Profile</h3>
        
        <div>
            <form novalidate>
                <div class="form-group">
                    <label for="name">Name:</label>
                    <input type="text" name="name" v-model="user.name" class="form-control" id="name" placeholder="">
                </div>

                <div class="form-group">
                    <label for="bio">Bio:</label>
                    <textarea name="bio" id="bio" v-model="user.bio" placeholder="" class="form-control" rows="8"></textarea>
                </div>

                <div>
                    <button class="btn btn-primary" @click="update">Update</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "EditProfileView",
        data() {
            return {
                user: {
                    name: '',
                    bio: '',
                    avatar_image: ''
                }
            }
        },
        mounted() {
            if(this.$auth.check) {
                this.user.name = this.$auth.user.name
                this.user.bio = this.$auth.user.bio
                this.user.avatar_image = this.$auth.user.avatar
            }
        },
        methods: {
            update() {

            }
        }

    }
</script>

<style scoped>

</style>