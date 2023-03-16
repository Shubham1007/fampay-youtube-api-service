const mongoose = require("mongoose");

const mongooseFuzzySearching = require("mongoose-fuzzy-searching");

const videoSchema = new mongoose.Schema(
  {
    title: String,
    
    channelTitle: String,
    channelId: String,
    
    description: String,
    videoId: String,
    thumbnails: {
      default: {
        url: String,
        height: Number,
        width: Number,
      },

      medium: {
        url: String,
        width: Number,
        height: Number,
      },
      high: {
        url: String,
        width: Number,
        height: Number,
      },
    },

    publishedAt: Date,
  },

  {
    timestamps: true,
  }
);

videoSchema.plugin(mongooseFuzzySearching, {
  fields: ["title", "description"],
});
module.exports = mongoose.model("Video", videoSchema);
