describe("Injections", () => {

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

	it('angular manages the creation of service instances', () => {
		const zooService = testbed
			.service('zooService', ZooService)
			.getService('zooService');

		expect(zooService).toBeInstanceOf(ZooService);
	});

	class SavioGuardService {
		// angular injects a service with name "zooService"
		constructor(zooService) {
			this._zooService = zooService;
		}
		isSavioHere() {
			return this._zooService.hasAnimal('savio');
		}
	}

	it('injects services into other services using constructor argument names', () => {
		const savioGuardService = testbed
			.service('zooService', ZooService)
			.service('savioGuardService', SavioGuardService)
			.getService('savioGuardService');

		expect(true).toBe(savioGuardService.isSavioHere());
	});

	class SavioEscapeService {
		constructor(zooService) {
			this._zooService = zooService;
		}
		breakSavioOut() {
			this._zooService.removeAnimal('savio');
		}
	}

	it('injects always inject the same instance into all services', () => {
		testbed
			.service('zooService', ZooService)
			.service('savioGuardService', SavioGuardService)
			.service('savioEscapeService', SavioEscapeService);

		const savioGuardService = testbed.getService('savioGuardService');
		const savioEscapeService = testbed.getService('savioEscapeService');

		// initially it is in the zoo instance (as expect(solveme)
		expect(true).toBe(savioGuardService.isSavioHere());

		// but... it escapes from the zoo instance using another service
		savioEscapeService.breakSavioOut();
		expect(false).toBe(savioGuardService.isSavioHere());
	});

	let schrodingerCatObserved;
	beforeEach(() => schrodingerCatObserved = false);
	class SchrodingerCatService {
		constructor() {
			schrodingerCatObserved = true;
		}
	}

	it('does not creates services until they are requested', () => {
		testbed.service('schrodingerCatService', SchrodingerCatService);

		// no one is using it
		expect(false).toBe(schrodingerCatObserved);

		// now we will use it
		const schrodingerCatService = testbed.getService('schrodingerCatService');
		expect(true).toBe(schrodingerCatObserved);
	});

	it('does not creates services until they are requested including other services', () => {
		testbed
			.service('schrodingerCatService', SchrodingerCatService)
			.service('boxExperimentService', class BoxExperimentService {
				constructor (schrodingerCatService) {
					// ...
				}
			});

		// no one is using it
		expect(false).toBe(schrodingerCatObserved);

		// now we will use it
		const boxExperimentService = testbed.getService('boxExperimentService');
		expect(true).toBe(schrodingerCatObserved);
	});

	const savioGuardComponent = {
		template: `Savio is {{$ctrl.getSavioStatus()}}`,
		controller: class SavioGuardController {
			constructor(savioGuardService) {
				this._savioGuardService = savioGuardService;
			}
			getSavioStatus() {
				if (this._savioGuardService.isSavioHere()) {
					return 'here';
				} else {
					return 'escaped';
				}
			}
		}
	};

	it('injects also services into component controller constructors', () => {
		const wrapper = testbed
			.service('zooService', ZooService)
			.service('savioGuardService', SavioGuardService)
			.component('savioGuard', savioGuardComponent)
			.compile(`<savio-guard></savio-guard>`);

		expect("Savio is here").toBeTextOf(wrapper);
	});

	it('component observes changes in services', () => {
		const wrapper = testbed
			.service('zooService', ZooService)
			.service('savioGuardService', SavioGuardService)
			.service('savioEscapeService', SavioEscapeService)
			.component('savioGuard', savioGuardComponent)
			.compile(`<savio-guard></savio-guard>`);

		const savioEscapeService = testbed.getService('savioEscapeService');

		// initially...
		expect("Savio is here").toBeTextOf(wrapper);

		// but...
		savioEscapeService.breakSavioOut();
		expect("Savio is escaped").toBeTextOf(wrapper);		
	});

	const savioHenchmanComponent = {
		template: `<button ng-click="$ctrl.sneakSavioOut()"></button>`,
		controller: class SavioHenchmanComponent {
			constructor(savioEscapeService) {
				this._savioEscapeService = savioEscapeService;
			}
			sneakSavioOut() {
				this._savioEscapeService.breakSavioOut();
			}
		}
	};

	it('components can interact with services and changes are observed by other components', () => {
		const wrapper = testbed
			.service('zooService', ZooService)
			.service('savioGuardService', SavioGuardService)
			.service('savioEscapeService', SavioEscapeService)
			.component('savioGuard', savioGuardComponent)
			.component('savioHenchman', savioHenchmanComponent)
			.compile(`
					<savio-guard></savio-guard>
					<savio-henchman></savio-henchman>
			`);

		// initially...
		expect("Savio is here").toBeTextOf(wrapper);

		// but...
		wrapper.click('button');
		expect("Savio is escaped").toBeTextOf(wrapper);		
	});

	class BestAnimalService {
		constructor(bestAnimal) {
			this._bestAnimal = bestAnimal;
		}
		getBestAnimal() {
			return this._bestAnimal;
		}
	}

	class BestAnimalEverServiceProvider {
		$get() {
			return new BestAnimalService('skipper');
		}
	}

	it('can use service builders called providers with $get method', () => {
		testbed.provider('bestAnimalService', BestAnimalEverServiceProvider);

		const bestAnimalService = testbed.getService('bestAnimalService');
		expect("skipper").toBe(bestAnimalService.getBestAnimal());
	});

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

	it('can configure providers before any use of them', () => {
		testbed
			.provider('bestAnimalService', BestAnimalServiceProvider)
			.config((bestAnimalServiceProvider) => {
				bestAnimalServiceProvider.setBestAnimal('rico');
			});

		const bestAnimalService = testbed.getService('bestAnimalService');
		expect("rico").toBe(bestAnimalService.getBestAnimal());
	});

	class EvilAnimalGuardService {
		constructor(evilAnimal, zooService) {
			this._evilAnimal = evilAnimal;
			this._zooService = zooService;
		}
		isHere() {
			return this._zooService.hasAnimal(this._evilAnimal);
		}
	}

	class EvilAnimalGuardServiceProvider {
		constructor() {
			this._evilAnimal = 'savio';
		}
		setEvilAnimal(newEvilAnimal) {
			this._evilAnimal = newEvilAnimal;
		}
		$get(zooService) {
			return new EvilAnimalGuardService(this._evilAnimal, zooService);
		}
	}


	it('can inject other services in the $get method', () => {
		testbed
			.service('zooService', ZooService)
			.provider('evilAnimalGuardService', EvilAnimalGuardServiceProvider)
			.config((evilAnimalGuardServiceProvider) => {
				evilAnimalGuardServiceProvider.setEvilAnimal('rhonda');
			});

		const evilAnimalGuardService = testbed.getService('evilAnimalGuardService');
		expect(false).toBe(evilAnimalGuardService.isHere());
	});


});