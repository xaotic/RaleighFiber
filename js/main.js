$('article').each(function(){
  var $obj = $(this);
  $(window).scroll(function() {
    var yPos = -($(window).scrollTop() / $obj.data('speed'));
    var bgpos = '50% '+ yPos + 'px';
    $obj.css('background-position', bgpos );
  });
});