import {
  Box,
  Button,
  ButtonText,
  Center,
  HStack,
  ScrollView,
  Spinner,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { Suspense, useEffect, useState } from "react";
import TodoList from "@/components/TodoList";
export default function Home() {
  
  return (
    <Box flex={1} backgroundColor="$white">
        <Box
          height="60%"
          $base-mt="$12"
          $base-mb="$4"
          $base-mx="$4"
          $base-height="80%"
          $lg-my="$24"
          $lg-mx="$5"
          justifyContent="flex-start"
          flex={1}
        >
          <Text fontSize="$lg" fontWeight="$semibold">Test TodoList</Text>
          <Suspense fallback={<Center h={300}>
              <Spinner size="large" />
            </Center>}>
            <TodoList></TodoList>
          </Suspense>
        </Box>
    </Box>
  );
}
