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
        cube.style.transition = 'transform 0s'; 

        // Function to apply the rotation
        function applyCubeRotation() {
            cube.style.transform = `rotateX(${currentRotationX}deg) rotateY(${currentRotationY}deg)`;
        }

        // Helper function to get correct coordinates for both mouse and touch events
        function getCoords(e) {
            if (e.touches && e.touches.length) {
                return { x: e.touches[0].clientX, y: e.touches[0].clientY };
            }
            return { x: e.clientX, y: e.clientY };
        }
        
        // --- EVENT HANDLERS FOR MOUSE & TOUCH ---
        
        // Function to start the drag operation
        function startDrag(e) {
            isDragging = true;
            totalMovement = 0; 
            const coords = getCoords(e);
            startX = coords.x;
            startY = coords.y;
            cube.style.transition = 'transform 0s';
            scene.style.cursor = 'grabbing';
            
            // For both mouse and touch, prevent default behavior immediately.
            // This is crucial for preventing page scroll on touch, and we will manually trigger
            // the link click in endDrag if it was a tap.
            e.preventDefault(); 
        }

        // Function to handle movement and rotation
        function handleMove(e) {
            if (!isDragging) return;

            const coords = getCoords(e);
            
            // Calculate movement from initial start point
            const movedX = coords.x - startX;
            const movedY = coords.y - startY;

            // Update total movement distance based on distance moved in THIS frame
            totalMovement += Math.sqrt(movedX * movedX + movedY * movedY);

            const rotationSpeed = 0.5; 

            // Horizontal movement controls Y-axis rotation (spin)
            currentRotationY += movedX * rotationSpeed;
            // Vertical movement controls X-axis rotation (tilt)
            currentRotationX -= movedY * rotationSpeed;

            // Clamp X rotation 
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
                scene.style.cursor = 'grab'; 
                cube.style.transition = 'transform 0.6s ease-in-out'; 

                // Check if the movement was less than the click threshold
                if (totalMovement < CLICK_THRESHOLD) {
                    // It was a tap/click, not a drag.
                    
                    // The element that was originally touched/clicked
                    // We need to find the specific <a> tag face that was tapped.
                    // Use a slight delay to ensure the event phase is complete if needed,
                    // but for a robust solution, we use the element that was *under* the touch.
                    
                    // Use elementFromPoint to find the element at the location of the touch/mouse release
                    const coords = e.changedTouches ? { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY } : { x: e.clientX, y: e.clientY };
                    const tappedElement = document.elementFromPoint(coords.x, coords.y);
                    
                    // Find the closest ancestor link (the 'face' a tag)
                    const linkElement = tappedElement.closest('.face');

                    if (linkElement && linkElement.href) {
                        // Manually navigate to the link's target
                        window.location.href = linkElement.href;
                    }
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

    // --- MODAL 1: Submission Modal Functionality (No Change) ---
    // (This section should be included as before to keep the file complete)
    const submissionModal = document.getElementById("submissionModal");
    const startMissionBtn = document.getElementById("startMissionBtn");
    const closeBtn = submissionModal ? submissionModal.querySelector(".close-btn") : null;
    const agentTags = document.querySelectorAll(".agent-tag");
    const submissionForm = submissionModal ? submissionModal.querySelector('form') : null;

    if (startMissionBtn && submissionModal) {
        startMissionBtn.onclick = function() {
            submissionModal.style.display = "flex";
        }
    }

    if (closeBtn) {
        closeBtn.onclick = function() {
            submissionModal.style.display = "none";
        }
    }

    agentTags.forEach(tag => {
        tag.addEventListener('click', function() {
            this.classList.toggle('selected');
        });
    });
    
    if (submissionForm && submissionModal) {
        submissionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            alert('Data Transmitted! (In a real site, this would send data to a server.)');
            
            submissionForm.reset();
            agentTags.forEach(tag => tag.classList.remove('selected'));
            submissionModal.style.display = "none";
        });

        submissionModal.addEventListener('click', function(event) {
            if (event.target.classList.contains('modal-backdrop')) {
                submissionModal.style.display = "none";
            }
        });
    }

});
