describe("Introduction", () => {

	it("You must make all tests pass like this one", () => {
		expect(true).toBe(true);
	});

	it("Your first test to pass, change only expect(contents)", () => {
		// replace false by true
		expect(false).toBe(true);
	});

	it("Use \"hint\" if you're get stuck", () => {
		expect("hint").toBe(true);
	});

	describe("More about javascript", () => {

		describe("More kinds of strings", () => {

			it("You can use ' instead of \" to write strings", () => {
				expect(solveme).toBe('hello');
			});

			it("You can use ` instead of \" to write strings", () => {
				expect(solveme).toBe(`hello`);
			});

			it("Strings with `` can be multiline, adds \\n automatically", () => {
				expect(solveme).toBe(`hello
world`)
			});

			it('strings with `` can use interpolation with ${expression}', () => {
				const saluteTo = "world";

				expect(solveme).toBe(`hello ${saluteTo}`);
			});
		});

		describe("A little bit about arrays", () => {

			it("You can use [...array] to copy an array", () => {
				const array = [1,2,3];
				expect(solveme).toEqual([...array]);
			});

			it("You can use [...array, elem] to copy an array and add an element to the end", () => {
				const array = [1,2,3];
				expect(solveme).toEqual([...array, 4, 5]);
			});

		});

	});

});