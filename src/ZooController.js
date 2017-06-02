class ZooController {
	constructor() {
		this._zoo = new Zoo();
		this.newName = this._zoo.name;
	}

	getName() {
		return this._zoo.getName();
	}
	updateName() {
		this._zoo.setName(this.newName);
	}

	hasSavio() {
		return this._zoo.hasAnimal('savio');
	}
	removeSavio() {
		this._zoo.removeAnimal('savio');
	}
	getAnimals() {
		return this._zoo.animals;
	}

}