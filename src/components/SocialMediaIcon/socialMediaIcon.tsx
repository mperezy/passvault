import React from 'react';
import { Image } from 'react-native';

import { AntDesign } from '@expo/vector-icons';

import {
  imageSourceRetriever,
  socialMediaIcon,
  socialMediaIconColor,
} from 'utils/imageDataRetriever';

export const SocialMediaIcon = (props: { style: any; socialMedia: string }) => {
  const { style, socialMedia } = props;

  if (['amazon', 'discord', 'google', 'slack', 'okta', 'outlook', 'twitch'].includes(socialMedia)) {
    const imageSource = imageSourceRetriever(socialMedia);

    return <Image style={style} source={imageSource} />;
  } else {
    const getSocialMedia: any = socialMediaIcon(socialMedia);
    const socialMediaColor = socialMediaIconColor(socialMedia);

    return <AntDesign style={style} name={getSocialMedia} size={24} color={socialMediaColor} />;
  }
};
