
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Patient } from "@/lib/types";
import { supabase } from "@/integrations/supabase/client";
import { mapPatientRowToPatient } from "@/lib/supabaseTypes";

import PatientListHeader from "./PatientListHeader";
import PatientSearch from "./PatientSearch";
import PatientCard from "./PatientCard";
import PatientForm, { PatientFormData } from "./PatientForm";
import DeleteConfirmDialog from "./DeleteConfirmDialog";

const PatientList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch patients from Supabase
  const { data: patients = [], isLoading } = useQuery({
    queryKey: ["patients"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("patients")
        .select("*");
      
      if (error) {
        console.error("Error fetching patients:", error);
        toast({
          title: "Erro ao carregar pacientes",
          description: error.message,
          variant: "destructive",
        });
        return [];
      }
      
      return data.map(mapPatientRowToPatient);
    }
  });

  // Add patient mutation
  const addPatientMutation = useMutation({
    mutationFn: async (patient: PatientFormData) => {
      const { data, error } = await supabase
        .from("patients")
        .insert([{
          name: patient.name,
          email: patient.email,
          phone: patient.phone || null,
          cpf: patient.cpf || null,
          date_of_birth: patient.dateOfBirth || null,
          health_insurance: patient.healthInsurance || null,
        }])
        .select();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
      toast({
        title: "Paciente adicionado",
        description: "O novo paciente foi adicionado com sucesso",
      });
      setIsDialogOpen(false);
    },
    onError: (error) => {
      console.error("Error adding patient:", error);
      toast({
        title: "Erro ao adicionar paciente",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Update patient mutation
  const updatePatientMutation = useMutation({
    mutationFn: async ({ id, patient }: { id: string, patient: PatientFormData }) => {
      const { data, error } = await supabase
        .from("patients")
        .update({
          name: patient.name,
          email: patient.email,
          phone: patient.phone || null,
          cpf: patient.cpf || null,
          date_of_birth: patient.dateOfBirth || null,
          health_insurance: patient.healthInsurance || null,
        })
        .eq("id", id)
        .select();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
      toast({
        title: "Paciente atualizado",
        description: "As informações do paciente foram atualizadas com sucesso",
      });
      setIsDialogOpen(false);
    },
    onError: (error) => {
      console.error("Error updating patient:", error);
      toast({
        title: "Erro ao atualizar paciente",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Delete patient mutation
  const deletePatientMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("patients")
        .delete()
        .eq("id", id);

      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
      toast({
        title: "Paciente removido",
        description: "O paciente foi removido com sucesso",
      });
      setDeleteConfirmOpen(false);
    },
    onError: (error) => {
      console.error("Error deleting patient:", error);
      toast({
        title: "Erro ao remover paciente",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleAddPatient = () => {
    setSelectedPatient(null);
    setIsDialogOpen(true);
  };

  const handleEditPatient = (id: string) => {
    setSelectedPatient(id);
    setIsDialogOpen(true);
  };

  const handleDeleteConfirm = (id: string) => {
    setSelectedPatient(id);
    setDeleteConfirmOpen(true);
  };

  const handleDelete = () => {
    if (selectedPatient) {
      deletePatientMutation.mutate(selectedPatient);
    }
  };

  const onSubmit = (data: PatientFormData) => {
    if (selectedPatient) {
      // Update existing patient
      updatePatientMutation.mutate({ id: selectedPatient, patient: data });
    } else {
      // Add new patient
      addPatientMutation.mutate(data);
    }
  };

  // Filter patients based on search term
  const filteredPatients = patients.filter(
    (patient) =>
      searchTerm === "" ||
      patient.name.toLowerCase().includes(searchTerm) ||
      patient.email.toLowerCase().includes(searchTerm) ||
      (patient.healthInsurance && patient.healthInsurance.toLowerCase().includes(searchTerm))
  );

  // Find the selected patient for editing
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

          {isLoading ? (
            <div className="text-center py-8">
              Carregando pacientes...
            </div>
          ) : (
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
          )}
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
