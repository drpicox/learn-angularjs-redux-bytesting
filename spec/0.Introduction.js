describe("Introduction", () => {

	it("You must make all tests pass like this one", () => {
		expect(true).toBe(true);
	});

	it("Your first test to pass, change only expect(contents)", () => {
		// replace false by true
		expect(true).toBe(true);
	});

	it("Use \"hint\" if you're get stuck", () => {
		expect(true).toBe(true);
	});

	describe("More about javascript", () => {

		describe("More kinds of strings", () => {

			it("You can use ' instead of \" to write strings", () => {
				expect("hello").toBe('hello');
			});

			it("You can use ` instead of \" to write strings", () => {
				expect(`hello`).toBe(`hello`);
			});

			it("Strings with `` can be multiline, adds \\n automatically", () => {
				expect(`hello
world`).toBe(`hello
world`)
			});

			it('strings with `` can use interpolation with ${expression}', () => {
				const saluteTo = "world";

				expect(`hello world`).toBe(`hello ${saluteTo}`);
			});
		});

		describe("A little bit about arrays", () => {

			it("You can use [...array] to copy an array", () => {
				const array = [1,2,3];
				expect([1,2,3]).toEqual([...array]);
			});

			it("You can use [...array, elem] to copy an array and add an element to the end", () => {
				const array = [1,2,3];
				expect([1,2,3, 4, 5]).toEqual([...array, 4, 5]);
			});

		});

	});

});