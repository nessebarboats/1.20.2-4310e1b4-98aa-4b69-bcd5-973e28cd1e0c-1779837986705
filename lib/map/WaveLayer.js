export class WaveLayer { 

    constructor(map, particles) {
        this.id = "wave-layer";
        this.type = "custom";
        this.renderingMode = "2d";

        this.map = map;
        this.particles = particles;

        this.canvas = null;
        this.ctx = null;
    }

    onAdd(map) {

        this.canvas = document.createElement("canvas");

        this.canvas.width = map.getCanvas().width;
        this.canvas.height = map.getCanvas().height;

        this.canvas.style.position = "absolute";
        this.canvas.style.top = "0";
        this.canvas.style.left = "0";
        this.canvas.style.pointerEvents = "none";

        map.getCanvasContainer().appendChild(this.canvas);

        this.ctx = this.canvas.getContext("2d");
    }

    render(gl, matrix) {

        const ctx = this.ctx;

        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(p => {

            // Move particle
            p.lng += Math.cos(p.direction * Math.PI / 180) * 0.00002;
            p.lat += Math.sin(p.direction * Math.PI / 180) * 0.00002;

            // Convert to screen coordinates
            const point = this.map.project([p.lng, p.lat]);

            ctx.beginPath();

            ctx.strokeStyle = "#00ccff";
            ctx.lineWidth = p.height;

            ctx.moveTo(point.x, point.y);

            ctx.lineTo(
                point.x - Math.cos(p.direction * Math.PI / 180) * 12,
                point.y - Math.sin(p.direction * Math.PI / 180) * 12
            );

            ctx.stroke();

        });

        this.map.triggerRepaint();
    }

    onRemove() {

        this.canvas.remove();

    }

}
