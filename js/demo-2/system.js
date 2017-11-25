PL.System = class extends PL.SystemBase {

	constructor(loader) {
		super(loader);

		this.simplex = new SimplexNoise();

		this.lines = [];

		//this.count = Math.round(window.innerWidth / 10);
		this.count = 350;
		//this.visW = this.calc.visibleWidthAtZDepth(0, this.loader.camera) / 1;
		this.visW = 30;

		this.osc = new PL.Osc(0, 0.015);
		this.oscEased = 0;

		for(let i = 0; i < this.count; i++) {
			let x = this.calc.map(i, 0, this.count , -this.visW / 2, this.visW / 2) + (this.visW / this.count / 2);
			let y = 0;
			let z = 0;

			this.particles.push(new PL.Particle({
				group: this.particleGroup,
				x: x,
				y: y,
				z: z,
				size: this.calc.map(Math.abs(x), 0, this.visW / 2, 0.2, 0.01),
				color: 0xffffff,
				opacity: 1,
				alt: i % 2 === 0
			}, this, this.loader));
		}

		for(let i = 0; i < this.count; i++) {
			let lineMaterial = new THREE.LineBasicMaterial({
				color: 0xffffff,
				opacity: 0.15,
				transparent: true
			});
			let lineGeometry = new THREE.Geometry();
			lineGeometry.vertices.push(
				new THREE.Vector3(),
				new THREE.Vector3()
			);
			let lineMesh = new THREE.Line(lineGeometry, lineMaterial);
			this.particleGroup.add(lineMesh);
			this.lines.push(lineMesh);
		}

	}

	update() {
		super.update();

		this.osc.update();
		this.oscEased = this.osc.val(this.ease.inOutExpo);

		let j = this.lines.length - 1;
		while(j--) {
			let p1 = this.particles[j];
			let p2 = this.particles[j + 1];
			let line = this.lines[j];
			line.geometry.vertices[0].x = p1.mesh.position.x;
			line.geometry.vertices[0].y = p1.mesh.position.y;
			line.geometry.vertices[0].z = p1.mesh.position.z;
			line.geometry.vertices[1].x = p1.mesh.position.x;
			line.geometry.vertices[1].y = 0;
			line.geometry.vertices[1].z = p2.mesh.position.z;
			line.geometry.verticesNeedUpdate = true;
		}
	}

}