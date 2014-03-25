function validateForm()
    {
    	// Validate Title
    	var address = $("#fraddress").val();
    	if (address!="") { } else {
    		alert("Please enter a valid address");
    	}

    	// Validate Email
    	var email = $("#fremail").val();
    	if ((/(.+)@(.+){2,}\.(.+){2,}/.test(email)) || email!="" || email!=null) {
            alert(email);
        } else {
    		alert("Please enter a valid email");
    	}

      return false;
    }
