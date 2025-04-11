
import { useState } from "react";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Doctor } from "@/lib/types";

interface DoctorFormProps {
  doctor: Doctor | null;
  onSave: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
}

const DoctorForm = ({ doctor, onSave, onCancel }: DoctorFormProps) => {
  const isEditing = !!doctor;

  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>{doctor ? "Editar Médico" : "Adicionar Médico"}</DialogTitle>
        <DialogDescription>
          {doctor
            ? "Edite as informações do médico abaixo"
            : "Preencha os dados do novo médico"}
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={onSave}>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nome completo</Label>
            <Input 
              id="name" 
              name="name" 
              defaultValue={doctor?.name || ""} 
              required 
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="specialty">Especialidade</Label>
            <Input 
              id="specialty" 
              name="specialty" 
              defaultValue={doctor?.specialty || ""} 
              required 
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              name="email" 
              type="email" 
              defaultValue={doctor?.email || ""} 
              required 
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Telefone</Label>
            <Input 
              id="phone" 
              name="phone" 
              defaultValue={doctor?.phone || ""} 
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="bio">Bio</Label>
            <Input 
              id="bio" 
              name="bio" 
              defaultValue={doctor?.bio || ""} 
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit">Salvar</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default DoctorForm;
