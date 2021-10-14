module.exports = (sequelize,DataTypes) => {
    const users = sequelize.define("users",{
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    users.associate = (models) => {
        users.hasMany(models.entries,{
            onDelete: "cascade",
        });
    };

    return users;
}