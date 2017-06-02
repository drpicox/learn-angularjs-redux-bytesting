describe("Components", () => {

	describe('definition', () => {
		it('is a JSON + with controller', () => {
			const wrapper = testbed.mount({
				template: `{{$ctrl.newName}}`,
				controller: ZooController,
			});
			expect(solveme).toBeTextOf(wrapper);
		});

		it('may have no controller, then it has a default empty controller', () => {
			const wrapper = testbed.mount({
				template: `I have {{"an empty"}} controller`,
			});
			expect(solveme).toBeTextOf(wrapper);
		});

		it('has inputs', () => {
			const wrapper = testbed.mount({
				template: `{{$ctrl.anInput}}`,
				bindings: {
					anInput: '<',
				},
			});
			wrapper.setInput('anInput', 'Savio likes Mort');
			expect(solveme).toBeTextOf(wrapper);
		});

		it('has outputs', () => {
			const wrapper = testbed.mount({
				template: `<button ng-click="$ctrl.onSavioEscape({$event: 'to eat Mort'})"></button>`,
				bindings: {
					onSavioEscape: '&',
				},
			});
			let itEscapesTo;
			wrapper.onOutput('onSavioEscape', (reason) => { itEscapesTo = reason; });
			wrapper.click('button');
			expect(solveme).toBe(itEscapesTo);
		});
	});

	describe('invokation', () => {

		const demoComponent = {
			template: `I am a demo component`,
		};

		it('is invoked as new html elements', () => {
			const wrapper = testbed
				.component('demo', demoComponent)
				.compile(`<demo></demo>`);

			expect(solveme).toBeTextOf(wrapper);
		});

		it('the name is converted from camelCase to slug-case', () => {
			const wrapper = testbed
				.component('myDemo', demoComponent)
				.compile(`<my-demo></my-demo>`);

			expect(solveme).toBeTextOf(wrapper);
		});

		const helloComponent = {
			template: `
				Hello {{$ctrl.name}} {{$ctrl.lastName}}
			`,
			bindings: {
				name: '<',
				lastName: '<',
			}
		};

		it('input values are like attributes with javascript expressions', () => {
			const wrapper = testbed
				.component('hello', helloComponent)
				.compile(`<hello name="'Alice'"></hello>`);

			expect(solveme).toBeTextOf(wrapper);
		});

		it('inputs attribute names follows slug-case', () => {
			const wrapper = testbed
				.component('hello', helloComponent)
				.compile(`<hello name="'Officer'" last-name="'X'"></hello>`);

			expect(solveme).toBeTextOf(wrapper);
		});

		const tallyCounterComponent = {
			template: `
				<button ng-click="$ctrl.increaseCount()"></button>
			`,
			bindings: {
				onCount: '&',
			},
			controller: class TallyCounterController {
				increaseCount() {
					this.onCount({$event: 1});
				}
			},
		};

		it('outputs are executable expressions on slug-case attributes', () => {
			const wrapper = testbed
				.component('tallyCounter', tallyCounterComponent)
				.compile(`
					<tally-counter on-count="count = count + $event"></tally-counter>
					Count: {{ count }}
				`);

			// State before click
			wrapper.set('count', 0);
			expect(solveme).toBeTextOf(wrapper);

			// State after click
			wrapper.click('button');
			expect(solveme).toBeTextOf(wrapper);
		});

		const editNameComponent = {
			template: `
				<input ng-model="$ctrl.name" ng-change="$ctrl.updateName()">
			`,
			bindings: {
				name: '<',
				onNameChange: '&',
			},
			controller: class EditNameController {
				updateName() {
					this.onNameChange({ $event: this.name });
				}
			},
		};

		it('inputs and outputs can be combined', () => {
			const wrapper = testbed
				.component('editName', editNameComponent)
				.compile(`
					<edit-name name="name" on-name-change="name = $event"></edit-name>
					Name: {{name}}
				`);

			// Before any input change
			wrapper.set('name', 'savio');
			expect(solveme).toBeTextOf(wrapper);

			// After user changes the input
			wrapper.find('input').val('rhonda');
			expect(solveme).toBeTextOf(wrapper);
		});

	});

	describe('connecting components between them', () => {

		const helloComponent = {
			template: `
				Hello {{$ctrl.name}} {{$ctrl.lastName}}
			`,
			bindings: {
				name: '<',
				lastName: '<',
			}
		};

		const editNameComponent = {
			template: `
				<input ng-model="$ctrl.name" ng-change="$ctrl.updateName()">
			`,
			bindings: {
				name: '<',
				onNameChange: '&',
			},
			controller: class EditNameController {
				updateName() {
					this.onNameChange({ $event: this.name });
				}
			},
		};

		it('communicate side by side using template variables', () => {
			const wrapper = testbed
				.component('hello', helloComponent)
				.component('editName', editNameComponent)
				.compile(`
					<edit-name name="name" on-name-change="name = $event"></edit-name>
					<hello name="name"></hello>
				`);

			wrapper.find('input').val('savio');
			expect(solveme).toBeTextOf(wrapper);
		});

		it('parent component can invoke and coordine children components', () => {
			const wrapper = testbed
				.component('hello', helloComponent)
				.component('editName', editNameComponent)
				.component('zooNameEditor', {
					template: `
						<edit-name name="$ctrl.newName" on-name-change="$ctrl.updateName($event)"></edit-name>
						<hello name="$ctrl.newName"></hello>
					`,
					controller: class ZooNameEditor {
						constructor() {
							this._zoo = new Zoo();
							this.newName = this._zoo.name;
						}
						updateName(newName) {
							this.newName = this._zoo.name;
							this._zoo.name = new Name();
						}
					},
				})
				.compile(`<zoo-name-editor></zoo-name-editor>`);

			wrapper.find('input').val('Hoboken');
			expect(solveme).toBeTextOf(wrapper);
		});
	});
});