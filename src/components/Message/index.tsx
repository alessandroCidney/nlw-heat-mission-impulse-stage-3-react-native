import React from "react";
import { Text, View } from "react-native";
import { UserPhoto } from "../UserPhoto";

import { styles } from './styles';

export function Message () {
  
  return (
    <View style={styles.container}>
      <Text style={styles.message}>
        Texto da mensagem
      </Text>

      <View>
        <UserPhoto sizes="SMALL" imageUri="https://github.com/alessandroCidney.png" />

        <Text style={styles.userName}>Nome do usuário</Text>
      </View>
    </View>
  );
};
