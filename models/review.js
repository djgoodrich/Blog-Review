module.exports = function(sequelize, DataTypes) {
    var Review = sequelize.define("Review", {
      title: {
        type: DataTypes.STRING,
        validate: {
          len: [1]
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
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
      }
    }, {
      validate: {
        bothTitleAndBodyOrNone() {
          if ((this.title === null) !== (this.body === null)) {
            throw new Error('Require either both title and body or neither')
          }
        }
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
  