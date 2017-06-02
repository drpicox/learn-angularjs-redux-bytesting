describe("Redux", () => {

	const jsonStoreComponent = {
				template: `{{$ctrl.getJsonState()}}`,
				controller: class JsonStoreController {
					constructor(store) {
						this.store = store;
					}
					getJsonState() {
						return JSON.stringify(this.store.getState());
					}
				}
			};

	describe('state', () => {

		it('requires "com.drpicox.angularjs-redux" module and initial store.getState() is {}', () => {
			const state = testbed
				.use('com.drpicox.angularjs-redux')
				.getState();

			expect(solveme).toEqual(state);
		});

		it('store can be injected', () => {
			angular.module('jsonStateApp', ['com.drpicox.angularjs-redux'])
				.component('jsonState', {
						template: `{{$ctrl.getJsonState()}}`,
						controller: class JsonStoreController {
							constructor(store) {
								this._store = store;
							}
							getJsonState() {
								return JSON.stringify(this._store.getState());
							}
						}
					});

			const wrapper = testbed.use('jsonStateApp')
				.compile('<json-state></json-state>');

			expect(solveme).toBeTextOf(wrapper);
		});

	});

	describe('reducer', () => {
		it('you can configure a new reducer with initial value', () => {
			angular.module('constantThreeApp', ['com.drpicox.angularjs-redux'])
				.config((reducerProvider) => {
					// here register a new reducer to the app state reducers
					reducerProvider.add('constantThree', (state, action) => {
						return 3;
					});
				});

			const state = testbed.use('constantThreeApp').getState();
			expect(solveme).toEqual(state);
		});

		it('you can configure multiple reducers', () => {
			angular.module('zooApp.reducers.name', [])
				.config((reducerProvider) => {
					const initialState = 'Hoboken';
					const nameReducer = (state = initialState, action) => {
						return state;
					};
					reducerProvider.add('name', nameReducer);
				});

			angular.module('zooApp.reducers.animals', [])
				.config((reducerProvider) => {
					const animalsReducer = (state = [], action) => {
						return state;
					};
					reducerProvider.add('animals', animalsReducer);
				});

			angular.module('zooApp.reducers', [
				'com.drpicox.angularjs-redux',

				'zooApp.reducers.name',
				'zooApp.reducers.animals',
			]);

			const state = testbed.use('zooApp.reducers').getState();
			expect(solveme).toEqual(state);
		});

		it('reducers can respond to dispatched actions', () => {
			angular.module('counterApp', ['com.drpicox.angularjs-redux'])
				.config((reducerProvider) => {
					const countReducer = (state = 0, action) => {
						switch (action.type) {
							case 'INCREMENT':
								return state + 1;
							default:
								return state;
						}
					};

					reducerProvider.add('count', countReducer);
				});

			const state = testbed.use('counterApp')
				.dispatch({type: 'INCREMENT'})
				.getState();

			expect(solveme).toEqual(state);		
		});

		it('reducers never modify the state', () => {
			angular.module('animalsApp', ['com.drpicox.angularjs-redux'])
				.config((reducerProvider) => {
					const animalsReducer = (state = [], action) => {						
						switch (action.type) {
							case 'ADD_ANIMAL':
								return [...state, action.animal];
							default:
								return state;
						}
					};

					reducerProvider.add('animals', animalsReducer);
				});

			const state = testbed.use('animalsApp')
				.dispatch({type: 'ADD_ANIMAL', animal: 'savio'})
				.getState();

			expect(solveme).toEqual(state);		
		});

		it('reducers can use auxiliary reducers', () => {
			angular.module('animalsApp', ['com.drpicox.angularjs-redux'])
				.config((reducerProvider) => {
					const animalReducer = (state = {}, action) => {
						switch (action.type) {
							case 'ADD_ANIMAL':
								return {
									name: action.name,
									present: true
								};
							case 'BREAK_ANIMAL_OUT':
								if (state.name !== action.name) {
									return state;
								}

								// makes a copy of state and changes it
								return Object.assign({}, state, {
									present: false,
								});
							default:
								return state;
						}
					};
					
					const animalsReducer = (state = [], action) => {						
						switch (action.type) {
							case 'ADD_ANIMAL':
								return [...state, animalReducer(undefined, action)];
							case 'BREAK_ANIMAL_OUT':
								return state.map(animal => animalReducer(animal, action));
							default:
								return state;
						}
					};

					reducerProvider.add('animals', animalsReducer);
				});

			const state = testbed.use('animalsApp')
				.dispatch({type: 'ADD_ANIMAL', name: 'savio'})
				.dispatch({type: 'ADD_ANIMAL', name: 'lulu'})
				.dispatch({type: 'BREAK_ANIMAL_OUT', name: 'savio'})
				.getState();

			expect(solveme).toEqual(state);		
		});
	});

	describe('dispatcher', () => {

		it('you can create reusable action dispatchers', () => {
			angular.module('counterApp', ['com.drpicox.angularjs-redux'])
				.config((dispatcherProvider) => {
					dispatcherProvider.add('increment', () => {
						return { type: 'INCREMENT' };
					});
				});

			const dispatcher = testbed.use('counterApp').getService('dispatcher');

			dispatcher.increment();
			expect(solveme).toEqual(testbed.getLastDispatchedAction());
		});

		it('action constructor for dispatch can have parameters', () => {
			angular.module('counterApp', ['com.drpicox.angularjs-redux'])
				.config((dispatcherProvider) => {
					dispatcherProvider.add('addAnimal', (name) => {
						return { 
							type: 'ADD_ANIMAL',
							name: name,
						};
					});
				});

			const dispatcher = testbed.use('counterApp').getService('dispatcher');

			dispatcher.addAnimal('savio');
			expect(solveme).toEqual(testbed.getLastDispatchedAction());
		});

		it('dispatched actions triggers reducers', () => {
			angular.module('counterApp.actions', [])
				.config((dispatcherProvider) => {
					dispatcherProvider.add('increment', () => {
						return { type: 'INCREMENT' };
					});
				});

			angular.module('counterApp.reducers', [])
				.config((reducerProvider) => {
					const countReducer = (state = 0, action) => {
						switch (action.type) {
							case 'INCREMENT':
								return state + 1;
							default:
								return state;
						}
					};

					reducerProvider.add('count', countReducer);
				});

			angular.module('counterApp', [
					'com.drpicox.angularjs-redux',

					'counterApp.actions',
					'counterApp.reducers',
				])

			const dispatcher = testbed.use('counterApp').getService('dispatcher');

			dispatcher.increment();
			expect(solveme).toEqual(testbed.getState())
		});

		it('dispatcher can be injected and used into controllers', () => {
			angular.module('counterApp.actions', [])
				.config((dispatcherProvider) => {
					dispatcherProvider.add('increment', () => {
						return { type: 'INCREMENT' };
					});
				});

			angular.module('counterApp.components', [])
				.component('incrementer', {
					template: `<button ng-click="$ctrl.increment()"></button>`,
					controller: class IncrementerController {
						constructor(dispatcher) {
							this._dispatcher = dispatcher;
						}
						increment() {
							this._dispatcher.increment();
						}
					}
				});

			angular.module('counterApp', [
					'com.drpicox.angularjs-redux',

					'counterApp.actions',
					'counterApp.components',
				]);

			const wrapper = testbed.use('counterApp')
				.compile('<incrementer></incrementer>');

			wrapper.click('button');
			expect(solveme).toEqual(testbed.getLastDispatchedAction());
		});
	});

});