$(document).ready(function() {
  $('#loginbtn').click(function() {
      $('#modal-login').css('display', 'block');
      $('.modal-bg').fadeIn();
  });
});

function turnOffLogin() {
    $('.modal-bg').fadeOut();   
    $('#modal-login').fadeOut();
    return false;
};

// close symbol of login form is clicked
$(document).ready(function() {
  $('a#login-page.close').on('click', turnOffLogin);
});
/*$(document).ready(function() {
  $('.modal-bg').on('click', function(){
    $('.modal-bg').fadeOut();   
    $('#modal-login').fadeOut();
    return false;
  });
});*/
// close symbol of signup form is clicked
$(document).ready(function() {
  $('a#signup-page.close').on('click', function(){
    $('.modal-bg').fadeOut();   
    $('#modal-signup').fadeOut();
    return false;
  });
});

$(document).ready(function() {
  $('#createbtn').click(function() {
      $('#modal-create').css('display', 'block');
      $('.modalcreate-bg').fadeIn();
  });
});

function turnOffCreate() {
    $('.modalcreate-bg').fadeOut();   
    $('#modal-create').fadeOut();
    return false;
};

$(document).ready(function() {
  $('a#create-page.close').on('click', turnOffCreate);
});