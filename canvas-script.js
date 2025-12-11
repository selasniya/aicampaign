document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('neonCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;

    // --- SLIME MESH PARAMETERS ---
    const MESH_DENSITY = 20; 
    const DRAG_STRENGTH = 0.95; 
    const SPRING_STRENGTH = 0.005; 
    const MOUSE_INFLUENCE_RADIUS = 70; 
    const MOUSE_ATTRACTION = 0.015; 
    
    // NEW: Scroll Glow Variables
    let scrollGlow = 0;
    const MAX_GLOW = 0.4; // Max extra opacity for lines
    const GLOW_DECAY_RATE = 0.02; // How fast the glow fades per frame

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
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    
    // --- SLIMEPOINT CLASS (Reverted to fixed anchors) ---

    class SlimePoint {
        constructor(x, y, index) {
            this.index = index;
            // Original position (fixed anchor for springs)
            this.originalX = x;
            this.originalY = y; 
            // Current position (what gets drawn)
            this.x = x;
            this.y = y;
            // Velocity (for physics simulation)
            this.vx = 0;
            this.vy = 0;
        }

        update(index) {
            // 1. SPRING FORCE: Pull the point back to its original fixed position
            const dx = this.originalX - this.x;
            const dy = this.originalY - this.y; 
            
            this.vx += dx * SPRING_STRENGTH;
            this.vy += dy * SPRING_STRENGTH;

            // 2. MOUSE INFLUENCE
            const distToMouse = getDistance(this, mouse);

            if (distToMouse < MOUSE_INFLUENCE_RADIUS) {
                const angle = Math.atan2(this.y - mouse.y, this.x - mouse.x);
                const strength = MOUSE_ATTRACTION * (MOUSE_INFLUENCE_RADIUS - distToMouse);
                
                // Push effect 
                this.vx += Math.cos(angle) * strength;
                this.vy += Math.sin(angle) * strength;
            }

            // 3. APPLY DRAG and UPDATE POSITION
            this.vx *= DRAG_STRENGTH;
            this.vy *= DRAG_STRENGTH;
            this.x += this.vx;
            this.y += this.vy;
        }
    }

    // --- INITIALIZATION ---

    function initMesh() {
        // Only re-init points if the array is empty (on first load or major resize)
        if (points.length === 0 || points.length !== gridCols * gridRows) {
            points = [];
            for (let r = 0; r < gridRows; r++) {
                for (let c = 0; c < gridCols; c++) {
                    const x = c * MESH_DENSITY;
                    const y = r * MESH_DENSITY;
                    const index = r * gridCols + c;
                    points.push(new SlimePoint(x, y, index));
                }
            }
        }
    }
    
    // --- DRAWING FUNCTIONS ---

    function getPoint(col, row) {
        if (col < 0 || row < 0 || col >= gridCols || row >= gridRows) return null;
        return points[row * gridCols + col];
    }

    function drawSlime() {
        // Calculate the current line opacity (0.1 base + scrollGlow)
        const currentOpacity = 0.1 + scrollGlow; 
        
        // Set up line styling
        ctx.strokeStyle = `rgba(0, 255, 255, ${currentOpacity})`; // Cyan Lines (Opacity changes)
        ctx.lineWidth = 1;
        
        // Use scrollGlow for the overall canvas shadow/bloom effect
        ctx.shadowBlur = scrollGlow * 20; // Max blur 8
        ctx.shadowColor = 'rgb(0, 255, 255)'; // Cyan glow color

        for (let r = 0; r < gridRows; r++) {
            for (let c = 0; c < gridCols; c++) {
                const p1 = getPoint(c, r);
                
                if (p1) {
                    // Draw connections
                    const p2 = getPoint(c + 1, r);
                    const p3 = getPoint(c, r + 1);
                    
                    if (p2) { ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke(); }
                    if (p3) { ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p3.x, p3.y); ctx.stroke(); }
                    
                    // Draw accent points (every other point)
                    if (c % 2 === 0 && r % 2 === 0) {
                         // Check distance to original position (without scroll influence)
                        const distToOriginal = getDistance(p1, {x: p1.originalX, y: p1.originalY});
                        if (distToOriginal > 1) { // Only glow if pushed/pulled by mouse
                            ctx.beginPath();
                            ctx.arc(p1.x, p1.y, 2, 0, Math.PI * 2);
                            ctx.shadowBlur = 8;
                            ctx.shadowColor = 'rgb(255, 0, 119)'; // Pink glow
                            ctx.fillStyle = 'rgb(255, 255, 255)';
                            ctx.fill();
                            ctx.shadowBlur = 0; // Turn off shadow for next loop item
                        }
                    }
                }
            }
        }
        
        // Reset canvas shadow after drawing the mesh
        ctx.shadowBlur = 0;
    }

    function animate() {
        // Clear screen
        ctx.clearRect(0, 0, width, height);

        // NEW: Decay the scroll glow over time
        scrollGlow = Math.max(0, scrollGlow - GLOW_DECAY_RATE);

        // Update all points based on physics and mouse position
        points.forEach((point, index) => point.update(index));

        // Draw the mesh
        drawSlime();

        requestAnimationFrame(animate);
    }

    // --- EVENT LISTENERS ---

    // Mouse events for interaction
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY; 
    });
    window.addEventListener('touchmove', (e) => {
        if (e.touches && e.touches.length > 0) {
            mouse.x = e.touches[0].clientX;
            mouse.y = e.touches[0].clientY;
        }
    });
    
    // NEW: Scroll event to trigger the glow
    window.addEventListener('scroll', () => {
        scrollGlow = MAX_GLOW; // Instantly set glow to max on scroll
    });

    // Initialize and start
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); // Initial call
    animate();
});
