import { AlertDialog, AlertDialogBackdrop, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, Button, ButtonGroup, ButtonIcon, ButtonText, HStack, Heading, Icon, Input, InputField, Text } from "@gluestack-ui/themed";
import { Plus, X, Trash } from "lucide-react-native";
import { createContext, useState } from "react";

export type DeleteConfirmationDialogContextType = {
    isOpen: boolean,
    openWithCallback: (callback: () => void) => void,
} | null

export const DeleteConfirmationDialogContext = createContext<DeleteConfirmationDialogContextType>(null)

export default function DeleteConfirmationDialogProvider({children}: {children: React.ReactNode}) {
    const [isOpen, setOpen] = useState<boolean>(false);
    const [callback, setCallback] = useState<() => void>(() => {});

    const openWithCallback = (cb: () => void) => {
        setCallback(() => cb);
        setOpen(true);
    }

    return <>
                <AlertDialog
                    isOpen={isOpen}
                    onClose={() => {
                        setOpen(false);
                    }}
                >
                    <AlertDialogBackdrop />
                    <AlertDialogContent >
                        <AlertDialogHeader>
                            <Heading size="lg">Confirm</Heading>
                            <AlertDialogCloseButton>
                            <Icon as={X} />
                            </AlertDialogCloseButton>
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            <Text fontSize="$sm">Are you sure you want to delete this item?</Text>
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <ButtonGroup>
                                <Button
                                    size="sm"
                                    action="secondary"
                                    onPress={() => {
                                        setCallback(() => {});
                                        setOpen(false);
                                    }}
                                >
                                    <ButtonText>No</ButtonText>
                                </Button>
                                <Button
                                    size="sm"
                                    action="negative"
                                    onPress={() => {
                                        callback();
                                        setCallback(() => {});
                                        setOpen(false);
                                    }}
                                >
                                    <ButtonIcon as={Trash} />
                                    <ButtonText>Yes</ButtonText>
                                </Button>
                            </ButtonGroup>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                <DeleteConfirmationDialogContext.Provider value={{isOpen, openWithCallback}}>
                    {children}
                </DeleteConfirmationDialogContext.Provider>
            </>
}