
import { Button } from "@/components/ui/button";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface DeleteConfirmDialogProps {
  onDelete: () => void;
  onCancel: () => void;
}

const DeleteConfirmDialog = ({ onDelete, onCancel }: DeleteConfirmDialogProps) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Confirmar exclusão</DialogTitle>
        <DialogDescription>
          Tem certeza que deseja excluir este paciente? Esta ação não pode ser desfeita.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button variant="destructive" onClick={onDelete}>
          Excluir
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default DeleteConfirmDialog;
