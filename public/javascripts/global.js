$(document).ready(function()
{
  $('.install-button').on('click', function(event)
  {
    var button = $(this);
    button.addClass('disabled installed no-hover');
    // $(this).find('i').remove();
    button
      .find('i')
      .css('position', 'relative')
      .animate({
        top: '-35px'
      }, 400, function()
      {
        setTimeout(function()
        {
          button
            .find('i')
            .animate({
              top: '0'
            }, 400);
        }, 1000);
      });
    button.append('<p style="position:relative;top:0px;">Added to Tweetbot</p>');
    button
      .find('p')
      .animate({
        top: '-63px',
      }, 400, function()
      {
        setTimeout(function()
        {
          button
            .find('p')
            .animate({
              top: '0'
            }, 400, function()
            {
              button.removeClass('disabled installed no-hover');
            });
        }, 1000);
      });
  });
});