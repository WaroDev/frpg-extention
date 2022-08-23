# Let's get started
  
First thing I did was hitting the F12 key and opened up the network tab before loading the farmrpg.com/index.php website. I scrolled down the list of GET and POST requests and had a closer look at some of the requested files. The index-app.php file is very interesting (https://farmrpg.com/js/index-app.php) because it returns some Javascript code and seems to be e.g. responsible for loading other JS files dependend on what page we are currently at in the game.  
```
if (page.name == 'register') {
        $.getScript("js/register.js");
        $.getScript("https://www.google.com/recaptcha/api.js");
    } else if (page.name == 'login') {
        $.getScript("js/login.js");
    } else if (page.name == 'forgot') {
        $.getScript("js/forgot.js");
    } else if (page.name == 'wiki') {
        $.getScript("js/wiki.js");
        new ClipboardJS('.sharelink');
    } else if (page.name == 'profile') {
        $.getScript("js/profile.js");
    } else if (page.name == 'index-1') {
		getStats();
        $.getScript("js/index.js");
    } else if (page.name == 'logout') {
        $.getScript("js/logout.js");
    } else if (page.name == 'settings') {
        $.getScript("js/settings.js");
    } else if (page.name == 'message') {
        $.getScript("js/message.js");
    } else if (page.name == 'messages') {
        $.getScript("js/messages.js");
    } else if (page.name == 'members') {
        $.getScript("js/members.js");
    } else if (page.name == 'sendmessage') {
        $.getScript("js/sendmessage.js");
    } else if (page.name == 'setupfarm') {
        $.getScript("js/setupfarm.js");
    } else if (page.name == 'farm') {
		$.getScript("js/farm.php");
	} else if (page.name == 'store') {
		$.getScript("js/store.js");
	} else if (page.name == 'market') {
		$.getScript("js/market.js");
	} else if (page.name == 'fishing') {
		$.getScript("js/fishing.js");
	} else if (page.name == 'perks') {
		$.getScript("js/perks.js");
	} else if (page.name == 'workshop') {
        ...
        ...
```
We can access those files directly by putting them into the URL after "https:///farmrpg.com/", e.g. "https:///farmrpg.com/js/market.js". After opening and reading some of the files you will recognize an always present "$.ajax()" function call which fires HTTP GET/POST requests at a given URL with optional parameters. The targeted URL is always the "worker.php" which, as the name supposes, handles almost everything the users do. To control the behavior of the worker there are parameters in the URL, first of is always the "go" parameter e.g. "worker.php?go=unlockinv". The value of this parameter (like "unlockinv") is, if not directly written into the URL string, defined in a "method" variable. Here is some code of js/market.js to show you what I mean.
```
$$(".unlockbtn").click(function(e) { 

  method = "unlockinv";
  id = $(this).data("id");

  if (id > 0) {
    var buttons = [
    {
        text: 'Unlock this Item?',
        label: true
    },
    {
        text: 'Yes',
        onClick: function () {
            
            $.ajax({
                url: "worker.php?go="+method+"&id="+id,
                    method: "POST"
            })
            .done(function(data) {
                
                console.log('success', data);
    
                // save current scroll before page refresh
                currentScroll = $$(mainView.activePage.container).find('.page-content').scrollTop();
                mainView.router.refreshPage();
                
                });
```
