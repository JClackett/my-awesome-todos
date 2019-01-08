import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	ManyToOne,
} from "typeorm";
import User from "./User";

@Entity("todos")
export default class Todo extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column("text")
	text: string;

	@Column("boolean", { nullable: false, default: false })
	completed: boolean;

	@ManyToOne(() => User, user => user.todos)
	user: User;
}
