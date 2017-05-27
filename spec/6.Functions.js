describe("Functions", () => {

	describe("short notation", () => {

		it("() => {} is the shortest function", () => {
			expect("solve me").toEqual(jasmine.any(Function));
		});

		it("(a,b) => {} accepts arguments", () => {
			expect("solve me").toEqual(jasmine.any(Function));
		});

		it("a => {} is a shorthand for one argument", () => {
			expect("solve me").toEqual(jasmine.any(Function));
		});

		it("() => n returns n", () => {
			const fn = () => 3;
			expect("solve me").toBe(fn());
		});

		it("n => n is identity", () => {
			const fn = n => n;
			expect("solve me").toBe(fn(5));
		});

		it("(a,b) => a+b sums two numbers", () => {
			const fn = (a,b) => a+b;
			expect("solve me").toBe(fn(2,3));
		});

		it("() => ({ hello: \"world\" }) requires parenthesis to return a constant object", () => {
			const fn = (a) => ({ hello: a });
			expect("solve me").toEqual(fn("world"));
			expect("solve me").toEqual(fn("you"));
		});

	    it("() => { /*code*/ } accepts any arbitrary code inside brackets", () => {
	    	const fn = a => {
	    		if (a > 3) { return a; }
	    		else return 3;
	    	};
	    	expect("solve me").toEqual(fn(2));
	    	expect("solve me").toEqual(fn(5));
	    });

	});

	describe("large notation", () => {

		it("function() {} was the shortest function", () => {
			expect("solve me").toEqual(jasmine.any(Function));
		});

		it("function(a,b) {} accepts arguments", () => {
			expect("solve me").toEqual(jasmine.any(Function));
		});

		it("function(a) {} there is no shorthand for one argument", () => {
			expect("solve me").toEqual(jasmine.any(Function));
		});

		it("function() { return n; } returns n", () => {
			const fn = function() { return 3; };
			expect("solve me").toBe(fn());
		});

		it("function name() { … } can have named", () => {
			function fn() { return 3; };
			expect("solve me").toBe(fn());
		});

		it("function (n) { return n; } is identity", () => {
			const fn = function (n) { return n; };
			expect("solve me").toBe(fn(5));
		});

		it("function (a, b) { return a + b; } sums two numbers", () => {
			const fn = (a,b) => a+b;
			expect("solve me").toBe(fn(2,3));
		});

		it("function() { return { hello: \"world\" }; } requires nothing special to return a constant object", () => {
			const fn = function(a) { return { hello: a }; };
			expect("solve me").toEqual(fn("world"));
			expect("solve me").toEqual(fn("you"));
		});

	    it("function() { /*code*/ } accepts any arbitrary code inside brackets", () => {
	    	const fn = function(a) {
	    		if (a > 3) { return a; }
	    		else return 3;
	    	};
	    	expect("solve me").toEqual(fn(2));
	    	expect("solve me").toEqual(fn(5));
	    });
	    
	});

	describe("missmatching parameters / returns", () => {

		it("ignores extra parameters", () => {
			const fn = (a,b) => a + b;
			expect("solve me").toBe(fn(1,2,3));
		});

		it("converts missing parameters into undefined", () => {
			const fn = n => n;
			expect("solve me").toBe(fn());
		});

		it("always returns something, returns undefined by default", () => {
			const fn = () => {};
			expect("solve me").toBe(fn());
		});

		it("returns return undefined if no value specified", () => {
			const fn = () => { return; };
			expect("solve me").toBe(fn());
		});

	});

	describe("closures", () => {

		it("functions can have children functions", () => {
			const double = arr => arr.map(n => n * 2);
			expect("solve me").toEqual(double([1,2,3]));
		});

		it("children functions can read parent variables", () => {
			const sumhash = arr => {
				let hash = arr.length % 6;
				return arr.map(n => n + hash);
			};
			expect("solve me").toEqual(sumhash([1,2,3]));
		});

		it("functions can return functions", () => {
			const makeSay = word => () => word;
			const sayBud = makeSay("bud");
			const sayWii = makeSay("wii");
			expect("solve me").toBe(sayBud());
			expect("solve me").toBe(sayWii());
		});

		it("parent variales live after parent finishes", () => {
			const makeCounter = () => {
				let number = 0;
				return () => ++number;
			};
			const count = makeCounter();
			expect("solve me").toBe(count());
			expect("solve me").toBe(count());
			expect("solve me").toBe(count());
		});

		it("parent variales are duplicated in each function call", () => {
			const makeCounter = () => {
				let number = 0;
				return () => ++number;
			};
			const countA = makeCounter();
			const countB = makeCounter();
			expect("solve me").toBe(countA());
			expect("solve me").toBe(countA());
			expect("solve me").toBe(countB());
			expect("solve me").toBe(countA());
			expect("solve me").toBe(countB());
		});

	});

	describe("return standarized bug", () => {

		it("return does not need ; to finish", () => {
			const fn = () => {
				return 
					1 +
					1;
			};
			expect("solve me").toBe(fn());
		});

	});

});