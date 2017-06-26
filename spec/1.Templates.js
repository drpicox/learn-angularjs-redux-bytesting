describe("Templates", () => {

	it("Angular is just an html template compiler", () => {
		const wrapper = testbed.compile("<div>Hello World</div>");
		expect("Hello World").toBeTextOf(wrapper);
	});

	describe('Interpolation', () => {

		it("numbers", () => {
			const wrapper = testbed.compile("<div>Your score is {{10}}</div>");
			expect("Your score is 10").toBeTextOf(wrapper);
		});

		it("strings", () => {
			const wrapper = testbed.compile("<div>You are {{\"great\"}}</div>");
			expect("You are great").toBeTextOf(wrapper);
		});

		it("booleans", () => {
			const wrapper = testbed.compile("<div>This is {{true}}</div>");
			expect("This is true").toBeTextOf(wrapper);
		});

		it("arrays", () => {
			const wrapper = testbed.compile("<div>Numbers {{[1,2]}}</div>");
			expect("Numbers [1,2]").toBeTextOf(wrapper);
		});

		it("objects", () => {
			const wrapper = testbed.compile("<div>Result {{ {color: \"red\"} }}</div>");
			expect("Result {\"color\":\"red\"}").toBeTextOf(wrapper);
		});

		it("operations on numbers", () => {
			const wrapper = testbed.compile("<div>Your score is {{2+3+5}}</div>");
			expect("Your score is 10").toBeTextOf(wrapper);
		});

		it("operations on strings", () => {
			const wrapper = testbed.compile("<div>{{\"hello \" + \"world\"}}</div>");
			expect("hello world").toBeTextOf(wrapper);
		});

		it("index arrays", () => {
			const wrapper = testbed.compile("<div>You are {{ [1,2][0] }}st</div>");
			expect("You are 1st").toBeTextOf(wrapper);
		});

		it("index objects", () => {
			const wrapper = testbed.compile("<div>Color {{ {color: \"red\"}[\"color\"] }}</div>");
			expect("Color red").toBeTextOf(wrapper);
		});

		it("navigate objects", () => {
			const wrapper = testbed.compile("<div>Color {{ {color: \"blue\"}.color }}</div>");
			expect("Color blue").toBeTextOf(wrapper);
		});

		it("call functions", () => {
			const wrapper = testbed.compile("<div>Kitchen's {{ \"hello\".slice(0,4) }}</div>");
			expect("Kitchen's hell").toBeTextOf(wrapper);
		});

	});

	describe('expect(solve).toBeTextOf(y)', () => {
		it('removes all kind of spaces', () => {
			const wrapper = testbed.compile(`
				<div> hi <br> \n \t
				y o u
			`)
			// put here "hiyou"
			expect(`
				 hi  
 	
				y o u
			`).toBeTextOf(wrapper);
		})
	});
	

});