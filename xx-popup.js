$(function() {
  console.log('loaded');
  $('#enjector-form').on('submit', function(ev) {
    ev.preventDefault();
    var selector = $('#selector').val() || 'body',
        api_key = $('#api_key').val() || 'abc123',
        article_id = $('#article_id').val() || '1';
    
    console.log(selector);
    console.log(api_key);
    console.log(article_id);
    
    console.log()
    return false;
  });
});
