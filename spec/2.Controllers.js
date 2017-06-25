describe("Controllers", () => {

	// See src/ZooController.js

	it("Templates can have controllers", () => {
		const wrapper = testbed
			.compile("<div>Welcome to {{ $ctrl.getName() }}</div>")
			.withController(ZooController);
			
		expect("Welcome to Hoboken").toBeTextOf(wrapper);
	});

	it("Templates can read controller attributes", () => {
		const wrapper = testbed
			.compile("<div>Welcome to {{ $ctrl.newName }}</div>")
			.withController(ZooController);
			
		expect("Welcome to Hoboken").toBeTextOf(wrapper);
	});

	it("Angular watches for changes and updates views", () => {
		const wrapper = testbed
			.compile("<div>Welcome to {{ $ctrl.getName() }}</div>")
			.withController(ZooController);
			
		wrapper.$ctrl.newName = 'Central Park Zoo';
		wrapper.$ctrl.updateName();
		expect("Welcome to Central Park Zoo").toBeTextOf(wrapper);
	});


});