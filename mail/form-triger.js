

$(document).ready(function() {
	
    $("form").on( "submit", function( event ) {
            event.preventDefault();
            var values = {};
            var temp_str = "";
            var theform = this;
            var proceed = true;
            var is_confirm = false;
            var confirm_pop = "";
            var is_redirect = false;
            var redirect_link = "";
            var have_type = false;
            var the_type = "";
            if($(theform).attr('dv-confirm')){
                confirm_pop = $(theform).attr('dv-confirm');
                is_confirm = true;
            }
            if($(theform).attr('dv-redirect')){
                redirect_link = $(theform).attr('dv-redirect');
                is_redirect = true;
            }
            if($(theform).attr('dv-service')){
                if(($(theform).attr('dv-service')!='') && ($(theform).attr('dv-service')!='#' )){
                    the_type = $(theform).attr('dv-service');
                    have_type = true;    
                }
            }
            
            $("input, textarea, select").css('border-color',''); 
            $.each($(theform).serializeArray(), function(i, field) {
                values[field.name] = field.value;
                temp_str += field.name + ": " + field.value + "\n";
                var is_required =$(theform).find('[name='+field.name+']').attr('required');
                //alert("THE FORM IS: "+sada);
                if(field.value=="" && is_required){
                    $(theform).find('input[name='+field.name+']').css('border-color','red');     
                    $(theform).find('textarea[name='+field.name+']').css('border-color','red');     
                    $(theform).find('select[name='+field.name+']').css('border-color','red'); 
                    proceed = false;
                }
                 //alert(this.name);
            });
            // if(is_confirm){
            //     $.fancybox($("#" + confirm_pop));
            // }
            //alert(temp_str);
            if(proceed) 
            {   
                if(have_type){
                    values['dvformtype'] = the_type;
                    //alert(the_type);
                }
                //data to be sent to server
                var post_data;
                var output;
                //Ajax post data to server
                $.post('mail/functions.php', values, function(response){  
                    //load json data from server and output message     
                    if(response.type == 'error')
                    {
                        output = '<div class="error">'+response.text+'</div>';
                    }else{
                        if(is_confirm){
                            $.fancybox($("#" + confirm_pop));
                        }
                        if(is_redirect){
                            window.location.href = redirect_link;
                        }
                        output = '<div class="success">'+response.text+'</div>';
                        //reset values in all input fields
                        $(theform).find('input').val(''); 
                        $(theform).find('textarea').val(''); 
                    }
                    $(theform).find('#contact_results').hide().html(output).slideDown();
                }, 'json');
                
            }
            //alert( $( this ).serialize() );
        });
        $("input, textarea,  select").keyup(function() { 
            $(this).css('border-color',''); 
            $('#contact_results').slideUp();
        });
	
	$("#submit_btn1").click(function() { 
       
	    var proceed = true;
        //simple validation at client's end
        //loop through each field and we simply change border color to red for invalid fields		
		$("#dv_form input[required]").each(function(){
			$(this).css('border-color',''); 
			if(!$.trim($(this).val())){ //if this field is empty 
				$(this).css('border-color','red'); //change border color to red   
				proceed = false; //set do not proceed flag
			}
			//check invalid email
			var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/; 
			if($(this).attr("type")=="email" && !email_reg.test($.trim($(this).val()))){
				$(this).css('border-color','red'); //change border color to red   
				proceed = false; //set do not proceed flag				
			}	
		});		
		
       
        if(proceed) //everything looks good! proceed...
        {
			//get input field values data to be sent to server
            post_data = {
				'user_name'		: $('input[name=name]').val(), 
				'user_email'	: $('input[name=email]').val(),
				'user_message'	: $('textarea[name=message]').val()
			};
            
            //Ajax post data to server
            $.post('mail/contact1.php', post_data, function(response){  
				if(response.type == 'error'){ //load json data from server and output message     
					output = '<div class="modal" id="myModal" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><a class="close" href="javascript:location.reload(true)">x</a><h4 class="modal-title">Ooops</h4></div><div class="modal-body"><div class="error">'+response.text+'</div></div></div></div></div>';
				}else{
				    
					output = '<div class="modal" id="myModal" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><a class="close" href="javascript:location.reload(true)">x</a><h4 class="modal-title">THANK YOU!</h4></div><div class="modal-body"><div id="overlay_form" class="success">'+response.text+'</div></div></div></div></div>';
				
				}
				$("#dv_form #contact_results").hide().html(output).slideDown();
            }, 'json');
        }
    });
	
	$("#submit_btn2").click(function() { 
       
	    var proceed = true;
        //simple validation at client's end
        //loop through each field and we simply change border color to red for invalid fields		
		$("#contact_form2 input[required=required]").each(function(){
			$(this).css('border-color',''); 
			if(!$.trim($(this).val())){ //if this field is empty 
				$(this).css('border-color','red'); //change border color to red   
				proceed = false; //set do not proceed flag
			}
			//check invalid email
			var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/; 
			if($(this).attr("type")=="email" && !email_reg.test($.trim($(this).val()))){
				$(this).css('border-color','red'); //change border color to red   
				proceed = false; //set do not proceed flag				
			}	
		});		
		
       
        if(proceed) //everything looks good! proceed...
        {
			//get input field values data to be sent to server
            post_data = {
				'user_email'	: $('input[name=email]').val()
			};
            
            //Ajax post data to server
            $.post('mail/contact2.php', post_data, function(response){  
				if(response.type == 'error'){ //load json data from server and output message     
					output = '<div class="modal tx-left" id="myModal" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><a class="close" href="javascript:location.reload(true)">x</a><h4 class="modal-title">Ooops</h4></div><div class="modal-body"><div class="error">'+response.text+'</div></div></div></div></div>';
				}else{
				    
					output = '<div class="modal tx-left" id="myModal" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><a class="close" href="javascript:location.reload(true)">x</a><h4 class="modal-title">THANK YOU!</h4></div><div class="modal-body"><div id="overlay_form" class="success">'+response.text+'</div></div></div></div></div>';
				
				}
				$("#contact_form2 #contact_results").hide().html(output).slideDown();
            }, 'json');
        }
    });
	$("#submit_btn3").click(function() { 
       
	    var proceed = true;
        //simple validation at client's end
        //loop through each field and we simply change border color to red for invalid fields		
		$("#contact_form3 input[required=required]").each(function(){
			$(this).css('border-color',''); 
			if(!$.trim($(this).val())){ //if this field is empty 
				$(this).css('border-color','red'); //change border color to red   
				proceed = false; //set do not proceed flag
			}
			//check invalid email
			var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/; 
			if($(this).attr("type")=="email" && !email_reg.test($.trim($(this).val()))){
				$(this).css('border-color','red'); //change border color to red   
				proceed = false; //set do not proceed flag				
			}	
		});		
		
       
        if(proceed) //everything looks good! proceed...
        {
			//get input field values data to be sent to server
            post_data = {
				'user_name'		: $('input[name=name]').val(),
				'user_email'	: $('input[name=email]').val()
			};
            
            //Ajax post data to server
            $.post('mail/contact3.php', post_data, function(response){  
				if(response.type == 'error'){ //load json data from server and output message     
					output = '<div class="modal tx-left" id="myModal" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><a class="close" href="javascript:location.reload(true)">x</a><h4 class="modal-title">Ooops</h4></div><div class="modal-body"><div class="error">'+response.text+'</div></div></div></div></div>';
				}else{
				    
					output = '<div class="modal tx-left" id="myModal" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><a class="close" href="javascript:location.reload(true)">x</a><h4 class="modal-title">THANK YOU!</h4></div><div class="modal-body"><div id="overlay_form" class="success">'+response.text+'</div></div></div></div></div>';
				
				}
				$("#contact_form3 #contact_results").hide().html(output).slideDown();
            }, 'json');
        }
    });
	$("#submit_btn4").click(function() { 
       
	    var proceed = true;
        //simple validation at client's end
        //loop through each field and we simply change border color to red for invalid fields		
		$("#contact_form4 input[required=required]").each(function(){
			$(this).css('border-color',''); 
			if(!$.trim($(this).val())){ //if this field is empty 
				$(this).css('border-color','red'); //change border color to red   
				proceed = false; //set do not proceed flag
			}
			//check invalid email
			var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/; 
			if($(this).attr("type")=="email" && !email_reg.test($.trim($(this).val()))){
				$(this).css('border-color','red'); //change border color to red   
				proceed = false; //set do not proceed flag				
			}	
		});		
		
       
        if(proceed) //everything looks good! proceed...
        {
			//get input field values data to be sent to server
            post_data = {
				'user_fname'	: $('input[name=fname]').val(),
				'user_lname'	: $('input[name=lname]').val(),
				'user_email'	: $('input[name=email]').val(),
				'user_phone'	: $('input[name=phone]').val(),
				'user_country'	: $('input[name=country]').val(),
				'user_package'	: $('input[name=package]').val(),
				'user_message'	: $('textarea[name=message]').val()
			};
            
            //Ajax post data to server
            $.post('mail/contact4.php', post_data, function(response){  
				if(response.type == 'error'){ //load json data from server and output message     
					output = '<div class="modal tx-left" id="myModal" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><a class="close" href="javascript:location.reload(true)">x</a><h4 class="modal-title">Ooops</h4></div><div class="modal-body"><div class="error">'+response.text+'</div></div></div></div></div>';
				}else{
				    
					output = '<div class="modal tx-left" id="myModal" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><a class="close" href="javascript:location.reload(true)">x</a><h4 class="modal-title">THANK YOU!</h4></div><div class="modal-body"><div id="overlay_form" class="success">'+response.text+'</div></div></div></div></div>';
				
				}
				$("#contact_form4 #contact_results").hide().html(output).slideDown();
            }, 'json');
        }
    });

    $('#contact_form5 input').keydown(function(e) {
		if (e.keyCode == 13) {
    

	    var proceed = true;
        //simple validation at client's end
        //loop through each field and we simply change border color to red for invalid fields		
		$("#contact_form5 input[required=required]").each(function(){
			$(this).css('border-color',''); 
			if(!$.trim($(this).val())){ //if this field is empty 
				$(this).css('border-color','red'); //change border color to red   
				proceed = false; //set do not proceed flag
			}
			//check invalid email
			var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/; 
			if($(this).attr("type")=="email" && !email_reg.test($.trim($(this).val()))){
				$(this).css('border-color','red'); //change border color to red   
				proceed = false; //set do not proceed flag				
			}	
		});		
		
       
        if(proceed) //everything looks good! proceed...
        {
			//get input field values data to be sent to server
            post_data = {
				'user_email'	: $('input[name=email]').val()
			};
            
            //Ajax post data to server
            $.post('mail/contact2.php', post_data, function(response){  
				if(response.type == 'error'){ //load json data from server and output message     
					output = '<div class="modal tx-left" id="myModal" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><a class="close" href="javascript:location.reload(true)">x</a><h4 class="modal-title">Ooops</h4></div><div class="modal-body"><div class="error">'+response.text+'</div></div></div></div></div>';
				}else{
				    
					output = '<div class="modal tx-left" id="myModal" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><a class="close" href="javascript:location.reload(true)">x</a><h4 class="modal-title">THANK YOU!</h4></div><div class="modal-body"><div id="overlay_form" class="success">'+response.text+'</div></div></div></div></div>';
				
				}
				$("#contact_form5 #contact_results").hide().html(output).slideDown();
            }, 'json');
        }
		}
    });
});