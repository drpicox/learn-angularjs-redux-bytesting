class Zoo {
	constructor() {
		this.name = "Hoboken";
		this.animals = ['lulu', 'barry', 'savio'];
	}
	getName() {
		return this.name;
	}
	hasAnimal(animal) {
		return this.animals.includes(animal);
	}
	setName(newName) {
		this.name = newName;
	}
	addAnimal(animal) {
		this.animals.push(animal);
	}
	removeAnimal(animal) {
		const p = this.animals.indexOf(animal);
		if (p >= 0) {
			this.animals.splice(p, 1);
		}
	}
}