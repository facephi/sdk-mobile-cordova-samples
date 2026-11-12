setTimeout(function()
{
    if (typeof facephi.plugins.sdkcore !== "undefined")
    {
        facephi.plugins.sdkcore.startListeningTrackingEvents(
            (event) => {
                console.log('📡 startListeningTrackingEvents recibido:', event);
            },
            (err) => {
                console.error('❌ Error:', err);
            }
        );
        facephi.plugins.sdkcore.startListeningFlowEvents(
            (event) => {
                console.log('📡 startListeningFlowEvents recibido:', event);
            },
            (err) => {
                console.error('❌ Error:', err);
            }
        );
    }
}, 2000);