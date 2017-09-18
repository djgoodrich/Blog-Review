module.exports = function(sequelize, DataTypes) {
    var Review = sequelize.define("Review", {
      title: {
        type: DataTypes.STRING,
        validate: {
          isEmpty(value) {
            if (value && value.length < 1) {
              value = null;
            }
          }
        }
      },
      body: {
        type: DataTypes.TEXT,
        validate: {
          isEmpty(value) {
            if (value && value.length < 1) {
              value = null;
            }
          }
        }
      }, 
      rating: {
          type: DataTypes.DECIMAL(2,1),
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
            app.get('/flash', function(req, res){
              res.redirect('back');
            });
            throw new Error('Require either both title and body or neither')
          }
        }
      }
    });
    
    Review.associate = function(models) {
        //Review also belongs to a Blog
        Review.belongsTo(models.Blog, {
          foreignKey: {
            allowNull: false
          }
        });
        // Review belongs to a User
        Review.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });
      };
  
    return Review;
  };
  