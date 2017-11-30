const ParticleBase = require('../particle-base');

class Particle extends ParticleBase {

	constructor(config, system, loader) {
		super(config, system, loader);

		this.baseX = config.x;
		this.baseY = config.y;
		this.baseZ = config.z;
		this.base = new THREE.Vector3(config.x, config.y, config.z);

		this.lerpFactor = 0.25;
		this.dampFactor = 0.25;

		this.velocity = new THREE.Vector3(0, 0, 0);
	}

	update() {
		let scale = 0.075 + (Math.abs(this.velocity.y) / 25)
		this.mesh.scale.set(scale, scale, scale);

		let opacity = 0.15 + (Math.abs(this.velocity.y) / 1)
		this.mesh.material.opacity = this.calc.clamp(opacity, 0.15, 1);

		this.velocity.y += (this.base.y - this.mesh.position.y) * this.lerpFactor;
		this.velocity.multiplyScalar(this.dampFactor);
		this.mesh.position.add(this.velocity);
	}

}

module.exports = Particle;
