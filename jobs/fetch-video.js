/* eslint-disable no-await-in-loop */
const cron = require("node-cron");
const VideoModel = require("../models/video");
const { fetchVideos } = require("../util/helper");
const secrets = require("../util/secrets");
const logger = require("../util/logger");
module.exports = () => {
  cron.schedule("* * * * *", async () => {
    try {
      let isDone = false;
      for (const apiKey of secrets.YOUTUBE_API_KEY.split(",")) {
        try {
          if (isDone) {
            break;
          }

          const videos = await fetchVideos(
            apiKey,
            secrets.YOUTUBE_SEARCH_QUERY
          );

          await VideoModel.create(videos);
          isDone = true;
        } catch (err) {
          logger.error("Error saving videos to DB", {
            error: err,
          });
        }
      }

      if (!isDone) {
        throw new Error("Quota exhausted for all keys");
      }
    } catch (err) {
      logger.error("Quota exhausted for all keys", {
        error: err,
      });
    }
  });
};
