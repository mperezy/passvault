import React from 'react';
import { Image } from 'react-native';

import { AntDesign } from '@expo/vector-icons';

import {
  imageSourceRetriever,
  socialMediaIcon,
  socialMediaIconColor,
} from 'utils/imageDataRetriever';

export const SocialMediaIcon = ({ style, socialMedia }: Props) => {
  if (['amazon', 'discord', 'google', 'slack', 'okta', 'outlook', 'twitch'].includes(socialMedia)) {
    const imageSource = imageSourceRetriever(socialMedia);

    return <Image style={style} source={imageSource} />;
  }
  const getSocialMedia: any = socialMediaIcon(socialMedia);
  const socialMediaColor = socialMediaIconColor(socialMedia);

  return <AntDesign style={style} name={getSocialMedia} size={24} color={socialMediaColor} />;
};

interface Props {
  style: any;
  socialMedia: string;
}
