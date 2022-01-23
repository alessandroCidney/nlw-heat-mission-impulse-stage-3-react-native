import React from "react";
import { Image } from "react-native";

import { styles } from "./styles";

const SIZES = {
  SMALL: {
    containerSize: 32,
    avatarSize: 28
  },
  NORMAL: {
    containerSize: 48,
    avatarSize: 42
  }
};

type TUserPhotoProps = {
  imageUri: string | undefined;
  sizes?: 'SMALL' | 'NORMAL';
};

export function UserPhoto ({ imageUri, sizes = 'NORMAL' }: TUserPhotoProps) {
  const { containerSize, avatarSize } = SIZES[sizes];
  
  return (
    <Image
      style={[
        styles.avatar,
        {
          width: avatarSize,
          height: avatarSize,
          borderRadius: avatarSize / 2
        }
      ]}
      source={{ uri: imageUri }}
    />
  );
}