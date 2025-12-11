document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('neonCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;

    // --- SLIME MESH PARAMETERS ---
    const MESH_DENSITY = 20; // Lower number means fewer, larger squares (better performance)
    const DRAG_STRENGTH = 0.95; // How quickly the points slow down
    const SPRING_STRENGTH = 0.005; // How strong the virtual springs are
    const MOUSE_INFLUENCE_RADIUS = 70; // How close the mouse needs to be to affect points
    const MOUSE_ATTRACTION = 0.015; // How strongly the mouse pushes/pulls

    let points = [];
    let mouse = { x: 0, y: 0 };
    let gridCols, gridRows;

    // --- UTILITY FUNCTIONS ---

    function resizeCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;

        // Recalculate grid size based on new dimensions
        gridCols = Math.ceil(width / MESH_DENSITY) + 1;
        gridRows = Math.ceil(height / MESH_DENSITY) + 1;
        
        // Re-initialize the mesh to fit the new size
        initMesh();
    }

    function getDistance(p1, p2) {
        let dx = p1.x - p2.x;
        let dy = p1.y - p2.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    // --- POINT (Particle) OBJECT ---

    class Point {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.originalX = x;
            this.originalY = y;
            this.vx = 0;
            this.vy = 0;
        }

        update(index) {
            let dx, dy, dist;

            // 1. Spring System Physics: Pull point back to its original position
            dx = this.originalX - this.x;
            dy = this.originalY - this.y;
            this.vx += dx * SPRING_STRENGTH;
            this.vy += dy * SPRING_STRENGTH;

            // 2. Mouse Interaction (The Slime Push)
            dist = getDistance(this, mouse);
            if (dist < MOUSE_INFLUENCE_RADIUS) {
                // Calculate push direction and strength
                let angle = Math.atan2(this.y - mouse.y, this.x - mouse.x);
                let force = (MOUSE_INFLUENCE_RADIUS - dist) * MOUSE_ATTRACTION;

                this.vx += Math.cos(angle) * force;
                this.vy += Math.sin(angle) * force;
            }

            // 3. Drag/Damping: Slow down movement
            this.vx *= DRAG_STRENGTH;
            this.vy *= DRAG_STRENGTH;

            // 4. Apply Velocity
            this.x += this.vx;
            this.y += this.vy;
        }
    }

    // --- MESH INITIALIZATION ---

    function initMesh() {
        points = [];
        for (let r = 0; r < gridRows; r++) {
            for (let c = 0; c < gridCols; c++) {
                // Ensure points fill the full canvas space
                const x = c * MESH_DENSITY; 
                const y = r * MESH_DENSITY;
                points.push(new Point(x, y));
            }
        }
    }

    // --- RENDER LOOP ---

    function drawSlime() {
        ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)'; // Cyan line for the mesh
        ctx.lineWidth = 1.5;

        // Iterate through all columns (except the last one)
        for (let r = 0; r < gridRows; r++) {
            for (let c = 0; c < gridCols - 1; c++) {
                // Calculate index for the current point (p1)
                const p1Index = r * gridCols + c;
                const p1 = points[p1Index];

                // 1. Draw horizontal line to the point on the right (p2)
                const p2Index = p1Index + 1;
                if (p2Index < points.length) {
                    const p2 = points[p2Index];
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }

                // 2. Draw vertical line to the point below (p3)
                const p3Index = p1Index + gridCols;
                if (r < gridRows - 1 && p3Index < points.length) {
                    const p3 = points[p3Index];
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p3.x, p3.y);
                    ctx.stroke();
                }

                // Optional: Draw a small glowing point (for visual accent)
                if (c % 2 === 0 && r % 2 === 0) {
                     // Check distance to mouse to make point glow only when deformed
                    const distToOriginal = getDistance(p1, {x: p1.originalX, y: p1.originalY});
                    if (distToOriginal > 1) { // Only glow if pushed/pulled
                        ctx.beginPath();
                        ctx.arc(p1.x, p1.y, 2, 0, Math.PI * 2);
                        ctx.shadowBlur = 8;
                        ctx.shadowColor = 'rgb(255, 0, 119)'; // Pink glow
                        ctx.fillStyle = 'rgb(255, 255, 255)';
                        ctx.fill();
                        ctx.shadowBlur = 0;
                    }
                }
            }
        }
    }

    function animate() {
        // Clear screen
        ctx.clearRect(0, 0, width, height);

        // Update all points based on physics and mouse position
        points.forEach((point, index) => point.update(index));

        // Draw the mesh
        drawSlime();

        requestAnimationFrame(animate);
    }

    // --- EVENT LISTENERS ---

    // Update mouse position
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    // Handle resizing (crucial for responsive mesh)
    window.addEventListener('resize', resizeCanvas);

    // Initial setup
    resizeCanvas(); // This calls initMesh()
    animate();
});