describe("Numbers", () => {

	describe("constants", () => {

		it("1,2,5000 are numbers", () => {
			expect("solve me").toEqual(jasmine.any(Number));
			expect("solve me").toEqual(jasmine.any(Number));
			expect("solve me").toEqual(jasmine.any(Number));
		});

		it("1.2 -2.3 1e2 are also numbers", () => {
			expect("solve me").toEqual(jasmine.any(Number));
			expect("solve me").toEqual(jasmine.any(Number));
			expect("solve me").toEqual(jasmine.any(Number));
		});

		it("numbers are IEEE-754, they have low resolution", () => {
			// write only one number in the expectation, remember hint
			expect("solve me").toBe(0.1 + 0.2);
		});

		it("1/0 gives Infinity", () => {
			expect("solve me").toBe(Infinity);
		});

		it("gives NaN when something goes wrong, example 0 divided by 0", () => {
			expect("solve me").toEqual(NaN);
		});

	});

	describe("operations", () => {

		it("has addition", () => {
			expect("solve me").toBe(2 + 2);
		});

		it("has substraction", () => {
			expect("solve me").toBe(2 - 1);
		});

		it("has multiplication", () => {
			expect("solve me").toBe(3 * 4);
		});

		it("has division", () => {
			expect("solve me").toBe(15 / 3);
		});

		it("has reminder", () => {
			expect("solve me").toBe(18 % 5);
		});

		it("reminder of negative numbers is also signed", () => {
			expect("solve me").toBe(-18 % 5);
		});

	});

	describe("comparisons", () => {

		it("a < b returns true if a is less than b", () => {
			expect("solve me").toBe(1 < 2);
			expect("solve me").toBe(1 < 1);
			expect("solve me").toBe(2 < 1);
		});

		it("a <= b returns true if a is less than b or equal to b", () => {
			expect("solve me").toBe(1 <= 2);
			expect("solve me").toBe(1 <= 1);
			expect("solve me").toBe(2 <= 1);
		});

		it("a >= b returns true if a is greater than b or equal to b", () => {
			expect("solve me").toBe(1 >= 2);
			expect("solve me").toBe(1 >= 1);
			expect("solve me").toBe(2 >= 1);
		});

		it("a > b returns true if a is greater than b", () => {
			expect("solve me").toBe(1 > 2);
			expect("solve me").toBe(1 > 1);
			expect("solve me").toBe(2 > 1);
		});

		it("a === b returns true if both numbers are the same", () => {
			expect("solve me").toBe(1 === 2);
			expect("solve me").toBe(1 === 1);
			expect("solve me").toBe(2 === 1);
		});

		it("a === b returns false if one is number but the other is not", () => {			
			expect("solve me").toBe(2 === "2");
			expect("solve me").toBe(0 === []);
		});

		it("a !== b returns true if both numbers are the different", () => {
			expect("solve me").toBe(1 !== 2);
			expect("solve me").toBe(1 !== 1);
			expect("solve me").toBe(2 !== 1);
		});

		it("a !== b returns true if one is number but the other is not", () => {			
			expect("solve me").toBe(2 !== "2");
			expect("solve me").toBe(0 !== []);
		});

		it("never use a == b (two equals) you cannot trust it", () => {
			expect("solve me").toBe(2 == "2");
			expect("solve me").toBe(0 == []);
		});

		it("never use a != b (one equal) you cannot trust it", () => {
			expect("solve me").toBe(2 != "2");
			expect("solve me").toBe(0 != []);
		});

	});

	describe("methods", () => {

		it("toFixed converts a number into a string with a fixed number of decimals", () => {
			expect("solve me").toBe((3.14159).toFixed(2));
		});

	});

	describe("Math", () => {

		it("Math.max gets the maximum of two numbers", () => {
			expect("solve me").toBe(Math.max(2, 12));
		});

		it("Math.min gets the minimum of two numbers", () => {
			expect("solve me").toBe(Math.min(2, 12));
		});

		it("Math.floor gets the number without decimals rounded down", () => {
			expect("solve me").toBe(Math.floor(3.2));
			expect("solve me").toBe(Math.floor(3.9));
			expect("solve me").toBe(Math.floor(-3.1));
		});

		it("Math.ceil gets the number without decimals rounded up", () => {
			expect("solve me").toBe(Math.ceil(3.2));
			expect("solve me").toBe(Math.ceil(3.9));
			expect("solve me").toBe(Math.ceil(-3.1));
		});

		it("Math.round gets the nearest integer", () => {
			expect("solve me").toBe(Math.round(5.1));
			expect("solve me").toBe(Math.round(5.5));
			expect("solve me").toBe(Math.round(6.5));
		});

		it("Math.round gets the nearest integer (tied negatives go up)", () => {
			expect("solve me").toBe(Math.round(-5.1));
			expect("solve me").toBe(Math.round(-5.5));
			expect("solve me").toBe(Math.round(-6.5));
		});

	});

	describe("Cast to number", () => {

		it("use Number(string) to convert a string to a number", () => {
			expect("solve me").toBe(Number("5"));
			expect("solve me").toBe(Number("7.5"));
		});

		it("Number(string) gives NaN if string cannot be converted", () => {
			expect("solve me").toEqual(Number("e11.1"));
			expect("solve me").toEqual(Number("5pm"));
		});

	});

	describe("NaN", () => {

		it("NaN is NOT a NaN", () => {
			expect("solve me").toBe(NaN === NaN);
		});

		it("use isNaN(number) to know if it is NaN", () => {
			expect("solve me").toBe(isNaN(NaN));
		});

	});
	

});