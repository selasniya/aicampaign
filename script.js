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

    // Variables to track total movement for click detection
    let totalMovement = 0;
    const CLICK_THRESHOLD = 5; // Pixels: If movement is less than this, treat as a click

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
            totalMovement = 0; // Reset movement tracker
            const coords = getCoords(e);
            startX = coords.x;
            startY = coords.y;
            cube.style.transition = 'transform 0s'; // Disable CSS transition during drag
            scene.style.cursor = 'grabbing';
            // Prevent default for mouse events immediately
            if (e.type === 'mousedown') {
                e.preventDefault(); 
            }
        }

        // Function to handle movement and rotation
        function handleMove(e) {
            if (!isDragging) return;

            const coords = getCoords(e);
            const deltaX = coords.x - startX;
            const deltaY = coords.y - startY;

            // Calculate total movement distance
            totalMovement += Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            // If a drag is definitely happening (past threshold), prevent default scrolling/tapping
            if (totalMovement > CLICK_THRESHOLD) {
                e.preventDefault();
            }

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
        }

        // Function to end the drag operation
        function endDrag(e) {
            if (isDragging) {
                isDragging = false;
                scene.style.cursor = 'grab'; // Restore pointer/grab cursor style
                cube.style.transition = 'transform 0.6s ease-in-out'; // Re-enable transition 

                // If total movement was large (a drag), prevent the default link action
                if (totalMovement > CLICK_THRESHOLD) {
                    e.preventDefault(); 
                }
            }
        }
        
        // 1. Desktop Events
        scene.addEventListener('mousedown', startDrag);
        document.addEventListener('mousemove', handleMove); 
        document.addEventListener('mouseup', endDrag);

        // 2. Mobile Events
        scene.addEventListener('touchstart', startDrag);
        document.addEventListener('touchmove', handleMove); 
        document.addEventListener('touchend', endDrag);

    } // End if (cube) check

    // --- MODAL 1: Submission Modal Functionality (Minor change for robustness) ---
    
    const submissionModal = document.getElementById("submissionModal");
    const startMissionBtn = document.getElementById("startMissionBtn");
    const closeBtn = submissionModal ? submissionModal.querySelector(".close-btn") : null;
    const agentTags = document.querySelectorAll(".agent-tag");
    const submissionForm = submissionModal ? submissionModal.querySelector('form') : null;

    // Function to open the submission modal
    if (startMissionBtn && submissionModal) {
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
    if (submissionForm && submissionModal) {
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
    }

});
