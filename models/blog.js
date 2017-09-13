module.exports = function(sequelize, DataTypes) {
    var Blog = sequelize.define("Blog", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        website: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [1],
              isURL: true
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1, 180]
        },
        blog_author: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [1]
            }
        },
        cumulative_rating: {
            type: DataTypes.DECIMAL(3,2),
            len: [1]
        }
    },
    {
        timestamps: false 
    });
  
    // Associating Blog with Reviews
    Blog.associate = function(models) {
      // When an Blog is deleted, also delete any associated Reviews
      Blog.hasMany(models.Review, {
        onDelete: "cascade"
      });
    };
  
    return Blog;
  };
  
  