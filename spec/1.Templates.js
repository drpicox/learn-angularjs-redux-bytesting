describe("Templates", () => {

	it("Angular is just an html template compiler", () => {
		const wrapper = testbed.compile("<div>Hello World</div>");
		expect(solveme).toBeTextOf(wrapper);
	});

	describe('Interpolation', () => {

		it("numbers", () => {
			const wrapper = testbed.compile("<div>Your score is {{10}}</div>");
			expect(solveme).toBeTextOf(wrapper);
		});

		it("strings", () => {
			const wrapper = testbed.compile("<div>You are {{\"great\"}}</div>");
			expect(solveme).toBeTextOf(wrapper);
		});

		it("booleans", () => {
			const wrapper = testbed.compile("<div>This is {{true}}</div>");
			expect(solveme).toBeTextOf(wrapper);
		});

		it("arrays", () => {
			const wrapper = testbed.compile("<div>Numbers {{[1,2]}}</div>");
			expect(solveme).toBeTextOf(wrapper);
		});

		it("objects", () => {
			const wrapper = testbed.compile("<div>Result {{ {color: \"red\"} }}</div>");
			expect(solveme).toBeTextOf(wrapper);
		});

		it("operations on numbers", () => {
			const wrapper = testbed.compile("<div>Your score is {{2+3+5}}</div>");
			expect(solveme).toBeTextOf(wrapper);
		});

		it("operations on strings", () => {
			const wrapper = testbed.compile("<div>{{\"hello \" + \"world\"}}</div>");
			expect(solveme).toBeTextOf(wrapper);
		});

		it("index arrays", () => {
			const wrapper = testbed.compile("<div>You are {{ [1,2][0] }}st</div>");
			expect(solveme).toBeTextOf(wrapper);
		});

		it("index objects", () => {
			const wrapper = testbed.compile("<div>Color {{ {color: \"red\"}[\"color\"] }}</div>");
			expect(solveme).toBeTextOf(wrapper);
		});

		it("navigate objects", () => {
			const wrapper = testbed.compile("<div>Color {{ {color: \"blue\"}.color }}</div>");
			expect(solveme).toBeTextOf(wrapper);
		});

		it("call functions", () => {
			const wrapper = testbed.compile("<div>Kitchen's {{ \"hello\".slice(0,4) }}</div>");
			expect(solveme).toBeTextOf(wrapper);
		});

	});

	describe('expect(solveme).toBeTextOf(y)', () => {
		it('removes all kind of spaces', () => {
			const wrapper = testbed.compile(`
				<div> hi <br> \n \t
				y o u
			`)
			// put here "hiyou"
			expect(solveme).toBeTextOf(wrapper);
		})
	});
	

});