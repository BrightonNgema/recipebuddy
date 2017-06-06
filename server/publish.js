Meteor.publish ('recipes', function(){
  return Recipes.find({athor: this.userId});
});
