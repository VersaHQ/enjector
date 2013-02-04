var Enjector = (function(window, undefined) {
  var foo = function() {
    alert('hello');
  };
  
  var add_snippet = function() {
    var the_tag = document.createElement('script');
    the_tag.id = 'enxt-script';
    the_tag.type = 'text/javascript';
    the_tag['data-electnext'] = 1;
    
    var b = document.getElementsByTagName('body')[0];
    b.insertBefore(the_tag);
    
    window._enxt = window._enxt || [];
    window._enxt.push(['set_article', '1']);
    window._enxt.push(['set_account', 'abc123']);
    window._enxt.push(['setup_admin']);

    var enxt = document.createElement('script'); enxt.type = 'text/javascript'; enxt.async = true;
    enxt.src = '//electnext.com/api/v1/info_widget.js';
    var k = document.getElementById('enxt-script');
    k.parentNode.insertBefore(enxt, k);

  };
  
  return {
    foo: foo,
    add_snippet: add_snippet
  };
})(window);

Enjector.add_snippet();