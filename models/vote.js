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