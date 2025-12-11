document.addEventListener('DOMContentLoaded', function() {
    
    // --- CUBE ROTATION FUNCTIONALITY (MOUSE & TOUCH LOGIC) ---
    
    const cube = document.getElementById('cube');
    const scene = document.querySelector('.scene');
    
    // Rotation state variables
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let currentRotationY = 0; 
    let currentRotationX = 0; 

    if (cube) {
        // Initialize the cube's starting rotation (matches CSS initial state)
        currentRotationX = 20; 
        currentRotationY = -45; 
        cube.style.transform = `rotateX(${currentRotationX}deg) rotateY(${currentRotationY}deg)`;
        cube.style.transition = 'transform 0s'; // Disable CSS transition during drag

        // Function to apply the rotation
        function applyCubeRotation() {
            cube.style.transform = `rotateX(${currentRotationX}deg) rotateY(${currentRotationY}deg)`;
        }

        // Helper function to get correct coordinates for both mouse and touch events
        function getCoords(e) {
            // Check if it's a touch event and use the first touch point
            if (e.touches && e.touches.length) {
                return { x: e.touches[0].clientX, y: e.touches[0].clientY };
            }
            // Otherwise, it's a mouse event
            return { x: e.clientX, y: e.clientY };
        }
        
        // --- EVENT HANDLERS FOR MOUSE & TOUCH ---
        
        // Function to start the drag operation
        function startDrag(e) {
            isDragging = true;
            const coords = getCoords(e);
            startX = coords.x;
            startY = coords.y;
            cube.style.transition = 'transform 0s'; // Disable CSS transition during drag
            scene.style.cursor = 'grabbing';
            e.preventDefault(); 
        }

        // Function to handle movement and rotation
        function handleMove(e) {
            if (!isDragging) return;

            const coords = getCoords(e);
            const deltaX = coords.x - startX;
            const deltaY = coords.y - startY;

            const rotationSpeed = 0.5; 

            // Horizontal movement controls Y-axis rotation (spin)
            currentRotationY += deltaX * rotationSpeed;
            // Vertical movement controls X-axis rotation (tilt)
            currentRotationX -= deltaY * rotationSpeed;

            // Clamp X rotation to prevent flipping the view too much
            currentRotationX = Math.max(-90, Math.min(90, currentRotationX));

            applyCubeRotation();

            // Update start position for the *next* movement calculation
            startX = coords.x;
            startY = coords.y;
            e.preventDefault(); // Prevent scrolling/default behavior
        }

        // Function to end the drag operation
        function endDrag() {
            if (isDragging) {
                isDragging = false;
                scene.style.cursor = 'grab'; // Restore pointer/grab cursor style
                cube.style.transition = 'transform 0.6s ease-in-out'; // Re-enable transition 
            }
        }
        
        // 1. Desktop Events (Original MOUSE logic)
        scene.addEventListener('mousedown', startDrag);
        scene.addEventListener('mousemove', handleMove);
        document.addEventListener('mouseup', endDrag);

        // 2. Mobile Events (New TOUCH logic)
        scene.addEventListener('touchstart', startDrag);
        scene.addEventListener('touchmove', handleMove);
        document.addEventListener('touchend', endDrag);

    } // End if (cube) check

    // --- MODAL 1: Submission Modal Functionality (No Change) ---
    
    const submissionModal = document.getElementById("submissionModal");
    const startMissionBtn = document.getElementById("startMissionBtn");
    const closeBtn = submissionModal.querySelector(".close-btn");
    const agentTags = document.querySelectorAll(".agent-tag");
    const submissionForm = submissionModal.querySelector('form');

    // Function to open the submission modal
    if (startMissionBtn) {
        startMissionBtn.onclick = function() {
            submissionModal.style.display = "flex";
        }
    }

    // Function to close the submission modal using 'X'
    if (closeBtn) {
        closeBtn.onclick = function() {
            submissionModal.style.display = "none";
        }
    }

    // Toggle 'selected' class on agent buttons
    agentTags.forEach(tag => {
        tag.addEventListener('click', function() {
            this.classList.toggle('selected');
        });
    });
    
    // Basic form submission handling (prevents page refresh)
    submissionForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simple Confirmation Alert (For demo purposes)
        alert('Data Transmitted! (In a real site, this would send data to a server.)');
        
        // Reset form and close
        submissionForm.reset();
        agentTags.forEach(tag => tag.classList.remove('selected'));
        submissionModal.style.display = "none";
    });

    // Fallback: Close the Submission Modal when clicking its backdrop
    submissionModal.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal-backdrop')) {
            submissionModal.style.display = "none";
        }
    });

});
