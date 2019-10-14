/* eslint-disable no-undef */

$(function() {
  // remove errors
  function removeErrors() {
    $("form.login p.error, form.register p.error").remove();
    $("form.login input, form.register input").removeClass("error");
  }
  // toggle
  var flag = true;
  $(".switch-button").on("click", function(e) {
    e.preventDefault();

    $("input").val("");
    removeErrors();

    if (flag) {
      flag = false;
      $(".register").show("slow");
      $(".login").hide();
    } else {
      flag = true;
      $(".login").show("slow");
      $(".register").hide();
    }
  });
});

/* eslint-enable no-undef */
