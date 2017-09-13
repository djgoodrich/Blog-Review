module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      // Giving the User model a name of type STRING
      name: DataTypes.STRING,
      sub: DataTypes.STRING
    },
    {
        timestamps: false 
    });
  
    // Associating User with Reviews
    User.associate = function(models){
      // When an User is deleted, also delete any associated Reviews
      User.hasMany(models.Review, {
        onDelete: "cascade"
      });
    };  
  
    return User;
  };


  