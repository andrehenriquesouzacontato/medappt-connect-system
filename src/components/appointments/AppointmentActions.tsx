
import React from "react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

interface AppointmentActionsProps {
  onCancel: () => void;
}

export const AppointmentActions = ({ onCancel }: AppointmentActionsProps) => {
  return (
    <DialogFooter>
      <Button variant="outline" type="button" onClick={onCancel}>
        Cancelar
      </Button>
      <Button type="submit">Agendar Consulta</Button>
    </DialogFooter>
  );
};
