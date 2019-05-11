## Laravel Vue Blog
This is a single page minimalistic medium.com clone. It is uses laravel
on the backend to serve the api and vuejs to serve views and vuex for state management.

### Project Setup
1. clone the project.
2. copy the content of `.env.example` to `.env` and update the values
3. copy the content of `.env.testing.example` to `.env.testing` and update the values
4. run `composer install`
5. run `npm install`
6. Run `php artisan migrate`
7. This project uses the basic web forms for authenticaton and also has the option of
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

8. This project uses Laravel Passport to generate access tokens. Run command below 
to install passport

    ```
    php artisan passport:install
    ```

9. Seed the database
    ```
    php artisan db:seed
    ```

10. Serving the app

    ```
    php artisan serve
    ```
    
11. To transpile the frontend js files use below command
    
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

### End to end test
This project uses cypress for the end to end test 
To run end to end test run command below. 

```
npm run e2e:open
```
