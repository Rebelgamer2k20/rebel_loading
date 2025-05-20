-- Make sure config.lua is loaded before this script

RegisterNetEvent('rebel_loading:showLoading', function()
    print("SHOW LOADING EVENT FIRED")
    SetNuiFocus(false, false)
    SendNUIMessage({ type = "showLoading" })
end)

RegisterNetEvent('rebel_loading:hideLoading', function()
    SetNuiFocus(false, false)
    SendNUIMessage({ type = "hideLoading" })
end)

AddEventHandler('onClientMapStart', function()
    TriggerEvent('rebel_loading:showLoading')
end)

AddEventHandler('playerSpawned', function()
    TriggerEvent('rebel_loading:hideLoading')
end)

AddEventHandler('onClientResourceStart', function(resource)
    if resource == GetCurrentResourceName() then
        TriggerEvent('rebel_loading:showLoading')
    end
end)

Citizen.CreateThread(function()
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