$(document).ready(function() {
  $('#loginbtn').click(function() {
      $('#modal-login').css('display', 'block');
      $('.modal-bg').fadeIn();
  });
});

// close symbol of login form is clicked
$(document).ready(function() {
  $('a#login-page.close').on('click', function(){
    $('.modal-bg').fadeOut();   
    $('#modal-login').fadeOut();
    return false;
  });
});
$(document).ready(function() {
  $('.modal-bg').on('click', function(){
    $('.modal-bg').fadeOut();   
    $('#modal-login').fadeOut();
    return false;
  });
});
// close symbol of signup form is clicked
$(document).ready(function() {
  $('a#signup-page.close').on('click', function(){
    $('.modal-bg').fadeOut();   
    $('#modal-signup').fadeOut();
    return false;
  });
});