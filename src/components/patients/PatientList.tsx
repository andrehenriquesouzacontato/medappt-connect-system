
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import { patients } from "@/lib/mockData";
import { Patient } from "@/lib/types";
import { useToast } from "@/components/ui/use-toast";

import PatientListHeader from "./PatientListHeader";
import PatientSearch from "./PatientSearch";
import PatientCard from "./PatientCard";
import PatientForm, { PatientFormData } from "./PatientForm";
import DeleteConfirmDialog from "./DeleteConfirmDialog";

const PatientList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>(patients);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (term === "") {
      setFilteredPatients(patients);
    } else {
      const filtered = patients.filter(
        (patient) =>
          patient.name.toLowerCase().includes(term) ||
          patient.email.toLowerCase().includes(term) ||
          (patient.healthInsurance && patient.healthInsurance.toLowerCase().includes(term))
      );
      setFilteredPatients(filtered);
    }
  };

  const handleAddPatient = () => {
    setSelectedPatient(null);
    setIsDialogOpen(true);
  };

  const handleEditPatient = (id: string) => {
    setSelectedPatient(id);
    const patient = patients.find(p => p.id === id);
    setIsDialogOpen(true);
  };

  const handleDeleteConfirm = (id: string) => {
    setSelectedPatient(id);
    setDeleteConfirmOpen(true);
  };

  const handleDelete = () => {
    if (selectedPatient) {
      const newPatients = filteredPatients.filter((patient) => patient.id !== selectedPatient);
      setFilteredPatients(newPatients);
      
      toast({
        title: "Paciente removido",
        description: "O paciente foi removido com sucesso",
      });
      
      setDeleteConfirmOpen(false);
    }
  };

  const onSubmit = (data: PatientFormData) => {
    // Implementação de salvar ou atualizar paciente
    setIsDialogOpen(false);
    
    toast({
      title: selectedPatient ? "Paciente atualizado" : "Paciente adicionado",
      description: selectedPatient
        ? "As informações do paciente foram atualizadas com sucesso"
        : "O novo paciente foi adicionado com sucesso",
    });
  };

  // Encontra o paciente atual para edição ou usa valores padrão para novo paciente
  const getCurrentPatient = (): PatientFormData => {
    if (selectedPatient) {
      const patient = patients.find(p => p.id === selectedPatient);
      if (patient) {
        return {
          name: patient.name || "",
          email: patient.email || "",
          phone: patient.phone || "",
          cpf: patient.cpf || "",
          dateOfBirth: patient.dateOfBirth || "",
          healthInsurance: patient.healthInsurance || "",
        };
      }
    }
    
    return {
      name: "",
      email: "",
      phone: "",
      cpf: "",
      dateOfBirth: "",
      healthInsurance: "",
    };
  };

  return (
    <>
      <Card>
        <PatientListHeader onAddPatient={handleAddPatient} />
        <CardContent>
          <PatientSearch searchTerm={searchTerm} onSearch={handleSearch} />

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <PatientCard
                  key={patient.id}
                  patient={patient}
                  onEdit={handleEditPatient}
                  onDelete={handleDeleteConfirm}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-muted-foreground">
                Nenhum paciente encontrado
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Patient Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <PatientForm
          isEditing={!!selectedPatient}
          defaultValues={getCurrentPatient()}
          onSubmit={onSubmit}
          onCancel={() => setIsDialogOpen(false)}
        />
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DeleteConfirmDialog
          onDelete={handleDelete}
          onCancel={() => setDeleteConfirmOpen(false)}
        />
      </Dialog>
    </>
  );
};

export default PatientList;
