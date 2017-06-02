let testbed;
beforeEach(() => {
	let componentName;

	testbed = {
		compile(template) {
			template = template.replace(/ng-app="([\w\.]+)"/, (ngApp, moduleName) => {
				this.use(moduleName);
				return '';
			});

			let wrapper;
			inject(($compile, $rootScope) => {
				const jqElem = $compile(`<div>${template}</div>`)($rootScope);
				wrapper = new Wrapper(jqElem, $rootScope);

				if (componentName) {
					$rootScope.$digest();
					wrapper.$ctrl = wrapper.find(slugify(componentName)).node.isolateScope().$ctrl;
				}
			});
			return wrapper;
		},
		component(name, componentDto) {
			module(($compileProvider) => {
				$compileProvider.component(name, componentDto);
				componentName = name;
			});
			return this;
		},
		config(configFn) {
			module(configFn);
			return this;
		},
		dispatch(action) {
			this.getService('store').dispatch(action);
			return this;
		},
		getLastDispatchedAction() {
			let action;
			inject(($$dispatchLog) => {
				action = $$dispatchLog.getLastAction();
			});
			return action;
		},
		getService(name) {
			let service;
			inject(($injector) => {
				service = $injector.get(name);
			});
			return service;
		},
		getState() {
			return this.getService('store').getState();
		},
		mount(componentDto) {
			this.component('component', componentDto);

			const bindingKeys = Object.keys(componentDto.bindings || {});
			const inputKeys = bindingKeys.filter(key => componentDto.bindings[key] === '<');
			const outputKeys = bindingKeys.filter(key => componentDto.bindings[key] === '&');

			let bindings = [
					...inputKeys.map(key => `${slugify(key)}="${key}"`),
					...outputKeys.map(key => `${slugify(key)}="${key}($event)"`),
				].join(' ');

			let wrapper = this.compile(`<component ${bindings}></component>`);
			return wrapper;
		},
		provider(name, Provider) {
			module(($provide) => {
				$provide.provider(name, Provider);
			});
			return this;
		},
		service(name, Constructor) {
			module(($provide) => {
				$provide.service(name, Constructor);
			});
			return this;
		},
		use(moduleName) {
			module(moduleName);
			return this;
		}
	};


	function Wrapper(node, $rootScope) {
		this.node = node;
		this.html = () => node.html();
		this.text = () => node.text();
		this.val = (text) => {
			if (text == null) return node.val();
			node.val(text);
			node.triggerHandler('change');
		};

		this.click = (selector) => node.find(selector).triggerHandler('click');
		this.find = (selector) => new Wrapper(node.find(selector), $rootScope);

		this.$ctrl = $rootScope.$ctrl;
		this.$apply = (fn) => $rootScope.$apply(fn);
		this.$digest = () => $rootScope.$digest();

		this.set = (name, value) => $rootScope[name] = value;
		this.setInput = (name, value) => $rootScope[name] = value;
		this.onOutput = (name, value) => $rootScope[name] = value;

		this.withController = (Controller) => {
			this.$ctrl = new Controller();
			$rootScope.$ctrl = this.$ctrl;
			return this;
		};
	}

	function slugify(text) {
		return text.replace(/[A-Z]/g, c => `-${c}`).toLowerCase();
	}
});
