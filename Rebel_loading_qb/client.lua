-- Make sure to load config.lua before this script

Citizen.CreateThread(function()
    -- Wait for NUI to be ready
    Citizen.Wait(1000)
    SendNUIMessage({
        type = "updateConfig",
        serverName = Config.ServerName,
        serverLogo = Config.ServerLogo or "logo.png",
        music = Config.Music or {"music1.mp3"},
        video = Config.Video or "your-video.mp4",
        staff = Config.Staff,
        rules = Config.Rules,
        updates = Config.Updates,
        events = Config.Events
    })
end)

local function sendConfigToNUI()
    SendNUIMessage({
        type = "updateConfig",
        serverName = Config.ServerName,
        staff = Config.Staff,
        rules = Config.Rules
    })
end

RegisterNetEvent('onClientResourceStart')
AddEventHandler('onClientResourceStart', function(resourceName)
    if resourceName == GetCurrentResourceName() then
        sendConfigToNUI()
    end
end)