import { AlertDialog, AlertDialogBackdrop, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, Button, ButtonGroup, ButtonIcon, ButtonText, HStack, Heading, Icon, Input, InputField, Text } from "@gluestack-ui/themed";
import { Plus, X } from "lucide-react-native";
import { useState } from "react";


export default function AddTodoDialog({isOpen = false, setOpen, onAdd}: {
    isOpen: boolean;
    setOpen: (open: boolean) => void;
    onAdd: (title: string) => void;
}) {

    const [title, setTitle] = useState<string>("");

    const handleAdd = () => {
        onAdd(title);
        setTitle("");
    }

    return <AlertDialog
        isOpen={isOpen}
        onClose={() => {
            setOpen(false);
        }}
    >
        <AlertDialogBackdrop />
        <AlertDialogContent >
            <AlertDialogHeader>
                <Heading size="lg">Add Todo</Heading>
                <AlertDialogCloseButton>
                <Icon as={X} />
                </AlertDialogCloseButton>
            </AlertDialogHeader>
            <AlertDialogBody mb="$4">
                <HStack flex={1} space="sm">
                    <Input
                        variant="outline"
                        flex={1}
                        size="sm"
                        isDisabled={false}
                        isInvalid={false}
                        isReadOnly={false}
                    >
                        <InputField value={title} onChangeText={setTitle} placeholder="Enter Text here" />
                    </Input>
                    <Button
                        size="sm"
                        action="primary"
                        onPress={() => {
                            handleAdd();
                            setOpen(false);
                        }}
                    >
                        <ButtonIcon as={Plus} />
                    </Button>
                </HStack>
            </AlertDialogBody>
        </AlertDialogContent>
    </AlertDialog>
}