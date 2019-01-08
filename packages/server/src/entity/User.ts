import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	OneToMany,
} from "typeorm";

import Todo from "./Todo";

@Entity("users")
export default class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column("text", { unique: true })
	name: string;

	@Column("text")
	password: string;

	@OneToMany(() => Todo, todo => todo.user)
	todos: Todo[];
}
