const ParticleBase = require('../particle-base');

class Particle extends ParticleBase {

	constructor(config, system, loader) {
		super(config, system, loader);

		this.alt = config.alt;
		this.div = 0.15
		this.amp = 0;
		this.speed = 0;
	}

	update() {
		if(this.alt) {
			this.amp = ((this.system.visW / 2) - Math.abs(this.mesh.position.x)) / (this.system.visW / 2);
			this.amp *= this.system.osc1Eased;
			this.speed = this.loader.elapsedMs / 750;
			this.mesh.position.y = this.system.simplex.getRaw2DNoise(this.mesh.position.x * this.div + this.speed, 0) * 10 * this.amp;
		} else {
			this.amp = ((this.system.visW / 2) - Math.abs(this.mesh.position.x)) / (this.system.visW / 2);
			this.amp *= 1 - this.system.osc1Eased;
			this.speed = this.loader.elapsedMs / 750;
			this.mesh.position.y = this.system.simplex.getRaw2DNoise(this.mesh.position.x * this.div + this.speed + 1000, 1000) * 10 * this.amp;
		}

		let size = 0.05 + this.size * this.amp;
		this.mesh.material.opacity = 0.1 + this.amp * 0.9;
		size = 0.05 + 0.1 * this.amp;
		this.mesh.scale.set(size, size, size);

		this.mesh.position.z = this.alt ? 0.05 + 10 * this.amp : -(0.05 + 10 * this.amp);
	}

}

module.exports = Particle;
