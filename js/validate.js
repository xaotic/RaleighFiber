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
                            send2Fuse(lat,lon);
            }).fail(function() {
                            alert("error");
            });
        }

      return false;
    }

    function send2Fuse(lat,lon) {
        alert(lat + ", infuse " + lon);

    }