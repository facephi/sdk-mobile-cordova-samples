var URL     = 'https://endpoint';
var URL2    = '';
var header  = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
    'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
    //'Content-type': 'application/json',
    //'Access-Control-Allow-Headers': 'Content-Type',
    //'Access-Control-Request-Headers': 'X-Custom-Header',
    //'Access-Control-Allow-Methods': 'POST',
    //'Access-Control-Allow-Origin' : '*',
    'client-id' : '',
    'token-app' : '',
    'x-api-key' : '',
    'app-name'  : ''
};

function evaluateLiveness()
{
    if (selphiResponse == null) {
        console.log("Some params are missing! selphiResponse...");
        return
    }

    var fail        = true;
    var error       = "Something went wrong!";
    var parametros  = { "bestImage": selphiResponse.bestImageTemplateRaw, "templateRaw": selphiResponse.templateRaw };
    $.ajax({
        headers     : header,
        data		: JSON.stringify(parametros),
        url			: URL + '/method',
        type		: 'post',
        contentType : "application/json",
        timeout		: 20000, //20 SEG.
        dataType	: 'json',
        beforeSend: function ()
        {
            $('#loader').removeClass('hidden');
            $('.row-res').remove();
        },
        success:  function(data)
        {
            console.log(data);
            if (Object.keys(data).length > 0) {
                for (var i = 0; i < Object.keys(data).length; i++)
                {
                    $(".modal-content").append("<p class='row-res'>" + Object.keys(data)[i] + ": " + data[Object.keys(data)[i]] + "</p>");
                }
                fail = false;
            }
            else if (data.responseJSON.message != "")
            {
                error = data.responseJSON.message;
            }
            else
            {
                console.log("Unmanaged responseJSON...");
            }
        },
        complete: function(data)
        {
            $('#loader').addClass('hidden');
            if (!fail)
            {
                $("#myModal").show();
            }
            else
            {
                alert(error);
            }
        }
        ,error: function(x, t, m)
        {
            console.log(x);
            fail = true
            try
            {
                if (t === "timeout")
                {
                    error = "TimeOut. No se pudo enviar la Info - Vuelva a intentarlo nuevamente";
                }
                else if (x.responseJSON.message != "") {
                    error = x.responseJSON.message;
                }
            }
            catch(e)
            {
                error = e.toString();
            }
        }
    });
}

function authenticateFacial()
{
    if (selphiResponse == null || tokenFaceImage == null) {
        console.log("Some params are missing! selphiResponse or tokenFaceImage...");
        return
    }
    var fail        = true;
    var error       = "Something went wrong!";
    var parametros  = { "token1": tokenFaceImage, "token2": selphiResponse.templateRaw, "method": 5 };
    $.ajax({
        headers     : header,
        data		: JSON.stringify(parametros),
        url			: URL + '/method',
        contentType : "application/json",
        type		: 'post',
        timeout		: 20000, //20 SEG.
        dataType	: 'json',
        beforeSend: function ()
        {
            $('#loader').removeClass('hidden');
            $('.row-res').remove();
        },
        success:  function(data)
        {
            console.log(data);
            if (Object.keys(data).length > 0) {
                for (var i = 0; i < Object.keys(data).length; i++)
                {
                    $(".modal-content").append("<p class='row-res'>" + Object.keys(data)[i] + ": " + data[Object.keys(data)[i]] + "</p>");
                }
                fail = false;
            }
            else if (data.responseJSON.message != "")
            {
                error = data.responseJSON.message;
            }
            else
            {
                console.log("Unmanaged responseJSON...");
            }
        },
        complete: function(data)
        {
            $('#loader').addClass('hidden');
            if (!fail)
            {
                $("#myModal").show();
            }
            else
            {
                alert(error);
            }
        }
        ,error: function(x, t, m)
        {
            console.log(x);
            fail = true
            try
            {
                if (t === "timeout")
                {
                    error = "TimeOut. No se pudo enviar la Info - Vuelva a intentarlo nuevamente";
                }
                else if (x.responseJSON.message != "") {
                    error = x.responseJSON.message;
                }
            }
            catch(e)
            {
                error = e.toString();
            }
        }
    });
}

function passiveLivenessEvaluate()
{
    if (selphiResponse == null || data == null || cordova.plugin.http == null) {
        console.log("Some params are missing! selphiResponse or data...");
        console.log("Also, verify the correct install of the cordova-plugin-advanced-http plugin");
        return
    }

    try
    {
        $('#loader').removeClass('hidden');
        $('.row-res').remove();

        var error       = "Something went wrong!";
        const options   = {
          method: 'post',
          data: { "extraData": data, "image": selphiResponse.bestImage },
          headers: { 'Content-Type': 'application/json; charset=UTF-8', },
          serializer: 'json'
        };

        cordova.plugin.http.sendRequest(URL2 + '/v5/api/v1/selphid/passive-liveness/evaluate', options
        , function(response)
        {
          // prints 200
          console.log('response.status', response.status);
          console.log('response.data', response.data);
          const data = JSON.parse(response.data);
          for (var i = 0; i < Object.keys(data).length; i++)
          {
              $(".modal-content").append("<p class='row-res'>" + Object.keys(data)[i] + ": " + data[Object.keys(data)[i]] + "</p>");
          }

          $('#loader').addClass('hidden');
          $('#myModal').show();
        },
        function(response)
        {
          // prints 403
          console.log('response.status', response.status);
          //prints Permission denied
          console.log(response.error);
          alert(response.error);
        });
    }
    catch(e)
    {
        alert(e);
    }
}

function authenticateFacialDocument()
{
    if (selphiResponse == null || tokenFaceImage == null || data == null || cordova.plugin.http == null) {
        console.log("Some params are missing! selphiResponse or tokenFaceImage or data...");
        console.log("Also, verify the correct install of the cordova-plugin-advanced-http plugin");
        return
    }

    try
    {
        $('#loader').removeClass('hidden');
        $('.row-res').remove();

        var error       = "Something went wrong!";
        const options   = {
          method: 'post',
          data: { 'documentTemplate': tokenFaceImage, 'extraData': data, 'image1': selphiResponse.bestImage },
          headers: { 'Content-Type': 'application/json; charset=UTF-8', },
          serializer: 'json'
        };

        cordova.plugin.http.sendRequest(URL2 + '/v5/api/v1/selphid/authenticate-facial/document/face-image', options
        , function(response)
        {
          // prints 200
          console.log('response.status', response.status);
          console.log('response.data', response.data);
          const data = JSON.parse(response.data);
          for (var i = 0; i < Object.keys(data).length; i++)
          {
              $(".modal-content").append("<p class='row-res'>" + Object.keys(data)[i] + ": " + data[Object.keys(data)[i]] + "</p>");
          }

          $('#loader').addClass('hidden');
          $('#myModal').show();
        },
        function(response)
        {
          // prints 403
          console.log('response.status', response.status);
          //prints Permission denied
          console.log(response.error);
          alert(response.error);
        });
    }
    catch(e)
    {
        alert(e);
    }
}