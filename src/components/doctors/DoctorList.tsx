
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, MoreVertical, Phone, Mail, Edit, Trash2 } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { Doctor } from "@/lib/types";
import { mapDoctorRowToDoctor } from "@/lib/supabaseTypes";

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
      return doctors.find(doctor => doctor.id === selectedDoctor);
    }
    return null;
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center">
          <CardTitle className="flex-1">Lista de Médicos</CardTitle>
          <Button onClick={handleAddDoctor}>
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Médico
          </Button>
        </CardHeader>
        <CardContent>
          <div className="relative mb-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar médicos..."
              className="pl-8"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          {isLoading ? (
            <div className="text-center py-8">
              Carregando médicos...
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map((doctor) => (
                  <Card key={doctor.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="bg-medappt-primary/10 p-4 flex justify-end">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEditDoctor(doctor.id)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDeleteConfirm(doctor.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Remover
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="p-4 pt-0 -mt-6">
                        <div className="flex flex-col items-center">
                          <Avatar className="h-16 w-16 border-4 border-background">
                            <AvatarImage src={doctor.avatar} alt={doctor.name} />
                            <AvatarFallback>{doctor.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <h3 className="mt-2 font-semibold text-lg">{doctor.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{doctor.specialty}</p>
                        </div>
                        <div className="space-y-2 mt-4">
                          <div className="flex items-center text-sm">
                            <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>{doctor.email}</span>
                          </div>
                          {doctor.phone && (
                            <div className="flex items-center text-sm">
                              <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                              <span>{doctor.phone}</span>
                            </div>
                          )}
                        </div>
                        <div className="mt-4">
                          <Button variant="outline" className="w-full">Ver agenda</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
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
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{selectedDoctor ? "Editar Médico" : "Adicionar Médico"}</DialogTitle>
            <DialogDescription>
              {selectedDoctor
                ? "Edite as informações do médico abaixo"
                : "Preencha os dados do novo médico"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveDoctor}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input 
                  id="name" 
                  name="name" 
                  defaultValue={getCurrentDoctor()?.name || ""} 
                  required 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="specialty">Especialidade</Label>
                <Input 
                  id="specialty" 
                  name="specialty" 
                  defaultValue={getCurrentDoctor()?.specialty || ""} 
                  required 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  defaultValue={getCurrentDoctor()?.email || ""} 
                  required 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input 
                  id="phone" 
                  name="phone" 
                  defaultValue={getCurrentDoctor()?.phone || ""} 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="bio">Bio</Label>
                <Input 
                  id="bio" 
                  name="bio" 
                  defaultValue={getCurrentDoctor()?.bio || ""} 
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir este médico? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirmOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DoctorList;
