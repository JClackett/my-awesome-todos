import "reflect-metadata";
import "dotenv/config";
import { ApolloServer } from "apollo-server-express";
import * as express from "express";
import * as session from "express-session";
import * as Redis from "connect-redis";

const RedisStore = Redis(session);

import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";
import morgan = require("morgan");
import { createTypeormConn } from "./createTypeOrmCon";

const redisOptions: any = {
	development: {},
	production: {
		url: process.env.REDIS_URL,
	},
};

const env = process.env.NODE_ENV || "development";
const corsUrl =
	env == "production"
		? "https://my-awesome-todos.netlify.com"
		: "http://localhost:3000";

const startServer = async () => {
	const server = new ApolloServer({
		// These will be defined for both new or existing servers
		typeDefs,
		resolvers,
		introspection: true,
		context: ({ req, res }: any) => ({ req, res }),
	});

	await createTypeormConn();

	const app = express();

	app.use(morgan("dev")).use(
		session({
			store: new RedisStore(redisOptions[env]),
			secret: "reallyTastyApp",
			resave: false,
			cookie: {
				maxAge: 432000000,
			},
			saveUninitialized: false,
		}),
	);

	server.applyMiddleware({
		app,
		cors: {
			credentials: true,
			origin: corsUrl,
		},
	});

	app.listen({ port: process.env.PORT || 5000 }, () =>
		console.log(`Server ready 🚀`),
	);
};

startServer();
