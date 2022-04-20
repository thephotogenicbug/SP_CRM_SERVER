module.exports = (sequelize, DataTypes) => {
  const CreateTickets = sequelize.define("CreateTickets", {
    myservice: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subservice: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    budget: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    attachment: {
      type: DataTypes.STRING,
    },
  });

  return CreateTickets;
};
