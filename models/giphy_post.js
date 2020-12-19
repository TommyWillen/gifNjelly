module.exports = function(sequelize, Sequelize, DataTypes) {
  const GiphyPost = sequelize.define("GiphyPost", {
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
      defaultValue: 0,
    },
    jellyScore: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
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