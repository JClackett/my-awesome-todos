/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Me
// ====================================================

export interface Me_me {
  id: string;
  name: string;
}

export interface Me {
  me: Me_me | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Login
// ====================================================

export interface Login_login {
  id: string;
  name: string;
}

export interface Login {
  login: Login_login | null;
}

export interface LoginVariables {
  name: string;
  password: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Logout
// ====================================================

export interface Logout {
  logout: boolean | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Register
// ====================================================

export interface Register_register {
  id: string;
  name: string;
}

export interface Register {
  register: Register_register | null;
}

export interface RegisterVariables {
  name: string;
  password: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetTodos
// ====================================================

export interface GetTodos_todos {
  id: string;
  text: string;
  completed: boolean;
}

export interface GetTodos {
  todos: (GetTodos_todos | null)[] | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateTodo
// ====================================================

export interface CreateTodo_createTodo {
  id: string;
  text: string;
  completed: boolean;
}

export interface CreateTodo {
  createTodo: CreateTodo_createTodo | null;
}

export interface CreateTodoVariables {
  text: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DestroyTodo
// ====================================================

export interface DestroyTodo_destroyTodo {
  id: string;
}

export interface DestroyTodo {
  destroyTodo: DestroyTodo_destroyTodo | null;
}

export interface DestroyTodoVariables {
  id: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateTodo
// ====================================================

export interface UpdateTodo_updateTodo {
  id: string;
  text: string;
  completed: boolean;
}

export interface UpdateTodo {
  updateTodo: UpdateTodo_updateTodo | null;
}

export interface UpdateTodoVariables {
  id: string;
  text?: string | null;
  completed?: boolean | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
