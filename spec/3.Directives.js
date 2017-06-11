describe("Directives", () => {

	describe("ngIf", () => {
		it("Angular enhances HTML with its own directives", () => {
			const wrapper = testbed
				.compile(`<div ng-if="$ctrl.hasSavio()">Savio is here</div>`)
				.withController(ZooController);

			expect("Savio is here").toBeTextOf(wrapper);
		});

		it("shows its content only if the condition evaluates true", () => {
			const wrapper = testbed
				.compile(`Savio is <span ng-if="!$ctrl.hasSavio()">not </span>here`)
				.withController(ZooController);

			expect("Savio is here").toBeTextOf(wrapper);
		});

		it("reevaluates the condition when there are changes", () => {
			const wrapper = testbed
				.compile(`Savio is <span ng-if="!$ctrl.hasSavio()">not</span> here`)
				.withController(ZooController);

			wrapper.$ctrl.removeSavio();
			expect("Savio is not here").toBeTextOf(wrapper);
		});
	});

	describe("ngRepeat", () => {
		it('iterates over arrays', () => {
			const wrapper = testbed
				.compile(`<div ng-repeat="animal in $ctrl.getAnimals()">{{ animal }}</div>`)
				.withController(ZooController);

			expect("lulubarrysavio").toBeTextOf(wrapper);
		});
		it('observes changes', () => {
			const wrapper = testbed
				.compile(`<div ng-repeat="animal in $ctrl.getAnimals()">{{ animal }}</div>`)
				.withController(ZooController);

			wrapper.$ctrl.removeSavio();
			expect("lulubarry").toBeTextOf(wrapper);
		});
		it('accepts more directives/components inside', () => {
			const wrapper = testbed
				.compile(`
					<div ng-repeat="animal in $ctrl.getAnimals()">
					  <div ng-if="animal.length < 5">{{animal}}</div>
					</div>
				`).withController(ZooController);
			expect("lulu").toBeTextOf(wrapper);
		});
	});

	describe("ngClick", () => {
		it('triggers actions with mouse click', () => {
			const wrapper = testbed
				.compile(`
					Savio is <span ng-if="!$ctrl.hasSavio()">not</span> here
					<button ng-click="$ctrl.removeSavio()"></button>
				`).withController(ZooController);
				
			expect("Savio is here").toBeTextOf(wrapper);
			wrapper.click('button');
			expect("Savio is not here").toBeTextOf(wrapper);
		});
	});

	describe("ngModel", () => {
		it('initial value is the value inside the controller', () => {
			const wrapper = testbed
				.compile('<input ng-model="$ctrl.newName">')
				.withController(ZooController);

			expect("Hoboken").toBeValueOf(wrapper.find('input'));
		});
		it('if model value changes, input value is updated', () => {
			const wrapper = testbed
				.compile('<input ng-model="$ctrl.newName">')
				.withController(ZooController);

			wrapper.$ctrl.newName = 'Central Park Zoo';
			expect("Central Park Zoo").toBeValueOf(wrapper.find('input'));
		});
		it('if user changes input value, controller value is updated', () => {
			const wrapper = testbed
				.compile('<input ng-model="$ctrl.newName">')
				.withController(ZooController);

			wrapper.find('input').val('Bcn Zoo');
			expect("Bcn Zoo").toBe(wrapper.$ctrl.newName);
		});
		it('also updates all interpolations', () => {
			const wrapper = testbed
				.compile('<input ng-model="$ctrl.newName">{{ $ctrl.newName }}')
				.withController(ZooController);

			wrapper.find('input').val('Bcn Zoo');
			expect("Bcn Zoo").toBeTextOf(wrapper);
		});
	});

	describe("ngChange", () => {
		it('executes an expression when an input change', () => {
			const wrapper = testbed
				.compile(`<input ng-model="$ctrl.newName" ng-change="$ctrl.updateName()">`)
				.withController(ZooController);

			wrapper.find('input').val('Bcn Zoo');
			expect("Bcn Zoo").toBe(wrapper.$ctrl.getName());
		});
	});

});