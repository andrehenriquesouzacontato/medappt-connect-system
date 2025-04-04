
import { useState } from "react";
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
import { doctors } from "@/lib/mockData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const DoctorList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (term === "") {
      setFilteredDoctors(doctors);
    } else {
      const filtered = doctors.filter(
        (doctor) =>
          doctor.name.toLowerCase().includes(term) ||
          doctor.specialty.toLowerCase().includes(term) ||
          doctor.email.toLowerCase().includes(term)
      );
      setFilteredDoctors(filtered);
    }
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
      const newDoctors = filteredDoctors.filter((doctor) => doctor.id !== selectedDoctor);
      setFilteredDoctors(newDoctors);
      
      toast({
        title: "Médico removido",
        description: "O médico foi removido com sucesso",
      });
      
      setDeleteConfirmOpen(false);
    }
  };

  const handleSaveDoctor = () => {
    setIsDialogOpen(false);
    
    toast({
      title: selectedDoctor ? "Médico atualizado" : "Médico adicionado",
      description: selectedDoctor
        ? "As informações do médico foram atualizadas com sucesso"
        : "O novo médico foi adicionado com sucesso",
    });
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
                          <AvatarFallback>{doctor.name.substring(0, 2)}</AvatarFallback>
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
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome completo</Label>
              <Input id="name" defaultValue={selectedDoctor ? doctors.find(d => d.id === selectedDoctor)?.name : ""} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="specialty">Especialidade</Label>
              <Input id="specialty" defaultValue={selectedDoctor ? doctors.find(d => d.id === selectedDoctor)?.specialty : ""} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue={selectedDoctor ? doctors.find(d => d.id === selectedDoctor)?.email : ""} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input id="phone" defaultValue={selectedDoctor ? doctors.find(d => d.id === selectedDoctor)?.phone : ""} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bio">Bio</Label>
              <Input id="bio" defaultValue={selectedDoctor ? doctors.find(d => d.id === selectedDoctor)?.bio : ""} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveDoctor}>Salvar</Button>
          </DialogFooter>
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
