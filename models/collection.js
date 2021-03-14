module.exports = (sequelize, DataTypes) => {
    return sequelize.define("collection", {
    id: {
        type: DataTypes.INTEGER(11),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(45),
        allowNull: false
    }
    },{
      timestamps: true,
      tableName: 'collection'
    });
  };