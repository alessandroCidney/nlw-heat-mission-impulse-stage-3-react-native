import React from "react";
import { Text, View } from "react-native";
import { UserPhoto } from "../UserPhoto";

import { MotiView } from 'moti';

import { styles } from './styles';

export type TMessageProps = {
  id: string;
  text: string;
  user: {
    name: string;
    avatar_url: string;
  }
};

type TProps = {
  data: TMessageProps;
};

export function Message ({ data }: TProps) {
  
  return (
    <MotiView
      from={{ opacity: 0, translateY: -50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 700 }}
      style={styles.container}
    >
      <Text style={styles.message}>
        { data.text }
      </Text>

      <View style={styles.footer}>
        <UserPhoto
          sizes="SMALL"
          imageUri={data.user.avatar_url}
        />

        <Text style={styles.userName}>
          { data.user.name }
        </Text>
      </View>
    </MotiView>
  );
};
