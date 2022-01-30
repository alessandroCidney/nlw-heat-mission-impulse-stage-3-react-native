import React from "react";
import { View } from "react-native";
import { Button } from "../Button";

import { styles } from "./styles";
import { COLORS } from "../../theme";
import { useAuth } from "../../hooks/useAuth";

export function SignInBox () {

  const { signIn, isLoadingSignIn } = useAuth();

  return (
    <View style={styles.container}>
      <Button
        title="ENTRAR COM O GITHUB"
        color={COLORS.BLACK_PRIMARY}
        backgroundColor={COLORS.YELLOW}
        icon="github"
        onPress={signIn}
        isLoading={isLoadingSignIn}
      />
    </View>
  );
};
