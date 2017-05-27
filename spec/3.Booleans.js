describe("Booleans", () => {

	describe("constants", () => {

		it("false and true are the only existing booleans", () => {
			expect("solve me").toEqual(jasmine.any(Boolean));
			expect("solve me").toEqual(jasmine.any(Boolean));
		});

	});

	describe("operations", () => {

		it("logical and", () => {
			expect("solve me").toBe(true && true);
			expect("solve me").toBe(true && false);
			expect("solve me").toBe(false && false);
		});

		it("logical or", () => {
			expect("solve me").toBe(true || true);
			expect("solve me").toBe(true || false);
			expect("solve me").toBe(false || false);
		});

		it("not", () => {
			expect("solve me").toBe(!false);
			expect("solve me").toBe(!true);
		});

	});

	describe("cast", () => {

		it("use Boolean() to convert from truthy/falsy booleans to boolean", () => {
			expect("solve me").toBe(Boolean(true));
			expect("solve me").toBe(Boolean(false));
		});

		it("use Boolean() to convert from truthy/falsy objects to boolean", () => {
			expect("solve me").toBe(Boolean([]));
			expect("solve me").toBe(Boolean({}));
			expect("solve me").toBe(Boolean(null));
			expect("solve me").toBe(Boolean(undefined));
		});

		it("use Boolean() to convert from truthy/falsy strings to boolean", () => {
			expect("solve me").toBe(Boolean("0"));
			expect("solve me").toBe(Boolean("false"));
			expect("solve me").toBe(Boolean(""));
		});

		it("use Boolean() to convert from truthy/falsy numbers to boolean", () => {
			expect("solve me").toBe(Boolean(1));
			expect("solve me").toBe(Boolean(0));
			expect("solve me").toBe(Boolean(NaN));
		});

	});

	describe("if conditions follows truthy/falsy rules", () => {

		it("example with \"3\"", () => {
			let a = "original";
			if ("3") {
				a = "changed";
			}
			expect("solve me").toBe(a);
		});

		it("example with 0", () => {
			let a = "original";
			if (0) {
				a = "changed";
			}
			expect("solve me").toBe(a);
		});

		it("example with undefined", () => {
			let a = "original";
			if (undefined) {
				a = "changed";
			}
			expect("solve me").toBe(a);
		});

		it("example with \"false\"", () => {
			let a = "original";
			if ("false") {
				a = "changed";
			}
			expect("solve me").toBe(a);
		});

	});

});