import { Stack } from "expo-router";
import React from "react";

const QuestionLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="question" />
      <Stack.Screen name="addQuestion" />
    </Stack>
  );
};

export default QuestionLayout;
