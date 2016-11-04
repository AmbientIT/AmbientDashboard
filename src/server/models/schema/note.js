export default (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    amount: {
      type: DataTypes.INTEGER,
    },
    date: {
      type: DataTypes.DATE,
    },
    isPay: {
      type: DataTypes.BOOLEAN,
    },
    currency: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate(models) {
        Note.hasOne(models.User, {
          as: 'owner',
          onDelete: 'CASCADE',
          foreignKey: {
            allowNull: false,
          },
        })
      },
    },
  })
  return Note
}
