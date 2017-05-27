describe("Strings", () => {

	describe("constants", () => {

		it("\"hello\", \"a\", \"long word\" are constans", () => {
			expect("solve me").toBe("hello");
			expect("solve me").toBe("a");
			expect("solve me").toBe("long word");
		});

		it("character is a string with length 1", () => {
			expect("solve me").toBe("hello"[1])
		});

	});

	describe("encoded as UCS-2", () => {

		it("each position is 16bits and most characters are length 1", () => {
			expect("solve me").toBe("hello".length);
			expect("solve me").toBe("mataró".length);
			expect("solve me").toBe("νερό".length);
			expect("solve me").toBe("中国".length);
			expect("solve me").toBe("水".length);
		});

		it("some characters requires has double length", () => {
			expect("solve me").toBe("𝄞".length);
		});

	});

	describe("operators", () => {

		it("a + b concatenates two strings", () => {
			expect("solve me").toBe("hello " + "world");
		});

	});

	describe("comparisons", () => {

		it("a < b returns true if a is less than b", () => {
			expect("solve me").toBe("ana" < "bu");
			expect("solve me").toBe("ana" < "ana");
			expect("solve me").toBe("bu" < "ana");
		});

		it("a <= b returns true if a is less than b or equal to b", () => {
			expect("solve me").toBe("ana" <= "bu");
			expect("solve me").toBe("ana" <= "ana");
			expect("solve me").toBe("bu" <= "ana");
		});

		it("a >= b returns true if a is greater than b or equal to b", () => {
			expect("solve me").toBe("ana" >= "bu");
			expect("solve me").toBe("ana" >= "ana");
			expect("solve me").toBe("bu" >= "ana");
		});

		it("a > b returns true if a is greater than b", () => {
			expect("solve me").toBe("ana" > "bu");
			expect("solve me").toBe("ana" > "ana");
			expect("solve me").toBe("bu" > "ana");
		});

		it("a === b returns true if both numbers are the same", () => {
			expect("solve me").toBe("ana" === "bu");
			expect("solve me").toBe("ana" === "ana");
			expect("solve me").toBe("bu" === "ana");
		});

		it("a === b returns false if one is number but the other is not", () => {			
			expect("solve me").toBe("2" === 2);
		});

		it("a !== b returns true if both numbers are the different", () => {
			expect("solve me").toBe("ana" !== "bu");
			expect("solve me").toBe("ana" !== "ana");
			expect("solve me").toBe("bu" !== "ana");
		});

		it("a !== b returns true if one is number but the other is not", () => {			
			expect("solve me").toBe("2" !== 2);
		});

		it("never use a == b (two equals) you cannot trust it", () => {
			expect("solve me").toBe("2" == 2);
		});

		it("never use a != b (one equal) you cannot trust it", () => {
			expect("solve me").toBe("2" != 2);
		});

	});

	describe("methods", () => {

		it("slice(begin, end) gets a substring from the string", () => {
			expect("solve me").toBe("hello".slice(0, 4));
		});

		it("slice(begin) gets the substring starting at begin", () => {
			expect("solve me").toBe("hello world".slice(6));
		});

		it("slice(-begin) gets the substring starting at the last character count", () => {
			expect("solve me").toBe("hello world".slice(-5));
		});

		it("indexOf finds the first occurrence of a substring", () => {
			expect("solve me").toBe("foobar".indexOf("bar"));
		});

		it("indexOf returns -1 if no matching", () => {
			expect("solve me").toBe("foobar".indexOf("pop"));
		});

		it("includes true if there is an occurrence of a substring", () => {
			expect("solve me").toBe("foobar".includes("bar"));
		});

		it("includes returns false if no matching", () => {
			expect("solve me").toBe("foobar".includes("pop"));
		});

		it("toUpperCase converts a string to uppercase", () => {
			expect("solve me").toBe("Hello".toUpperCase());
		});

		it("toLowerCase converts a string to lowercase", () => {
			expect("solve me").toBe("Hello".toLowerCase());
		});

	});

	describe("cast to String", () => {

		it("can convert any object to string with String()", () => {
			expect("solve me").toBe(String(3));
		});

	});

});