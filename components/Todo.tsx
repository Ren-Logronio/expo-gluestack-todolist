import useDeleteConfirmationDialog from "@/hooks/useDeleteConfirmationDialog";
import { TodoItem } from "@/utils/todos";
import { CheckboxIcon } from "@gluestack-ui/themed";
import { Box, Button, ButtonIcon, TextareaInput, HStack, Input, InputField, Text, VStack, Textarea, Checkbox, CheckboxIndicator } from "@gluestack-ui/themed";
import { Check, CheckIcon, Pencil, Trash, TrendingDown } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";

export default function Todo({
    todo, onDelete, onEdit
}: {todo: TodoItem, onDelete: () => void, onEdit: (todo: TodoItem) => void}){
    const [editMode, setEditMode] = useState<boolean>(false);
    const [editedTitle, setEditedTitle] = useState<string>("");
    const inputRef: any = useRef(null);
    const deleteConfirmationDialog = useDeleteConfirmationDialog();

    useEffect(()=> {
        if (editMode) {
            inputRef.current.getNativeRef().focus();
        } else {
            inputRef.isFocused && inputRef.current.getNativeRef().blur();
        }
    }, [editMode])

    const handleEdit = () => {
        setEditMode(false);
        onEdit({...todo, title: editedTitle});
    }

    const handleToggleComplete = (isChecked: boolean) => {
        onEdit({...todo, completed: isChecked});
    }

    return <HStack key={todo.id} space="md" $base-padding="$3" justifyContent="space-between" backgroundColor="$blue50">
        {/* <Text fontSize="$sm">{todo.title}</Text> */}
        <HStack flex={1}>
            <Checkbox defaultIsChecked={todo.completed} onChange={handleToggleComplete} key={todo.id} value={todo.id} aria-label={`${todo.completed ? "uncheck" : "check"} task ${todo.title}`}>
                <CheckboxIndicator mr="$2">
                    <CheckboxIcon as={CheckIcon} />
                </CheckboxIndicator>
            </Checkbox>
            <Input
                size="md"
                isReadOnly={!editMode}
                minHeight="$0"
                flex={1}
                borderColor="$transparent"
            >
                <InputField ref={inputRef} onBlur={() => setEditMode(false)} defaultValue={todo.title} onChangeText={(text) => setEditedTitle(text)} fontSize="$sm"></InputField>
            </Input>
        </HStack>
        <HStack space="xs">
            {!editMode && <Button 
                size="xs" 
                variant="outline" 
                action="secondary" 
                px="$3"
                isDisabled={false} 
                isFocusVisible={false} 
                onPress={() => setEditMode(true)}
            >
                <ButtonIcon as={Pencil} />
            </Button>}
            {
                editMode && <Button 
                    size="xs" 
                    variant="outline" 
                    action="secondary" 
                    px="$3"
                    isDisabled={false} 
                    isFocusVisible={false} 
                    onPress={handleEdit}
                >
                    <ButtonIcon as={Check} />
                </Button>
            }
            <Button 
                size="xs" 
                variant="outline" 
                action="secondary" 
                px="$3"
                isDisabled={false} 
                isFocusVisible={false} 
                onPress={() => deleteConfirmationDialog?.openWithCallback(onDelete)}
            >
                <ButtonIcon as={Trash} />
            </Button>
        </HStack>
    </HStack>
}