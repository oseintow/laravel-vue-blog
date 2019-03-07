## Laravel Vue Blog
This is a single page minimalistic medium.com clone. It is uses laravel
on the backend to serve the api and vuejs to serve views and vuex for state management.

### Project Setup
1. clone the project
2. Rename `.env.example` to `.env` and update the values
3. Rename `.env.testing.example` to `.env.testing` and update the values
4. Run `php artisan migrate`
5. This project uses the basic web forms authenticaton and also has the option of
authenticating using google and facebook. To use social logins add below to your .env file

    ##### For facebook
    ```
    FACEBOOK_ID = xxxx
    FACEBOOK_SECRET = xxxx
    FACEBOOK_URL = /auth/facebook/callback
    ```
    
    ##### For Google
    ```
    GOOGLE_ID = xxxx
    GOOGLE_SECRET = xxxx
    GOOGLE_URL = /auth/google/callback
    ```
    
    Go to `resources->js->plugins->vue-authentication.js` and update the facebook and google client ids
6. This project uses Laravel Passport for generating access tokens. Run command below 
to install passport

    ```
    php artisan passport:install
    ```

7. Seed the database
    ```
    php artisan db:seed
    ```

8. Serving the app
    ```
    php artisan serve
    ```

### Testing Api
The backend has almost 100% coverage. Use command below to run test

For coverage use 
```
phpunit --coverage-html coverage
```
For non coverage

```
phpunit
```

### Testing Frontend
Use command below to run test
```
npm run test:unit
```
