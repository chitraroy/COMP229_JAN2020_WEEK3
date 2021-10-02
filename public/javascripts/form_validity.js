     //Get Form item/text box values in variable
	 var v_fname = document.getElementById("name");
      var v_email = document.getElementById("email");
      var v_contact = document.getElementById("contact");
      var v_message = document.getElementById("message");
	  
//Function to check values populated or not and return the specific messages for form items
function check_if_valid_input() {
	
	if (!v_fname.checkValidity()) {
        v_fname.setCustomValidity("Please Fill Your Name");
	    v_fname.reportValidity();
        
        
	}
	else if (!v_email.checkValidity()) {
        v_email.setCustomValidity("Please Fill Your email");
        v_email.reportValidity();
	}
	else if (!v_contact.checkValidity()) {
        v_contact.setCustomValidity("Please Fill Your Contact Number");
        v_contact.reportValidity();
	}
	else if (!v_message.checkValidity()) {
        v_message.setCustomValidity("Please Write a small massage about your enquery");
        v_message.reportValidity();
	}
	
	else {
		alert("Your Information is received.I will get back to you soon"); //alert message on successful validation
		document.getElementById("contact_form").reset();
    
	}
	
}

//Form Reset function
function formReset(){
document.getElementById("contact_form").reset(); 
}
