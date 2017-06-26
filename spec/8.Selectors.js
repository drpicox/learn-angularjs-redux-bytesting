// we are using reselect library https://github.com/reactjs/reselect
describe("Selectors", () => {

	beforeEach(() => {
		angular.module('zooApp.actions', [
			'zooApp.actions.addAnimal',
			'zooApp.actions.breakAnimalOut',
			'zooApp.actions.setName',
		]);

		angular.module('zooApp.actions.addAnimal', [])
			.config((dispatcherProvider) => {
					const addAnimal = (name) => {
						return {
							type: 'ADD_ANIMAL',
							name: name,
						};
					};

					dispatcherProvider.add('addAnimal', addAnimal);
				});

		angular.module('zooApp.actions.breakAnimalOut', [])
			.config((dispatcherProvider) => {
					const breakAnimalOut = (name) => {
						return {
							type: 'BREAK_ANIMAL_OUT',
							name: name,
						};
					};

					dispatcherProvider.add('breakAnimalOut', breakAnimalOut);
				});

		angular.module('zooApp.actions.setName', [])
			.config((dispatcherProvider) => {
					const setName = (name) => {
						return {
							type: 'SET_NAME',
							name: name,
						};
					};

					dispatcherProvider.add('setName', setName);
				});

	});

	beforeEach(() => {
		angular.module('zooApp.reducers', [
			'zooApp.reducers.animals',
			'zooApp.reducers.name',
		]);

		angular.module('zooApp.reducers.animals', [])
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

							return Object.assign({}, state, {
								present: false,
							});
						default:
							return state;
					}
				};
				
				const animalsReducer = (state = [
						{ name: 'savio', present: true },
					], action) => {						
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

		angular.module('zooApp.reducers.name', [])
			.config((reducerProvider) => {
				const nameReducer = (state = 'Hoboken', action) => {						
					switch (action.type) {
						case 'SET_NAME':
							return action.name;
						default:
							return state;
					}
				};

				reducerProvider.add('name', nameReducer);
			});
	});

	it('selector has a default getter that returns the state', () => {
		angular.module('zooApp', [
				'com.drpicox.angularjs-redux',

				'zooApp.actions',
				'zooApp.reducers',
			]);

		const selector = testbed.use('zooApp').getService('selector');
		expect({ animals: [ Object({ name: 'savio', present: true }) ], name: 'Hoboken' }).toEqual(selector.getState());
	});

	it('a selector can be configured to get a simple partial retrieval', () => {
		angular.module('zooApp.selectors', [])
			.config((selectorProvider) => {
				const getName = (state) => {
					return state.name;
				};

				selectorProvider.add('getName', getName);
			});

		angular.module('zooApp', [
				'com.drpicox.angularjs-redux',

				'zooApp.actions',
				'zooApp.reducers',
				'zooApp.selectors',
			]);

		const selector = testbed.use('zooApp').getService('selector');
		expect('Hoboken').toEqual(selector.getName());
	});

	it('a selector can return computed data', () => {
		angular.module('zooApp.selectors', [])
			.config((selectorProvider) => {
				const getAnimalNames = (state) => {
					return state.animals.map(animal => animal.name);
				};

				selectorProvider.add('getAnimalNames', getAnimalNames);
			});

		angular.module('zooApp', [
				'com.drpicox.angularjs-redux',

				'zooApp.actions',
				'zooApp.reducers',
				'zooApp.selectors',
			]);

		const selector = testbed.use('zooApp').getService('selector');
		expect([ 'savio' ]).toEqual(selector.getAnimalNames());
	});

	it('a selector are injected of other getter selectors results as inputs', () => {

		angular.module('zooApp.selectors', [
			'zooApp.selectors.getAnimals',
			'zooApp.selectors.getPresentAnimalNames',
		]);

		angular.module('zooApp.selectors.getAnimals', [])
			.config((selectorProvider) => {
				const getAnimals = (state) => {
					return state.animals;
				};

				selectorProvider.add('getAnimals', getAnimals);
			});

		angular.module('zooApp.selectors.getPresentAnimalNames', [])
			.config((selectorProvider) => {
				const getPresentAnimalNames = (animals) => {
					return animals
						.filter(animal => animal.present)
						.map(animal => animal.name);
				};

				selectorProvider.add('getPresentAnimalNames', getPresentAnimalNames);
			});

		angular.module('zooApp', [
				'com.drpicox.angularjs-redux',

				'zooApp.actions',
				'zooApp.reducers',
				'zooApp.selectors',
			]);

		const selector = testbed.use('zooApp').getService('selector');
		expect([ 'savio' ]).toEqual(selector.getPresentAnimalNames());
	});

	it('a selectors react to state changes', () => {

		angular.module('zooApp.selectors', [
			'zooApp.selectors.getAnimals',
			'zooApp.selectors.getPresentAnimalNames',
		]);

		angular.module('zooApp.selectors.getAnimals', [])
			.config((selectorProvider) => {
				const getAnimals = (state) => {
					return state.animals;
				};

				selectorProvider.add('getAnimals', getAnimals);
			});

		angular.module('zooApp.selectors.getPresentAnimalNames', [])
			.config((selectorProvider) => {
				const getPresentAnimalNames = (animals) => {
					return animals
						.filter(animal => animal.present)
						.map(animal => animal.name);
				};

				selectorProvider.add('getPresentAnimalNames', getPresentAnimalNames);
			});

		angular.module('zooApp', [
				'com.drpicox.angularjs-redux',

				'zooApp.actions',
				'zooApp.reducers',
				'zooApp.selectors',
			]);

		testbed.use('zooApp');
		const selector = testbed.getService('selector');
		const dispatcher = testbed.getService('dispatcher');

		expect([ 'savio' ]).toEqual(selector.getPresentAnimalNames());

		dispatcher.addAnimal('lulu');
		expect([ 'savio', 'lulu' ]).toEqual(selector.getPresentAnimalNames());

		dispatcher.breakAnimalOut('savio');
		expect([ 'lulu' ]).toEqual(selector.getPresentAnimalNames());
	});


});