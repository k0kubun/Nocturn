module.exports =
class TweetDecorator
  @decorate: (element, tweet) ->
    element.removeClass('hidden_template')

    # use id_str to avoid overflow
    element.data('id', tweet.id_str)

    element.find('.user_name').text(tweet.user.name)
    element.find('.screen_name').text(tweet.user.screen_name)

    element.find('.user_icon').attr('src', tweet.user.profile_image_url)
    element.find('.tweet_body').html(tweet.text.replace("\n", '<br>'))

    element
