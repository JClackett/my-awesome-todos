import * as React from "react";

declare module "react" {
	//
	// Hooks
	// ----------------------------------------------------------------------
	function useState<T>(initialState: T | (() => T)): [T, (newState: T) => void];
	function useEffect(
		create: () => void | (() => void),
		inputs?: ReadonlyArray<unknown>,
	): void;
	function useContext<T>(foo: React.Context<T>): T;
	function useReducer<S, A>(
		reducer: (state: S, action: A) => S,
		initialState: S,
	): [S, (action: A) => void];
	function useCallback<F extends (...args: never[]) => unknown>(
		callback: F,
		inputs?: ReadonlyArray<unknown>,
	): F;
	function useMemo<T>(create: () => T, inputs?: ReadonlyArray<unknown>): T;
	function useRef<T extends unknown>(initialValue?: T): React.RefObject<T>;
	function useImperativeMethods<T>(
		ref: React.Ref<T>,
		createInstance: () => T,
		inputs?: ReadonlyArray<unknown>,
	): void;
	type SpecialSFC<P = {}> = (props: P) => ReactElement<any> | null;

	function forwardRef<T, P = {}>(
		Component: RefForwardingComponent<T, P>,
	): SpecialSFC<P & ClassAttributes<T>>;

	type ComponentProps<T extends ComponentType<any>> = T extends ComponentType<
		infer P
	>
		? P
		: {};
	type ComponentPropsWithRef<
		T extends ComponentType<any>
	> = T extends ComponentClass<infer P>
		? P & React.ClassAttributes<InstanceType<T>>
		: T extends SFC<infer P>
		? P
		: {};

	function memo<T extends ComponentType<any>>(
		Component: T,
		compare?: (
			prevProps: Readonly<ComponentProps<T>>,
			nextProps: Readonly<ComponentProps<T>>,
		) => boolean,
	): SpecialSFC<ComponentPropsWithRef<T>>;
}
