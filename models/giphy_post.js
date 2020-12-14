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
    },
    jellyScore: {
      type: DataTypes.INTEGER,
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
    },
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