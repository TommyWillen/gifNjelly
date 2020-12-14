module.exports = function(sequelize, DataTypes) {
  var GiphyPost = sequelize.define("GiphyPost", {
    gifId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    caption: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gifScore: {
      type: DataTypes.INTEGER,
    },
    jellyScore: {
      type: DataTypes.INTEGER,
    }
  });

  GiphyPost.associate = function(models) {
    GiphyPost.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return GiphyPost;
};