var Enjector = (function(window, undefined) {
  var snippet_added = false, 
    injector_target = null, 
    injector_position = null,
    article_id = null, 
    widget_type = null;
  
  var add_snippet = function() {
    var command = this.widget_type === 'front_end' ? 'setup_profiles' : 'setup_admin';
    var the_tag = document.createElement('script');
    the_tag.id = 'enxt-script';
    the_tag.type = 'text/javascript';
    the_tag.setAttribute('data-electnext','');
    
    the_tag.textContent = "window._enxt = [['set_article', '"+this.article_id+"'],['set_account', 'abc123'],['"+command+"']];";
        
    var b = document.getElementsByTagName('body')[0];
    if(this.injector_target != "" && document.querySelector(this.injector_target)) {
      b = document.querySelector(this.injector_target);
    }
    b.insertAdjacentElement(this.injector_position,the_tag);

    var enxt = document.createElement('script'); enxt.type = 'text/javascript'; enxt.async = true;
    enxt.src = '//electnext.com/api/v1/info_widget.js';
    var k = document.getElementById('enxt-script');
    k.parentNode.insertBefore(enxt, k);
    this.snippet_added = true;
  };
  
  // Add the options bar to the current page
  var show_options = function() {
    var opt_box = document.createElement('div');
    var options_css = '<style>'
      +'#enxt-options-wrapper { background-color: #0068a0; color: #FFF; padding: 7px; opacity: 0.9; width: 100%; position:fixed; z-index: 1000; }'
      +'#enxt-options-wrapper form { margin: 0 auto; width: 768px; }'
      +'#enxt-options-wrapper input[type="text"] { margin: 0; padding: 0 4px; background-color: #fff; width: 100px; }'
      +'#enxt-options-wrapper span { margin-right: 10px; font: 12px/14px sans-serif; }'
      +'#enxt-options-wrapper select { display: inline-table; width: 100px; height: auto; margin: 0; }'
      +'#enxt-options-wrapper select#enxt-injector-position { width: 190px; }'
      +'#enxt-options-wrapper button { border-radius: 5px; text-shadow: 1px 1px 1px #fff; background-color: #efefef; }'
      +'</style>';
    opt_box.innerHTML = options_css+"<div id='enxt-options-wrapper'>"
      +"<form id='enxt-options-form'>"
      +"<div>"
      +"<span>Put the widget <select id='enxt-injector-position'>"
      +"<option value='beforeend'>just inside the bottom of</option>"
      +"<option value='afterend'>just after</option>"
      +"<option value='beforebegin'>just before</option>"
      +"<option value='afterbegin'>just inside the start of</option>"
      +"</select></span>"
      +"<span><input type='text' id='enxt-injector-selector' placeholder='CSS Selector' /></span>"
      +"<span><input type='text' id='enxt-injector-article-id' placeholder='Article ID' /></span>"
      +"<span><select id='enxt-injector-type'><option value='backend'>Admin</option><option value='front_end'>Front end</option></select></span>"
      +"<button>Inject!</button>"
      +"</div>"
      +"</form></div>";
    
    var b = document.getElementsByTagName('body')[0];
    b.firstElementChild.insertAdjacentElement('beforebegin', opt_box);
    
    var option_form = opt_box.querySelector("#enxt-options-form");
    var that = this;
    
    // When 'inject widget' button is clicked, pull the values out of the form and
    // add the ElectNext js snippet to the current page.
    option_form.addEventListener('submit', function(ev) {
      ev.preventDefault();
      that.injector_target = document.getElementById('enxt-injector-selector').value;
      that.injector_position = document.getElementById('enxt-injector-position').value;
      that.article_id = document.getElementById('enxt-injector-article-id').value;
      that.widget_type = document.getElementById('enxt-injector-type').value;
      if(!that.snippet_added) {
        that.add_snippet();
      }
    });
  }
  
  return {
    add_snippet: add_snippet,
    show_options: show_options
  };
})(window);

// When the browser_action button is clicked, it sends a message that is picked up by
// this guy, who, in turn, firsts off a function in the content script.
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  if(request.command === "show_options") {
    Enjector.show_options();
  }
});