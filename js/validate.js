function validateForm()
    {
        var lat = "";
        var lon = "";
    	// Validate Email
    	var email = $("#fremail").val();
    	if ((/(.+)@(.+){2,}\.(.+){2,}/.test(email)) || email!="" || email!=null) {
        } else {
    		alert("Please enter a valid email");
    	}

    	// Validate Address
    	var address = $("#fraddress").val();
    	if (address=="") {
    	    alert("Please enter a valid address");
    	} else {
    	    function processResult() {
    	    alert("Please address");

               return $.ajax({
                    type: "GET",
                    url: "http://nominatim.openstreetmap.org/search?q="+address+"&format=json",
                    dataType: "json",
                    success: function (response) {
                        for(i in response) {
                            lat = response[i].lat;
                            lon = response[i].lon;
                            alert(lat + ", " + lon);
                        }
                    }
                });
            }
            processResult().done(function(result) {
                            alert(lat + ", processResult" + lon);
                            send2Fuse(email, lat,lon);
                            send2GoogleForm(lat,lon);
            }).fail(function() {
                            alert("error");
            });
        }

      return false;
    }

    function send2Fuse(email, lat,lon) {
        alert(" lat =" + lat+ email + " lon=" + lon);
        	return $.ajax({
                    type: "GET",
                    url: "http://localhost:8080/inbound/query?email="+email+"&lat="+lat+"&lon="+lon,
                    dataType: "html",
                    success: function (response) {
                        for(i in response) {
                            alert("inside Fuse Response" +response);
                        }
                    }
                });

    }

    function send2GoogleForm(lat,lon) {
                    $.ajax({
                        url: "https://docs.google.com/forms/d/1dQUPSmQTpgf4imFbIWBU2U3CjDxjFR4SP9BisPyAlqc",
                        data: { "entry_427647861": lat, "entry_1907208820": lon },
                        type: "POST",
                        dataType: "xml",
                        statusCode: {
                            0: function () {
                                alert("success");
                            },
                            200: function () {
                                alert("success");
                            }
                        }
                    });

    }