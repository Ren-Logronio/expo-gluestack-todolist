import generateId from "@/utils/generateId";
import { TodoItem, addItem, getAllItems, updateItem } from "@/utils/todos";
import { Center, FabIcon, ScrollView } from "@gluestack-ui/themed";
import { Box, Button, ButtonIcon, ButtonText, Checkbox, CheckboxGroup, CheckboxIcon, CheckboxIndicator, CheckboxLabel, Fab, FabLabel, HStack, Input, InputField, Text, VStack } from "@gluestack-ui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Plus, Check, Pencil, Trash } from "lucide-react-native";
import { useEffect, useState } from "react";
import AddTodoDialog from "./AddTodoDialog";
import Todo from "./Todo";

export default function TodoList() {
    
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [addTodoDialogOpen, setAddTodoDialogOpen] = useState<boolean>(false);

    const [title, setTitle] = useState<string>("");

    useEffect(() => {
        AsyncStorage.getItem("todos").then((data) => {
            data && setTodos(JSON.parse(data));
        });
    }, []);

    useEffect(() => {
        AsyncStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const addTodo = (title: string) => {
        setTodos((prev) => {
            return [...prev, { id: generateId(), title, order: prev.length + 1, completed: false }];
        });
    }

    return <Box $base-mt="$8" flex={1}>
        <ScrollView
            style={{ height: "100%" }}
            contentContainerStyle={{ flexGrow: 1 }}
        >
            {
                !todos?.length && <Center flex={1}>
                    <Text fontSize="$sm" color="$black100">No Todos to Show</Text>
                </Center>
            }
            <VStack space="md">
                {todos.map((todo) => {
                    return <Todo 
                        key={todo.id}
                        todo={todo}
                        onDelete={() => setTodos(prev => prev.filter((item) => item.id !== todo.id))}
                        onEdit={(todos) => setTodos(prev => prev.map((item) => item.id === todo.id ? todo : item))}
                    />
                    // <HStack key={todo.id} space="md" $base-padding="$3" justifyContent="space-between" backgroundColor="$blue50">
                    //     <Text fontSize="$sm">{todo.title}</Text>
                    //     <HStack space="xs">
                    //         <Button 
                    //             size="xs" 
                    //             variant="outline" 
                    //             action="secondary" 
                    //             px="$3"
                    //             isDisabled={false} 
                    //             isFocusVisible={false} 
                    //         >
                    //             <ButtonIcon as={Pencil} />
                    //         </Button>
                    //         <Button 
                    //             size="xs" 
                    //             variant="outline" 
                    //             action="secondary" 
                    //             px="$3"
                    //             isDisabled={false} 
                    //             isFocusVisible={false} 
                    //             onPress={() => {
                    //                 setTodos(prev => prev.filter((item) => item.id !== todo.id));
                    //             }}
                    //         >
                    //             <ButtonIcon as={Trash} />
                    //         </Button>
                    //     </HStack>
                    // </HStack>
                })}
            </VStack>
        </ScrollView>
        <Fab
            size="lg"
            placement="bottom right"
            isHovered={false}
            isDisabled={false}
            isPressed={false}
            onPress={() => {
                setAddTodoDialogOpen(true);
            }}
        >
            <FabIcon as={Plus} size="xl" mr="$1" />
            {/* <FabLabel>Todo</FabLabel> */}
        </Fab>
        <AddTodoDialog isOpen={addTodoDialogOpen} setOpen={setAddTodoDialogOpen} onAdd={addTodo} />
    </Box>
}