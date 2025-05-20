// This file contains the JavaScript code for the loading screen.
// It handles the logic for displaying and updating the loading screen.

document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loading-screen'); // Add this to your HTML root loading screen div
    const loadingText = document.getElementById('loading-text');
    const progressBar = document.getElementById('progress-bar');

    let progress = 0;
    let loadingInterval = null;

    function updateLoadingScreen() {
        if (progress < 100) {
            progress += Math.random() * 10; // Simulate loading progress
            progress = Math.min(progress, 100); // Cap at 100%
            loadingText.innerText = `Loading... ${Math.round(progress)}%`;
            progressBar.style.width = `${progress}%`;
        } else {
            clearInterval(loadingInterval);
            setTimeout(() => {
                // Hide the loading screen after loading is complete
                loadingScreen.style.display = 'none';
            }, 1000);
        }
    }

    // Listen for NUI message to show/hide loading screen
    window.addEventListener('message', function(event) {
        if (event.data.type === "showLoading") {
            loadingScreen.style.display = 'flex'; // Or 'block', depending on your CSS
            progress = 0;
            loadingText.innerText = `Loading... 0%`;
            progressBar.style.width = `0%`;
            loadingInterval = setInterval(updateLoadingScreen, 500);
        }
        if (event.data.type === "hideLoading") {
            clearInterval(loadingInterval);
            loadingScreen.style.display = 'none';
        }
        if (event.data.type === "updateConfig") {
            // Server name
            if (document.getElementById('server-name')) {
                document.getElementById('server-name').innerText = event.data.serverName;
            }

            // Server logo
            if (document.getElementById('server-logo')) {
                document.getElementById('server-logo').src = event.data.serverLogo;
            }

            // Video
            if (document.getElementById('bg-video')) {
                document.getElementById('bg-video').src = event.data.video;
            }

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

    fetch('config.json')
      .then(response => response.json())
      .then(config => {
        document.getElementById('server-name').innerText = config.serverName;
        document.getElementById('server-logo').src = config.serverLogo;
        document.getElementById('bg-video').src = config.video;
        // ...populate staff, rules, updates, events, music, etc.
      });
});