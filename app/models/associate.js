module.exports = {
    'user': {
        classMethods: {
            associate: function (models) {
                this.hasMany(models.awardRecord,{foreignKey: 'uid'});
            }
        }
    },
    'Param': {
        classMethods: {
            associate: function (models) {
                this.hasMany(models.Content);
            }
        }
    }
}