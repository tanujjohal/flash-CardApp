module.exports = (sequelize, DataTypes) => {
    return sequelize.define("cardDetails", {
    id: {
        type: DataTypes.INTEGER(11),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    collectionId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    title: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    frontBody: {
      type: DataTypes.STRING(2000),
      allowNull: false
    },
    backBody: {
      type: DataTypes.STRING(2000),
      allowNull: false
    }
    },{
      timestamps: true,
      tableName: 'cardDetails'
    });
  };