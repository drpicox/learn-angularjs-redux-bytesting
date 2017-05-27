(function() {
	JasmineHtmlReporter = jasmineRequire.HtmlReporter;
	jasmineRequire.HtmlReporter = function(j$) {

	  function NewHtmlReporter(options) {
	    var HtmlReporter = JasmineHtmlReporter(j$);        
	    HtmlReporter.call(this, options);

	    var htmlSpecDone = this.specDone;
	    this.specDone = function(result) {
	      result.failedExpectations.forEach(failedExpectation => {
	        var stackLines = failedExpectation.stack.split('\n');
	        var error = stackLines[0];
	        failedExpectation.stack = error + '\n' + stackLines
	          .slice(1)
	          .filter(line => !line.match(/\/lib\/jasmine/))
	          .join('\n');

	        if (!failedExpectation.matcherName) return;
	        if (failedExpectation.actual === 'hint') return;
	        var message = failedExpectation.message;
	        if (message.slice(0, 7) !== 'Error: ') {
	          message = 'Error: ' + message;
	        }
	        failedExpectation.expected = 'hidden';
	        failedExpectation.message = 'Expectation has failed. Use expect("hint")… to reveal the expected result.';
	        failedExpectation.stack = 'Error: ' + failedExpectation.message + failedExpectation.stack.slice(message.length);
	      });
	      htmlSpecDone.call(this, result);
	    }
	  }
	  return NewHtmlReporter;
	}
}());