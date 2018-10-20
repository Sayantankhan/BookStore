const graphql = require('graphql')
const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList} = graphql;

const dummyData = require('../dummy/dummyData');

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
                return dummyData.findAuthor(parent.authorId)
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
                return dummyData.findBookWrittenByAuthor(parent.id)
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book : { //query : book(id : '123')
            type: Booktype,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                //code to get from db
                return dummyData.findBook(args.id)
            }
        },
        author : {
            type: Authortype,
            args: {id: {type: GraphQLID}},
            resolve(parent,args){
                return dummyData.findAuthor(args.id)
            }
        },
        books : {
            type: new GraphQLList(Booktype),
            resolve(parent,args){
                return dummyData.findAllBooks()
            }
        },
        authors : {
            type: GraphQLList(Authortype),
            resolve(parent,args){
                return dummyData.findAllAuthors()
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query : RootQuery
});