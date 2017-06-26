describe("Modules", () => {

	class ZooService {
		constructor() {
			this._zoo = new Zoo();
		}
		hasAnimal(animal) {
			return this._zoo.hasAnimal(animal);
		}
		removeAnimal(animal) {
			return this._zoo.removeAnimal(animal);
		}
	}

	const savioGuardComponent = {
		template: `Savio is {{$ctrl.getSavioStatus()}}`,
		controller: class SavioGuardController {
			constructor(zooService) {
				this._zooService = zooService;
			}
			getSavioStatus() {
				if (this._zooService.hasAnimal('savio')) {
					return 'here';
				} else {
					return 'escaped';
				}
			}
		}
	};

	it('are like packages of things', () => {
		angular.module('zoo', [])
			.service('zooService', ZooService)
			.component('savioGuard', savioGuardComponent);

		const wrapper = testbed.use('zoo')
			.compile(`<savio-guard></savio-guard>`);

		expect("Savio is here").toBeTextOf(wrapper);
	});

	class BestAnimalService {
		constructor(bestAnimal) {
			this._bestAnimal = bestAnimal;
		}
		getBestAnimal() {
			return this._bestAnimal;
		}
	}

	class BestAnimalServiceProvider {
		constructor() {
			this._bestAnimal = 'skipper';
		}
		setBestAnimal(newBestAnimal) {
			this._bestAnimal = newBestAnimal;
		}
		$get() {
			return new BestAnimalService(this._bestAnimal);
		}
	}

	const bestAnimalComponent = {
		template: `The best animal is {{$ctrl.getBestAnimal()}}`,
		controller: class BestAnimalController {
			constructor(bestAnimalService) {
				this._bestAnimalService = bestAnimalService;
			}
			getBestAnimal() {
				return this._bestAnimalService.getBestAnimal();
			}
		}
	}

	it('can configure providers before any use of them', () => {
		angular.module('zoo', [])
			.provider('bestAnimalService', BestAnimalServiceProvider)
			.config((bestAnimalServiceProvider) => {
				bestAnimalServiceProvider.setBestAnimal('rico');
			})
			.component('bestAnimal', bestAnimalComponent);

		const wrapper = testbed.use('zoo')
			.compile(`<best-animal></best-animal>`);

		const bestAnimalService = testbed.getService('bestAnimalService');
		expect("The best animal is rico").toBeTextOf(wrapper);
	});

	it('can combine modules into one single module', () => {
		angular.module('zoo.services', []).service('zooService', ZooService);
		angular.module('zoo.components', []).component('savioGuard', savioGuardComponent);
		angular.module('zoo', [
			'zoo.services',
			'zoo.components',
		]);

		const wrapper = testbed.use('zoo')
			.compile(`<savio-guard></savio-guard>`);

		expect("Savio is here").toBeTextOf(wrapper);
	});

	it('uses <div ng-app="moduleName">...</div> directive to use a module', () => {
		angular.module('zoo.services', []).service('zooService', ZooService);
		angular.module('zoo.components', []).component('savioGuard', savioGuardComponent);
		angular.module('zoo', [
			'zoo.services',
			'zoo.components',
		]);

		const wrapper = testbed.compile(`
			<div ng-app="zoo">
				<savio-guard></savio-guard>
			</div>
		`);

		expect("Savio is here").toBeTextOf(wrapper);
	});

});