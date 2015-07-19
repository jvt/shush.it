$(document).ready(function()
{
  $('.install-button').on('click', function(event)
  {
    var button = $(this);
    button.addClass('disabled installed no-hover');
    button
      .find('i')
      .css('position', 'relative')
      .animate({
        top: '-40px'
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
    button
      .find('span p')
      .animate({
        top: '-40px'
      }, 400, function()
      {
        setTimeout(function()
        {
          button
            .find('span p')
            .animate({
              top: '-6px'
            }, 400);
        }, 1000);
      });


    button.append('<p class="addedToTweetbot" style="position:relative;top:0px;">Added to Tweetbot</p>');
    button
      .find('p.addedToTweetbot')
      .animate({
        top: '-63px',
      }, 400, function()
      {
        setTimeout(function()
        {
          button
            .find('p.addedToTweetbot')
            .animate({
              top: '0'
            }, 400, function()
            {
              button.removeClass('disabled installed no-hover');
              button.find('p.addedToTweetbot').remove();
            });
        }, 1000);
      });
  });
});