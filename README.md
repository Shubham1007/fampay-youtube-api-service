# fampay-youtube-api-task

## Task Running Steps - <br/>

1. Clone the project

`git clone git@github.com:Shubham1007/fampay-youtube-api-task.git`

2. Copy [.env.example](https://github.com/meehawk/fampay-assignment/blob/master/.env.example) to .env

```
# For default values, refer `.env.defaults` file
NODE_ENV = 

# Server Properties
PORT =

# MONGODB
MONGODB_URI = 

# YOUTUBE API
YOUTUBE_API_KEY =
YOUTUBE_SEARCH_QUERY =

3. Install dependencies

`npm install`

4. Run in development mode

`npm run dev`

### Running with Docker Compose

When using Docker Compose, 

1. Create a `.env` file using the instructions mentioned above
2. Set the `MONGODB_URI` environment variable in your `.env` file to

```
MONGODB_URI = mongodb://mongo:27017
```
3. Run:

```
docker-compose up -d
```
4. Navigate to `http://localhost:3000` to see the app live
5. Monitor the data dumped into MongoDB by navigating to `http://localhost:8081` thanks to [mongo-express](https://github.com/mongo-express/mongo-express)