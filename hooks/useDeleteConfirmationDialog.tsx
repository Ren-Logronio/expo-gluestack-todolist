import { DeleteConfirmationDialogContext, DeleteConfirmationDialogContextType } from "@/components/DeleteConfirmationDialog";
import { useContext } from "react";

export default function useDeleteConfirmationDialog(): DeleteConfirmationDialogContextType {
    return useContext(DeleteConfirmationDialogContext);
}