import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

Recipes = new Mongo.Collection('recipes');

//Who is allowed to insert recipes (user if id is found)
Recipes.allow({
    insert:function(userId, doc){
      return !!userId;
    },
    update: function(userId, doc){
      return !!userId;
    }
});
Ingredient = new SimpleSchema({
    name:{
      type: String
    },
    amount: {
      type:String
    }
});


RecipeSchema =  new SimpleSchema({
      name: {
          type: String,
          label: "Name"
      },
      desc: {
        type: String,
        label: "Description"
      },
      ingredients: {
        type: Array
      },
        'ingredients.$': {
              type: Object
        },
        'ingredients.$.name': {
              type: String
        },
        'ingredients.$.amount': {
              type: String
        },
        inMenu:{
          type: Boolean,
          defaultValue: false,
          optional:true,
          autoform:{
            type:"hidden"
          }
        },
       author: {
         type: String,
         label: "Author",
         autoform: {
           type:"hidden"
         },
         autoValue: function(){
           return this.userId;
        },
           }, createdAt: {
             type: Date,
             label: "CreatedAt",
             autoform: {
               type:"hidden"
             },
             autoValue: function() {
               return new Date();
             },
           }
});

Meteor.methods({
    toggleMenuItem: function(id, currentState){
      Recipes.update(id, {
        $set: {
          inMenu:!currentState
        }
      });
    }
});

Recipes.attachSchema( RecipeSchema);
