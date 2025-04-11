
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Doctor } from "@/lib/types";
import { mapDoctorRowToDoctor } from "@/lib/supabaseTypes";
import DoctorSearch from "./DoctorSearch";
import DoctorCard from "./DoctorCard";
import DoctorForm from "./DoctorForm";
import DeleteDoctorDialog from "./DeleteDoctorDialog";
import DoctorListHeader from "./DoctorListHeader";

const DoctorList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch doctors from Supabase
  const { data: doctors = [], isLoading } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("doctors")
        .select("*");
      
      if (error) {
        console.error("Error fetching doctors:", error);
        toast({
          title: "Erro ao carregar médicos",
          description: error.message,
          variant: "destructive",
        });
        return [];
      }
      
      return data.map(mapDoctorRowToDoctor);
    }
  });

  // Add doctor mutation
  const addDoctorMutation = useMutation({
    mutationFn: async (doctor: Partial<Doctor>) => {
      const { data, error } = await supabase
        .from("doctors")
        .insert([{
          name: doctor.name,
          email: doctor.email,
          phone: doctor.phone || null,
          specialty: doctor.specialty || "",
          bio: doctor.bio || null,
        }])
        .select();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      toast({
        title: "Médico adicionado",
        description: "O novo médico foi adicionado com sucesso",
      });
      setIsDialogOpen(false);
    },
    onError: (error) => {
      console.error("Error adding doctor:", error);
      toast({
        title: "Erro ao adicionar médico",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Update doctor mutation
  const updateDoctorMutation = useMutation({
    mutationFn: async ({ id, doctor }: { id: string, doctor: Partial<Doctor> }) => {
      const { data, error } = await supabase
        .from("doctors")
        .update({
          name: doctor.name,
          email: doctor.email,
          phone: doctor.phone || null,
          specialty: doctor.specialty || "",
          bio: doctor.bio || null,
        })
        .eq("id", id)
        .select();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      toast({
        title: "Médico atualizado",
        description: "As informações do médico foram atualizadas com sucesso",
      });
      setIsDialogOpen(false);
    },
    onError: (error) => {
      console.error("Error updating doctor:", error);
      toast({
        title: "Erro ao atualizar médico",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Delete doctor mutation
  const deleteDoctorMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("doctors")
        .delete()
        .eq("id", id);

      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      toast({
        title: "Médico removido",
        description: "O médico foi removido com sucesso",
      });
      setDeleteConfirmOpen(false);
    },
    onError: (error) => {
      console.error("Error deleting doctor:", error);
      toast({
        title: "Erro ao remover médico",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleAddDoctor = () => {
    setSelectedDoctor(null);
    setIsDialogOpen(true);
  };

  const handleEditDoctor = (id: string) => {
    setSelectedDoctor(id);
    setIsDialogOpen(true);
  };

  const handleDeleteConfirm = (id: string) => {
    setSelectedDoctor(id);
    setDeleteConfirmOpen(true);
  };

  const handleDelete = () => {
    if (selectedDoctor) {
      deleteDoctorMutation.mutate(selectedDoctor);
    }
  };

  const handleSaveDoctor = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const doctorData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      specialty: formData.get("specialty") as string,
      bio: formData.get("bio") as string,
    };

    if (selectedDoctor) {
      // Update existing doctor
      updateDoctorMutation.mutate({ id: selectedDoctor, doctor: doctorData });
    } else {
      // Add new doctor
      addDoctorMutation.mutate(doctorData);
    }
  };

  // Filter doctors based on search term
  const filteredDoctors = doctors.filter(
    (doctor) =>
      searchTerm === "" ||
      doctor.name.toLowerCase().includes(searchTerm) ||
      doctor.specialty.toLowerCase().includes(searchTerm) ||
      doctor.email.toLowerCase().includes(searchTerm)
  );

  // Find the selected doctor for editing
  const getCurrentDoctor = () => {
    if (selectedDoctor) {
      return doctors.find(doctor => doctor.id === selectedDoctor) || null;
    }
    return null;
  };

  return (
    <>
      <Card>
        <CardHeader>
          <DoctorListHeader onAdd={handleAddDoctor} />
        </CardHeader>
        <CardContent>
          <DoctorSearch searchTerm={searchTerm} onSearch={handleSearch} />

          {isLoading ? (
            <div className="text-center py-8">
              Carregando médicos...
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map((doctor) => (
                  <DoctorCard 
                    key={doctor.id}
                    doctor={doctor}
                    onEdit={handleEditDoctor}
                    onDelete={handleDeleteConfirm}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-8 text-muted-foreground">
                  Nenhum médico encontrado
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Doctor Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DoctorForm 
          doctor={getCurrentDoctor()} 
          onSave={handleSaveDoctor}
          onCancel={() => setIsDialogOpen(false)}
        />
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DeleteDoctorDialog 
          onDelete={handleDelete}
          onCancel={() => setDeleteConfirmOpen(false)}
        />
      </Dialog>
    </>
  );
};

export default DoctorList;
