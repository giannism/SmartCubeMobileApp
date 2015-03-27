//Forms for login and signup window
//call in app browser
$(function(){
    $('.login .register-button').click(function(){
        var url="http://louisdickinson.com/smartcube/#register";
        $('body').append('<i class="fa fa-close exit-iframe"></i><iframe src="' + url + '" seemless id="register-iframe"></iframe>');
        $('#register-iframe').fadeToggle(200);
    });
     //function to dismiss in app browser after registration is complete                             
    $('body').on('click','.exit-iframe',function(){
        $('.exit-iframe,#register-iframe').fadeOut(function(){
            $('.exit-iframe,#register-iframe').remove();
            });
    });
    
        
                                  
    
    function errorAlert(email,d) {
        alert('Username: ' + email + ' or Password not valid');
        console.log(d);
        console.log(d[0].Email);
    }
    
    
    //user login system. some of the data is also stored in localstorage for later use.
    console.log('page started');
    $('.login a[type="submit"]').click(function(){
        console.log('localStorage: ' + localStorage.email);
        //users login credentials stored in variable for validation
        var username = $('#username').val();
        var password = $('#password').val();
        console.log(username + ' ' + password);
        $('#result ').html('<p style="text-align:center"> Logging In...</p>');
        $.ajax({
            type : "POST",
            url : 'http://smartcubewebservice.appspot.com/api/authenticateuser',
            data : '[{ "Email" : ' + username + ', "Password" : ' + password + ' + }]',
            //data validation successfull
            success : function(data) {
                data = jQuery.parseJSON(data);
                localStorage.email=data.Email;
                localStorage.forename=data.Forename;
                console.log('JSON EMAIL: ' + data);
                var login = 0;
                if(data.Email == username){
                    console.log('Login SUccessful welcome :'+data.Email);
                   $('#success').html('<h1>Welcome ' + data.Email + '</h1>');
                    window.location.href="dashboard.html";
                }
                else{
                   $('#fail').html('Invalid email or password');
                    console.log('Invalid username or password')
                }
               
            },error : function(data) {                      //when data is not validated
                console.log('ERROR: ' + data);
                $('#fail').html('Invalid email or password');
			}

        });
        return false;
    });
});