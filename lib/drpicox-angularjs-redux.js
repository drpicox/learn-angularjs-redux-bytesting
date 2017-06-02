angular.module('com.drpicox.angularjs-redux', [])
	.provider('reducer', class ReducerProvider {
		constructor() {
			this._reducers = {};
		}
		add(name, reducer) {
			if (this._reducers[name]) throw new Error(`Reducer "${name} already added"`);
			this._reducers[name] = reducer;
		}
		$get() {
			const reducerNames = Object.keys(this._reducers);
			const freezeds = new WeakSet();
			return (state = {}, action) => {
				let changed = false;
				let newState = {};

				reducerNames.forEach(name => {
					const reducer = this._reducers[name];
					const prevState = state[name];
					const nextState = reducer(prevState, action);
					if (nextState !== prevState) {
						changed = true;
					freeze(nextState);
					}
					newState[name] = nextState;
				});

				return changed ? Object.freeze(newState) : state;
			};

			function freeze(ob) {
				if (typeof ob === 'object') {
					Object.keys(ob).forEach(k => {
						const val = ob[k];
						if (typeof val === 'object' && !freezeds.has(val)) {
							freezeds.add(val);
							ob[k] = freeze(val);
						}
					});
				}
				Object.freeze(ob);
				return ob;
			}
		}
	})
	.service('$$dispatchLog', class DispatchLog {
		constructor() {
			this.actions = [];
		}
		log(action) {
			this.actions.push(action);
		}
		getLastAction() {
			return this.actions[this.actions.length - 1];
		}
	})
	.factory('store', (reducer, $$dispatchLog) => {
		const reduxStore = Redux.createStore(reducer
			, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
			);
		const store = {
			getState: reduxStore.getState,
			dispatch: (action) => {
				$$dispatchLog.log(action);
				reduxStore.dispatch(action);
			},
		};
		return store;
	})
	.provider('dispatcher', class DispatcherProvider {
		constructor() {
			this._makeActions = {};
		}
		add(name, makeAction) {
			if (this._makeActions[name]) throw new Error(`Dispatcher "${name} already added"`);
			this._makeActions[name] = makeAction;
		}
		$get(store) {
			const dispatcher = {_k: this};
			Object.keys(this._makeActions).forEach(name => {
				dispatcher[name] = (...args) => {
					const action = this._makeActions[name](...args);
					store.dispatch(action);
				};
			})

			Object.freeze(dispatcher);
			return dispatcher;
		}
	})
	.provider('selector', class SelectorProvider {
		constructor() {
			this._selectors = {
				getState: (state) => state
			};
		}
		add(name, selector) {
			if (this._selectors[name]) throw new Error(`Selector "${name} already added"`);
			if (typeof selector !== 'function') throw new Error(`Selector must be a function`);

			const inputSelectors = selector.toString()
				.match(/\(([^)]*)\)/)[1].split(',')
				.filter(x => x).map(x => x.trim())
				.map(injectName => (state) => {
					const getterName = `get${injectName[0].toUpperCase()}${injectName.slice(1)}`;
					if (!this._selectors[getterName]) {
						throw new Error(`Selector "${getterName}" required by "${name}(..${injectName}..)" not configured`);
					}
					return this._selectors[getterName](state);
				});

			this._selectors[name] = Reselect.createSelector(inputSelectors, selector);
		}
		$get(store) {
			const selector = {};
			Object.keys(this._selectors).forEach(name => {
				selector[name] = () => this._selectors[name](store.getState());
			});

			Object.freeze(selector);
			return selector;
		}
	})
	.run(($timeout) => {$timeout(100);$timeout(1000);$timeout(10000)});