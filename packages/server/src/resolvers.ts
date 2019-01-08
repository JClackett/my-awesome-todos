import * as bcrypt from "bcrypt";
import { IResolvers } from "graphql-tools";
import { Todo, User } from "./entity";

export const resolvers: IResolvers = {
	Query: {
		todos: (_, __, { req }) => {
			if (!req.session || !req.session.userId) {
				throw new Error("not authenticated");
			}
			return Todo.find({
				where: { user: req.session.userId },
				order: { id: "DESC" },
			});
		},
		me: async (_, __, { req }) => {
			if (!req.session || !req.session.userId) return null;
			const user = await User.findOne(req.session.userId);
			if (!user) throw new Error("not authenticated");
			return user;
		},
	},
	Mutation: {
		createTodo: async (_, { text }, { req }) => {
			if (!req.session || !req.session.userId) {
				throw new Error("not authenticated");
			}
			const todo = await Todo.create({ user: req.session.userId, text }).save();
			return todo;
		},
		updateTodo: async (_, { id, text, completed }) => {
			const todo = await Todo.findOne(id);
			if (!todo) return null;
			if (text != undefined) {
				todo.text = text;
			}
			if (completed != undefined) {
				todo.completed = completed;
			}
			await todo.save();
			return todo;
		},
		destroyTodo: async (_, { id }) => {
			const todo = await Todo.findOne(id);
			if (!todo) return null;
			const todoCopy = { ...todo };
			await todo.remove();
			return todoCopy;
		},
		register: async (_, { name, password }, { req }) => {
			const existingUser = await User.findOne({ where: { name } });
			if (existingUser) throw new Error("Name already in use");
			const hashedPassword = await bcrypt.hash(password, 10);
			const user = await User.create({ name, password: hashedPassword }).save();
			req.session.userId = user.id;
			return user;
		},
		login: async (_, { name, password }, { req }) => {
			const user = await User.findOne({ where: { name } });
			if (!user) throw new Error("Invalid name or password");
			const valid = await bcrypt.compare(password, user.password);
			if (!valid) throw new Error("Invalid name or password");
			req.session.userId = user.id;
			return user;
		},
		logout: async (_, __, { req, res }) => {
			await new Promise(res => req.session.destroy(() => res()));
			res.clearCookie("connect.sid");
			return true;
		},
		updateUser: async (_, { name }, { req }) => {
			if (!req.session || !req.session.userId) {
				throw new Error("not authenticated");
			}
			const user = await User.findOne(req.session.userId);
			if (!user) return null;
			if (name != undefined) user.name = name;
			await user.save();
			return user;
		},
	},
};
