## Laravel Vue Blog
This is a single page minimalistic medium.com clone. It is uses laravel
on the backend to serve the api and vuejs to serve views and vuex for state management.

### Project Setup
1. clone the project
2. run `composer install`
3. Rename `.env.example` to `.env` and update the values
4. Rename `.env.testing.example` to `.env.testing` and update the values
5. Run `php artisan migrate`
6. This project uses the basic web forms for authenticaton and also has the option of
authenticating using google and facebook. To use social logins add below to your .env file

    ##### For facebook
    ```
    FACEBOOK_ID = 
    FACEBOOK_SECRET = 
    FACEBOOK_URL = /auth/facebook/callback
    ```
    
    ##### For Google
    ```
    GOOGLE_ID = 
    GOOGLE_SECRET = 
    GOOGLE_URL = /auth/google/callback
    ```
    
    Go to `resources->js->plugins->vue-authentication.js` and update the facebook and google client ids

7. This project uses Laravel Passport for generating access tokens. Run command below 
to install passport

    ```
    php artisan passport:install
    ```

8. Seed the database
    ```
    php artisan db:seed
    ```

9. Serving the app

    ```
    php artisan serve
    ```
    
10. To transpile the frontend js files use below command
    
    ```
    npm run dev
    ```
       
    or
       
    ```
    npm run watch
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
