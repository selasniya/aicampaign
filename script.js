document.addEventListener('DOMContentLoaded', function() {
    
    // --- CUBE ROTATION FUNCTIONALITY (MOUSE DRAG LOGIC) ---
    
    const cube = document.getElementById('cube');
    const scene = document.querySelector('.scene');
    
    // Rotation state variables
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let currentRotationY = 0; 
    let currentRotationX = 0; 

    // Initialize the cube's starting rotation (matches CSS initial state)
    if (cube) {
        currentRotationX = 20; 
        currentRotationY = -45; 
        cube.style.transform = `rotateX(${currentRotationX}deg) rotateY(${currentRotationY}deg)`;
        cube.style.transition = 'transform 0s'; // Disable CSS transition during drag

        // Function to apply the rotation
        function applyCubeRotation() {
            cube.style.transform = `rotateX(${currentRotationX}deg) rotateY(${currentRotationY}deg)`;
        }

        // 1. Mouse Down: Starts the drag operation
        scene.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            // Change cursor style to indicate dragging state
            scene.style.cursor = 'grabbing';
            e.preventDefault(); 
        });

        // 2. Mouse Move: Calculates rotation while dragging
        scene.addEventListener('mousemove', (e) => {
            if (!isDragging) return;

            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;

            const rotationSpeed = 0.5; 

            // Horizontal mouse movement controls Y-axis rotation (spin)
            currentRotationY += deltaX * rotationSpeed;
            // Vertical mouse movement controls X-axis rotation (tilt)
            currentRotationX -= deltaY * rotationSpeed;

            // Optional: Clamp X rotation to prevent flipping the view too much
            currentRotationX = Math.max(-90, Math.min(90, currentRotationX));

            applyCubeRotation();

            // Update start position for the *next* movement calculation
            startX = e.clientX;
            startY = e.clientY;
        });

        // 3. Mouse Up: Ends the drag operation
        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                scene.style.cursor = 'grab'; // Restore pointer/grab cursor style
                cube.style.transition = 'transform 0.6s ease-in-out'; // Re-enable transition 
            }
        });
        
    } // End if (cube) check

    // --- MODAL 1: Submission Modal Functionality ---
    
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

});document.addEventListener('DOMContentLoaded', function() {
    
    // --- CUBE ROTATION FUNCTIONALITY (MOUSE DRAG LOGIC) ---
    
    const cube = document.getElementById('cube');
    const scene = document.querySelector('.scene');
    
    // Rotation state variables
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let currentRotationY = 0; 
    let currentRotationX = 0; 

    // Initialize the cube's starting rotation (matches CSS initial state)
    if (cube) {
        currentRotationX = 20; 
        currentRotationY = -45; 
        cube.style.transform = `rotateX(${currentRotationX}deg) rotateY(${currentRotationY}deg)`;
        cube.style.transition = 'transform 0s'; // Disable CSS transition during drag

        // Function to apply the rotation
        function applyCubeRotation() {
            cube.style.transform = `rotateX(${currentRotationX}deg) rotateY(${currentRotationY}deg)`;
        }

        // 1. Mouse Down: Starts the drag operation
        scene.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            // Change cursor style to indicate dragging state
            scene.style.cursor = 'grabbing';
            e.preventDefault(); 
        });

        // 2. Mouse Move: Calculates rotation while dragging
        scene.addEventListener('mousemove', (e) => {
            if (!isDragging) return;

            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;

            const rotationSpeed = 0.5; 

            // Horizontal mouse movement controls Y-axis rotation (spin)
            currentRotationY += deltaX * rotationSpeed;
            // Vertical mouse movement controls X-axis rotation (tilt)
            currentRotationX -= deltaY * rotationSpeed;

            // Optional: Clamp X rotation to prevent flipping the view too much
            currentRotationX = Math.max(-90, Math.min(90, currentRotationX));

            applyCubeRotation();

            // Update start position for the *next* movement calculation
            startX = e.clientX;
            startY = e.clientY;
        });

        // 3. Mouse Up: Ends the drag operation
        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                scene.style.cursor = 'grab'; // Restore pointer/grab cursor style
                cube.style.transition = 'transform 0.6s ease-in-out'; // Re-enable transition 
            }
        });
        
    } // End if (cube) check

    // --- MODAL 1: Submission Modal Functionality ---
    
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

});document.addEventListener('DOMContentLoaded', function() {
    
    // --- CUBE ROTATION FUNCTIONALITY (MOUSE DRAG LOGIC) ---
    
    const cube = document.getElementById('cube');
    const scene = document.querySelector('.scene');
    
    // Rotation state variables
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let currentRotationY = 0; 
    let currentRotationX = 0; 

    // Initialize the cube's starting rotation (matches CSS initial state)
    if (cube) {
        currentRotationX = 20; 
        currentRotationY = -45; 
        cube.style.transform = `rotateX(${currentRotationX}deg) rotateY(${currentRotationY}deg)`;
        cube.style.transition = 'transform 0s'; // Disable CSS transition during drag

        // Function to apply the rotation
        function applyCubeRotation() {
            cube.style.transform = `rotateX(${currentRotationX}deg) rotateY(${currentRotationY}deg)`;
        }

        // 1. Mouse Down: Starts the drag operation
        scene.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            // Change cursor style to indicate dragging state
            scene.style.cursor = 'grabbing';
            e.preventDefault(); 
        });

        // 2. Mouse Move: Calculates rotation while dragging
        scene.addEventListener('mousemove', (e) => {
            if (!isDragging) return;

            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;

            const rotationSpeed = 0.5; 

            // Horizontal mouse movement controls Y-axis rotation (spin)
            currentRotationY += deltaX * rotationSpeed;
            // Vertical mouse movement controls X-axis rotation (tilt)
            currentRotationX -= deltaY * rotationSpeed;

            // Optional: Clamp X rotation to prevent flipping the view too much
            currentRotationX = Math.max(-90, Math.min(90, currentRotationX));

            applyCubeRotation();

            // Update start position for the *next* movement calculation
            startX = e.clientX;
            startY = e.clientY;
        });

        // 3. Mouse Up: Ends the drag operation
        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                scene.style.cursor = 'grab'; // Restore pointer/grab cursor style
                cube.style.transition = 'transform 0.6s ease-in-out'; // Re-enable transition 
            }
        });
        
    } // End if (cube) check

    // --- MODAL 1: Submission Modal Functionality ---
    
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

});document.addEventListener('DOMContentLoaded', function() {
    
    // --- CUBE ROTATION FUNCTIONALITY (MOUSE DRAG LOGIC) ---
    
    const cube = document.getElementById('cube');
    const scene = document.querySelector('.scene');
    
    // Rotation state variables
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let currentRotationY = 0; 
    let currentRotationX = 0; 

    // Initialize the cube's starting rotation (matches CSS initial state)
    if (cube) {
        currentRotationX = 20; 
        currentRotationY = -45; 
        cube.style.transform = `rotateX(${currentRotationX}deg) rotateY(${currentRotationY}deg)`;
        cube.style.transition = 'transform 0s'; // Disable CSS transition during drag

        // Function to apply the rotation
        function applyCubeRotation() {
            cube.style.transform = `rotateX(${currentRotationX}deg) rotateY(${currentRotationY}deg)`;
        }

        // 1. Mouse Down: Starts the drag operation
        scene.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            // Change cursor style to indicate dragging state
            scene.style.cursor = 'grabbing';
            e.preventDefault(); 
        });

        // 2. Mouse Move: Calculates rotation while dragging
        scene.addEventListener('mousemove', (e) => {
            if (!isDragging) return;

            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;

            const rotationSpeed = 0.5; 

            // Horizontal mouse movement controls Y-axis rotation (spin)
            currentRotationY += deltaX * rotationSpeed;
            // Vertical mouse movement controls X-axis rotation (tilt)
            currentRotationX -= deltaY * rotationSpeed;

            // Optional: Clamp X rotation to prevent flipping the view too much
            currentRotationX = Math.max(-90, Math.min(90, currentRotationX));

            applyCubeRotation();

            // Update start position for the *next* movement calculation
            startX = e.clientX;
            startY = e.clientY;
        });

        // 3. Mouse Up: Ends the drag operation
        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                scene.style.cursor = 'grab'; // Restore pointer/grab cursor style
                cube.style.transition = 'transform 0.6s ease-in-out'; // Re-enable transition 
            }
        });
        
    } // End if (cube) check

    // --- MODAL 1: Submission Modal Functionality ---
    
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
