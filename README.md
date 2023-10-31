# WeatherPrediction

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Run Angular PWA app with service workers on local:
1. Pull the code from git https://github.com/rajatsethi85/weather-prediction-client.git
2. Open in any IDE.
3. Run npm i
4. Run ng build --configuration development
5. This will build the app in dev mode.
6. Now run http-server -c-1 -p 4200 dist\weather-prediction\
7. Your application is in running state now.

### Access the app on Internet
http://13.127.161.181/

This is the IP of the EC2 instance where i deployed the application using NGINX.
