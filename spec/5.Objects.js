describe("Objects", () => {

	describe("JSON", () => {

		it("{} is an empty object", () => {
			expect("solve me").toEqual(jasmine.any(Object));
		});

		it("{hello: \"world\"} is an object with one field", () => {
			expect("solve me").toEqual(jasmine.any(Object));
		});

		it("JSON.parse converts JSON strings to obejcts", () => {
			expect("solve me").toEqual(JSON.parse("{\"a\":1,\"b\":[2,3]}"));
		});

		it("JSON.stringify converts any object to JSON", () => {
			expect("solve me").toEqual(JSON.stringify({b:3}));
		});

	});

	describe("get set", () => {

		let object;
		beforeEach(() => {
			object = {
				hello: "world",
				all: 42,
			};
		});

		it("you can use . to get the value of a property", () => {
			expect("solve me").toBe(object.all);
		});

		it("you can use [string] to get the value of a property", () => {
			expect("solve me").toBe(object["hello"]);
		});

		it("you can use . to set the value of a property", () => {
			object.hello = "you";
			expect("solve me").toEqual(object);
		});

		it("you can use [string] to set the value of a property", () => {
			object["hello"] = "here";
			expect("solve me").toEqual(object);
		});

		it("return undefined if the property is not defined", () => {
			expect("solve me").toBe(object.foo);
			expect("solve me").toBe(object["bar"]);
		});

		it("you can add dynamically any property", () => {
			object.foo = "ana";
			object["bar"] = "bu";
			expect("solve me").toEqual(object);
		});

		it("you can use delete to remove properties", () => {
			object.foo = "bar";
			delete object.hello;
			delete object["all"];
			expect("solve me").toEqual(object);
		});

	});

	describe("walk", () => {

		let object;
		beforeEach(() => {
			object = {
				hello: "world",
				all: 42,
			};
		});

		it("Object.keys() gets an array with all the property keys", () => {
			expect("solve me").toEqual(Object.keys(object));
		});

		it("Object.values() gets an array with all property values", () => {
			expect("solve me").toEqual(Object.values(object));
		});

	});

	describe("assign", () => {

		let target;
		let source;
		beforeEach(() => {
			target = {
				hello: "world",
			};
			source = {
				all: 42,
			};
		});

		it("assign merges two or more objects into the first", () => {
			Object.assign(target, source);
			expect("solve me").toEqual(target);
		});

		it("assign returns the target object", () => {
			expect("solve me").toEqual(Object.assign(target, source));
		});

		it("can be merged more than one object", () => {
			Object.assign(target, source, {foo: "bar"});
			expect("solve me").toEqual(target);
		});

		it("if a property is duplicated keeps the last value", () => {
			Object.assign(target, {hello: "there"});
			expect("solve me").toEqual(target);
		});

		it("can be used to copy an object", () => {
			let copy = Object.assign({}, target);
			copy.hello = "you";
			expect("solve me").toEqual(target);
		});
	});

});