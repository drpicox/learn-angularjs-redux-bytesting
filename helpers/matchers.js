(function() {

	const customMatchers = {
		toHaveText: (util, customEqualityTesters) => ({
			compare: (actual, expected) => {
				if (actual && typeof actual.$digest === 'function') { expected.$digest(); }

				const actualText = actual && typeof actual.text === "function" && actual.text();
				if (actualText == null) {
					return {
						pass: false,
						message: `Expected "${actual}" to have a text() method`,
					}
				}

				if (!util.equals(actualText, expected, customEqualityTesters)) {
					return {
						pass: false,
						message: `Expected "${actualText}" to match "${expected}"`,
					}
				}

				return {
					pass: true,
					message: `looks nice`,
				}
			},
		}),
		toBeTextOf: (util, customEqualityTesters) => ({
			compare: (actual, expected) => {
				if (expected && typeof expected.$digest === 'function') { expected.$digest(); }
				
				const expectedText = expected && typeof expected.text === "function" && expected.text();
				if (expectedText == null) {
					return {
						pass: false,
						message: `Expected "${expected}" to have a text() method`,
					}
				}

				if (!actual || typeof actual.replace !== 'function') {
					return {
						pass: false,
						message: `Expected actual "${actual}" to be a string`,
					}
				}

				if (!util.equals(removeSpaces(actual), removeSpaces(expectedText), customEqualityTesters)) {
					return {
						pass: false,
						message: `Expected "${actual}" to match "${expectedText}"`,
					}
				}

				return {
					pass: true,
					message: `looks nice`,
				}
			},
		}), 
		toBeHtmlOf: (util, customEqualityTesters) => ({
			compare: (actual, expected) => {
				if (expected && typeof expected.$digest === 'function') { expected.$digest(); }
				
				const expectedText = expected && typeof expected.html === "function" && expected.html();
				if (expectedText == null) {
					return {
						pass: false,
						message: `Expected "${expected}" to have a html() method`,
					}
				}

				if (!util.equals(actual, expectedText, customEqualityTesters)) {
					return {
						pass: false,
						message: `Expected "${actual}" to match "${expectedText}"`,
					}
				}

				return {
					pass: true,
					message: `looks nice`,
				}
			},
		}), 
		toBeValueOf: (util, customEqualityTesters) => ({
			compare: (actual, expected) => {
				if (expected && typeof expected.$digest === 'function') { expected.$digest(); }
				
				const expectedText = expected && typeof expected.val === "function" && expected.val();
				if (expectedText == null) {
					return {
						pass: false,
						message: `Expected "${expected}" to have a val() method`,
					}
				}

				if (!util.equals(actual, expectedText, customEqualityTesters)) {
					return {
						pass: false,
						message: `Expected "${actual}" to match "${expectedText}"`,
					}
				}

				return {
					pass: true,
					message: `looks nice`,
				}
			},
		}), 
		toBeInstanceOf: (util, customEqualityTesters) => ({
			compare: (actual, expected) => {
				if (actual == null) return {
					pass: false,
					message: `Expected "${actual}" to be defined`,
				};
				if (typeof expected !== 'function') return {
					pass: false,
					message: `Expected "${expected}" to be a constructor`,
				};

				if (!(actual instanceof expected)) return {
					pass: false,
					message: `Expected "${actual}" to be instance of "${expected}"`
				};

				return {
					pass: true,
					message: `looks nice`,
				}
			},
		}), 
	};

	beforeEach(function() {
		jasmine.addMatchers(customMatchers);
	});

	function removeSpaces(text) {
		return text.replace(/\s/g, '');
	}

})();