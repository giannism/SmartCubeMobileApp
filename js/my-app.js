// Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

// Callbacks to run specific code for specific pages, for example for About page:
myApp.onPageInit('about', function (page) {
    // run createContentPage func after link was clicked
    $$('.create-page').on('click', function () {
        createContentPage();
    });
});

// Generate dynamic page
var dynamicPageIndex = 0;
function createContentPage() {
	mainView.router.loadContent(
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '  <div class="navbar-inner">' +
        '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
        '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
        '  </div>' +
        '</div>' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="dynamic-pages" class="page">' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
        '      <div class="content-block">' +
        '        <div class="content-block-inner">' +
        '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
        '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>'
    );
	return;
}
//this function controlls the sign in as popup message and fades it out.
$(function() {
    var locEmail = localStorage.email;
    var locName = localStorage.forename; 
    console.log('Saved in LocalStorage - email: ' + locEmail + ' ' + 'name: ' + locName);
    if(locEmail){
    $('body').append('<div class="wlc-msg"> Signed in as: ' + locEmail + '</div>').delay(2000).queue(function(){
        $('.wlc-msg').fadeOut(500).delay(500).queue(function(){
            $(this).remove();       
        });    
        
    });
        
    
    }
    
});


//This shows a message for action (on or off)
function showMsg(action) {
	$('body').append('<div class="lgt-msg"> Light has Been Turned ' + action + '</div>').delay(3000).queue(function() {
		$('.lgt-msg').fadeOut(500).delay(500).queue(function() {
			$(this).remove();
		});
		console.log('Light is' + action);
	});
}

//This will make e equal to 0 or 1 depending on action
function onOff(action) {
	var e = 0;
	if(action == 'on'){
		e = 1;
	}
	$.ajax({
		type: "POST",
		url: "http://smartcubewebservice.appspot.com/api/AddEvent",
		data: '[{ "DevID" : "1", "DevNewVal" : "' + e + '"}]',
		success: function(data) {
			showMsg(action);
            console.log('Light is: ' + action);
		},
		error: function(data) {
            consol.log('server disconnected');
			$('#result ')
				.html(
					'<h1 style="text-align:center; color:red;">Result for Add Device</h1><hr>Error Response : ' + data.responseText);
		}
	});
}

//This will send (on or off) too the onOff Function
$('input[type="checkbox"]').click(function() {
	var action = 'off';
	if ($('input').is(':checked')) {
		action = 'on';
	}
	onOff(action);
});




