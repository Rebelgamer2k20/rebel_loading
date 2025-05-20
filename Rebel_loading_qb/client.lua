-- Make sure config.lua is loaded before this script

RegisterNetEvent('rebel_loading:showLoading', function()
    SetNuiFocus(true, true)
    SendNUIMessage({ type = "showLoading" })
end)

RegisterNetEvent('rebel_loading:hideLoading', function()
    SetNuiFocus(false, false)
    SendNUIMessage({ type = "hideLoading" })
end)

Citizen.CreateThread(function()
    -- Send config to NUI when resource starts
    Citizen.Wait(500)
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

TriggerEvent('rebel_loading:showLoading')