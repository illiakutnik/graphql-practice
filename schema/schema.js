const graphql = require('graphql')
const _ = require('lodash')

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLID,
	GraphQLInt
} = graphql

var books = [
	{ name: 'Lord 1', genre: 'fantasy', id: '1' },
	{ name: 'Lord 2', genre: 'fantasy', id: '2' }
]

var authors = [
	{ name: 'Terry', age: 66, id: '1' },
	{ name: 'John', age: 77, id: '2' }
]

const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString }
	})
})

const AuthorType = new GraphQLObjectType({
	name: 'Author',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt }
	})
})

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		book: {
			type: BookType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return _.find(books, { id: args.id })
			}
		},
		author: {
			type: AuthorType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return _.find(authors, { id: args.id })
			}
		}
	}
})

module.exports = new GraphQLSchema({
	query: RootQuery
})
