fx_version 'cerulean'
game 'gta5'

author 'Your Name'
description 'Custom Loading Screen for FiveM'
version '1.0.0'

ui_page 'html/index.html'

files {
    'html/index.html',
    'html/style.css',
    'html/script.js',
    'html/logo.png',
    'html/your-video.mp4',
    'html/music1.mp3',
    -- add any other assets here
}

client_scripts {
    'config.lua',
    'client.lua'
}