var Enjector = (function(window, undefined) {
  var snippet_added = false, injector_target = null; article_id = null;
  
  var add_snippet = function() {
    var the_tag = document.createElement('script');
    the_tag.id = 'enxt-script';
    the_tag.type = 'text/javascript';
    the_tag.setAttribute('data-electnext','');
    the_tag.textContent = "window._enxt = [['set_article', '50ea754fe45794c926000001'],['set_account', 'abc123'],['setup_admin']];";
        
    var b = document.getElementsByTagName('body')[0];
    b.insertBefore(the_tag);

    var enxt = document.createElement('script'); enxt.type = 'text/javascript'; enxt.async = true;
    enxt.src = '//electnext.dev/api/v1/info_widget.js';
    var k = document.getElementById('enxt-script');
    k.parentNode.insertBefore(enxt, k);
    this.snippet_added = true;
  };
  
  var show_options = function() {
    var opt_box = document.createElement('div');
    opt_box.innerHTML = "<form id='enxt-options-form'>"
      +"Target selector: $(<input type='text' id='enxt-injector-selector' placeholder='leave blank to add to bottom of page' />) "
      +"Article ID: <input type='text' id='enxt-injector-article-id' />"
      +"<button>Inject widget</button>"
      +"</form>";
    
    var b = document.getElementsByTagName('body')[0];
    b.firstElementChild.insertAdjacentElement('beforebegin', opt_box);
    
    var option_form = opt_box.querySelector("#enxt-options-form");
    var that = this;
    option_form.addEventListener('submit', function(ev) {
      ev.preventDefault();
      that.injector_target = document.getElementById('enxt-injector-selector').value;
      that.article_id = document.getElementById('enxt-injector-article-id').value;

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

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  if(request.command === "show_options") {
    Enjector.show_options();
  }
});