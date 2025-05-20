// This file contains the JavaScript code for the loading screen.
// It handles the logic for displaying and updating the loading screen.

document.addEventListener('DOMContentLoaded', function() {
    const loadingText = document.getElementById('loading-text');
    const progressBar = document.getElementById('progress-bar');

    let progress = 0;

    function updateLoadingScreen() {
        if (progress < 100) {
            progress += Math.random() * 10; // Simulate loading progress
            progress = Math.min(progress, 100); // Cap at 100%
            loadingText.innerText = `Loading... ${Math.round(progress)}%`;
            progressBar.style.width = `${progress}%`;
        } else {
            // Once loading is complete, you can trigger the next event
            setTimeout(() => {
                // Example: Trigger an event to hide the loading screen
                // This should be replaced with your actual logic
                console.log('Loading complete!');
                // Optionally, you can redirect or change the screen here
            }, 1000);
        }
    }

    setInterval(updateLoadingScreen, 500); // Update loading screen every 500ms

    function showPage(pageId) {
        const pages = ['staff-page', 'rules-page', 'updates-page', 'events-page'];
        pages.forEach(id => {
            document.getElementById(id).style.display = (id === pageId) ? 'block' : 'none';
        });
    }

    document.getElementById('staff-btn').onclick = () => showPage('staff-page');
    document.getElementById('rules-btn').onclick = () => showPage('rules-page');
    document.getElementById('updates-btn').onclick = () => showPage('updates-page');
    document.getElementById('events-btn').onclick = () => showPage('events-page');
});

window.addEventListener('message', function(event) {
    if (event.data.type === "updateConfig") {
        // Server name
        document.getElementById('server-name').innerText = event.data.serverName;

        // Server logo
        document.getElementById('server-logo').src = event.data.serverLogo;

        // Video
        document.getElementById('bg-video').src = event.data.video;

        // Music playlist
        window.musicList = event.data.music;
        window.currentMusic = 0;
        const musicPlayer = document.getElementById('music-player');
        musicPlayer.src = window.musicList[0];

        // Staff
        const staffList = document.getElementById('staff-list');
        staffList.innerHTML = '';
        event.data.staff.forEach(member => {
            const li = document.createElement('li');
            li.innerText = `${member.role}: ${member.name}`;
            staffList.appendChild(li);
        });

        // Rules
        const rulesList = document.getElementById('rules-list');
        rulesList.innerHTML = '';
        event.data.rules.forEach(rule => {
            const li = document.createElement('li');
            li.innerText = rule;
            rulesList.appendChild(li);
        });

        // Updates
        const updatesList = document.getElementById('updates-list');
        updatesList.innerHTML = '';
        event.data.updates.forEach(update => {
            const li = document.createElement('li');
            li.innerText = update;
            updatesList.appendChild(li);
        });

        // Events
        const eventsList = document.getElementById('events-list');
        eventsList.innerHTML = '';
        event.data.events.forEach(eventItem => {
            const li = document.createElement('li');
            li.innerText = eventItem;
            eventsList.appendChild(li);
        });
    }
});