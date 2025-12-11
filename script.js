// --- MOUSE TRACKING GLOW ---
document.addEventListener('mousemove', (e) => {
    const glow = document.getElementById('mouse-glow');
    // Set the glow element's position based on the mouse cursor
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
});


// --- START MISSION MODAL LOGIC (mission_uplink.exe) ---
const missionModal = document.getElementById('mission-modal');
const startBtn = document.querySelector('.start-mission-btn');
const missionCloseBtn = missionModal.querySelector('.close-btn');

// Open the mission modal
startBtn.addEventListener('click', () => {
    missionModal.style.display = 'block';
});

// Close the mission modal via (X)
missionCloseBtn.addEventListener('click', () => {
    missionModal.style.display = 'none';
});


// --- PLAYER PROFILE DATA ---
const playerProfiles = {
    // KUTTYMAKERS
    'KuttyMakers': {
        number: '01',
        title: 'KUTTYMAKERS',
        age: 'Ages 10-17',
        mission: 'Children are already immersed in AI. A formal introduction guides their curiosity.',
        tactics: 'Pattern recognition games, sorting exercises, AI storybooks.',
        weaponry: ['Scratch', 'Teachable Machine', 'Logic Games'],
        accentColor: '#00c0ff' // Bright Cyan/Blue
    },
    // YOUNG MAKERS
    'YoungMakers': {
        number: '02',
        title: 'YOUNG MAKERS',
        age: 'College & Early Pros',
        mission: 'Tomorrow\'s essential skills are yet to be developed. Avoid becoming mere consumers.',
        tactics: 'Hackathons, developing GenAI apps, contributing to Kerala-specific AI models.',
        weaponry: ['LLMs', 'Generative AI', 'Python', 'Model Training'],
        accentColor: '#a000ff' // Purple
    },
    // FRIENDS OF MOVEMENT
    'FriendsOfMovement': {
        number: '03',
        title: 'FRIENDS OF MOVEMENT',
        age: 'Community & Elders',
        mission: 'Elders face scams and fake news. AI literacy provides protection and awareness.',
        tactics: 'Public discussions, identifying deepfakes, understanding privacy threats.',
        weaponry: ['Deepfake Detection', 'Privacy Tools', 'Learning Circles'],
        accentColor: '#00ff40' // Bright Green
    }
};

// --- PLAYER PROFILE MODAL LOGIC ---
const profileModal = document.getElementById('player-profile-modal');
const profileCloseBtn = document.querySelector('.profile-close-btn');
const profileContentArea = document.getElementById('profile-content-area');
const audienceCards = document.querySelectorAll('.audience-card'); 

// Function to generate and insert HTML content
function displayProfile(profileKey) {
    const profile = playerProfiles[profileKey];
    if (!profile) return;

    // 1. Generate Weaponry Tags HTML
    const weaponryHtml = profile.weaponry.map(tool => 
        `<span class="tool-tag">${tool}</span>`
    ).join('');

    // 2. Construct the full profile HTML
    const contentHtml = `
        <div class="profile-header" style="background-color: ${profile.accentColor};">
            <h3>${profile.number} ${profile.title}</h3>
            <span class="age-range">${profile.age}</span>
        </div>
        <div class="profile-body">
            <h4>THE MISSION (WHY)</h4>
            <p>${profile.mission}</p>

            <h4>TACTICS (HOW)</h4>
            <p>${profile.tactics}</p>

            <h4>WEAPONRY (TOOLS)</h4>
            <div class="weaponry-tags">${weaponryHtml}</div>
        </div>
    `;

    // 3. Insert and display
    profileContentArea.innerHTML = contentHtml;
    profileModal.style.display = 'block';
}

// 4. Attach click listener to each audience card
audienceCards.forEach(card => {
    const cardTitleElement = card.querySelector('h4');
    
    if (cardTitleElement) {
        let profileKey;
        // Determine the key based on the text content in the card
        if (cardTitleElement.textContent.includes('KuttyMakers')) {
             profileKey = 'KuttyMakers';
        } else if (cardTitleElement.textContent.includes('Young Makers')) {
             profileKey = 'YoungMakers';
        } else if (cardTitleElement.textContent.includes('Friends of Movement')) {
             profileKey = 'FriendsOfMovement';
        }
        
        // Add the click listener
        card.addEventListener('click', () => {
            if (profileKey) {
                displayProfile(profileKey);
            }
        });
    }
});


// 5. Close Profile Modal functionality
profileCloseBtn.addEventListener('click', () => {
    profileModal.style.display = 'none';
});

// 6. Close Modals when clicking anywhere outside of them
window.addEventListener('click', (event) => {
    if (event.target === missionModal) {
        missionModal.style.display = 'none';
    }
    if (event.target === profileModal) {
        profileModal.style.display = 'none';
    }
});
