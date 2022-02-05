export const imageSourceRetriever = (socialMedia: string) =>
  socialMedia === 'amazon'
    ? require('assets/amazon.png')
    : socialMedia === 'discord'
    ? require('assets/discord.png')
    : socialMedia === 'google'
    ? require('assets/google.png')
    : socialMedia === 'slack'
    ? require('assets/slack.png')
    : socialMedia === 'okta'
    ? require('assets/okta.png')
    : socialMedia === 'outlook'
    ? require('assets/outlook.png')
    : socialMedia === 'twitch'
    ? require('assets/twitch.png')
    : '';

export const socialMediaIcon = (socialMedia: string) =>
  socialMedia === 'facebook'
    ? 'facebook-square'
    : socialMedia === 'linkedin'
    ? 'linkedin-square'
    : socialMedia === 'other'
    ? 'questioncircle'
    : socialMedia;

export const socialMediaIconColor = (socialMedia: string) =>
  socialMedia === 'facebook'
    ? '#4267B2'
    : socialMedia === 'twitter'
    ? '#00ACEE'
    : socialMedia === 'linkedin'
    ? '#2867B2'
    : 'black';
