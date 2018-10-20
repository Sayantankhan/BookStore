const graphql = require('graphql')
const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList} = graphql;

//const dummyData = require('../dummy/dummyData');
const Book = require('../model/book');
const Author = require('../model/author');

const Booktype = new GraphQLObjectType({
    name: 'Books',
    fields: ()=>({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: Authortype,
            resolve(parent,args){
                // using same authorId from books(i.e parent)
                //return dummyData.findAuthor(parent.authorId)
                return Author.findById(parent.authorId)
            }
        }
    })
});

const Authortype = new GraphQLObjectType({
    name: 'Author',
    fields: ()=>({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: GraphQLList(Booktype),
            resolve(parent,args){
                //return dummyData.findBookWrittenByAuthor(parent.id)
                return Book.find({authorId: parent.id})

            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book : {//query : book(id : 'abc123')
            type: Booktype,
            args: {id: {type: GraphQLID}},
            resolve(parent,args){
                return Book.findById(args.id)
            }
        },
        booksByGenre:{
            type: GraphQLList(Booktype),
            args: {genre : {type: GraphQLString}},
            resolve(parent,args){
                return Book.find({genre : args.genre})
            }
        },
        author : {
            type: GraphQLList(Authortype),
            args: {name: {type: GraphQLString}},
            resolve(parent,args){
                //return dummyData.findAuthor(args.id)
               return Author.find({name:args.name});
            }
        },
        books : {
            type: new GraphQLList(Booktype),
            resolve(parent,args){
               //return dummyData.findAllBooks()
                return Book.find({});
            }
        },
        authors : {
            type: GraphQLList(Authortype),
            resolve(parent,args){
                //return dummyData.findAllAuthors()
                return Author.find({})
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        addAnAuthor:{
            type: Authortype,
            args:{
                name: {type: GraphQLString},
                age: {type: GraphQLInt}
            },
            resolve(parent,args){
                let new_author = new Author({
                    name: args.name,
                    age: args.age
                });
                return new_author.save();
            }
        },
        addABook:{
            type: Booktype,
            args:{
                name: {type: GraphQLString},
                genre: {type: GraphQLString},
                authorId: {type: GraphQLID}
            },
            resolve(parent,args){
                let new_book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                return new_book.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query : RootQuery,
    mutation: Mutation
});