module.exports = (sequelize,DataTypes) => {
    const entries = sequelize.define("entries",{
        userIPAddress: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userLatitude:{
            type: DataTypes.STRING,
            allowNUll: false
        },
        userLongitude:{
            type: DataTypes.STRING,
            allowNUll: false
        },    
        isp: {
            type: DataTypes.STRING,
            allowNull: false
        },
        serverIPAddress: {
            type: DataTypes.STRING,
            allowNull: false
        },
        serverLatitude:{
            type: DataTypes.STRING,
            allowNUll: true
        },
        serverLongitude:{
            type: DataTypes.STRING,
            allowNUll: true
        },
        wait: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        startedDateTime: {
            type: DataTypes.STRING,
            allowNull: false
        },
        method: {
            type: DataTypes.STRING,
            allowNull: false
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        statusText: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age: {
            type: DataTypes.STRING,
            allowNull: true
        },
        expires: {
            type: DataTypes.STRING,
            allowNull: true
        },
        last_modified: {
            type: DataTypes.STRING,
            allowNull: true
        },
        content_type: {
            type: DataTypes.STRING,
            allowNull: true
        },
        cache_control: {
            type: DataTypes.STRING,
            allowNull: true
        },
        pragma: {
            type: DataTypes.STRING,
            allowNull: true
        },
        host: {
            type: DataTypes.STRING,
            allowNull: true
        },

    });

    return entries;
}