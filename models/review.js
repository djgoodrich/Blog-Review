module.exports = function(sequelize, DataTypes) {
    var Review = sequelize.define("Review", {
      title: {
        type: DataTypes.STRING,
        validate: {
          len: [1]
          // Add validation to make sure that if body is not null, title has to be not null
        }
      },
      body: {
        type: DataTypes.TEXT,
        len: [1]
      }, 
      rating: {
          type: DataTypes.INTEGER,
          allowNull: false,
          len: [1]
      }
    });
  
    // Review belongs to a User
    Review.associate = function(models) {
      Review.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };

    //Review also belongs to a Blog
    Review.associate = function(models) {
        Review.belongsTo(models.Blog, {
          foreignKey: {
            allowNull: false
          }
        });
      };
  
    return Review;
  };
  