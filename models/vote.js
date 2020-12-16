module.exports = function(sequelize, Sequelize, DataTypes) {
  const Vote = sequelize.define("Vote", {
    gif: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    jelly: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
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

  Vote.associate = function(models) {
    Vote.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    Vote.belongsTo(models.GiphyPost, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Vote;
};