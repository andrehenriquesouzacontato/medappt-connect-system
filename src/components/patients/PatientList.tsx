
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { patients } from "@/lib/mockData";
import { Patient } from "@/lib/types";
import { Calendar, Edit, Mail, MoreVertical, Phone, Plus, Search, Trash2, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";

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

  const handleSavePatient = () => {
    setIsDialogOpen(false);
    
    toast({
      title: selectedPatient ? "Paciente atualizado" : "Paciente adicionado",
      description: selectedPatient
        ? "As informações do paciente foram atualizadas com sucesso"
        : "O novo paciente foi adicionado com sucesso",
    });
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center">
          <CardTitle className="flex-1">Lista de Pacientes</CardTitle>
          <Button onClick={handleAddPatient}>
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Paciente
          </Button>
        </CardHeader>
        <CardContent>
          <div className="relative mb-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar pacientes..."
              className="pl-8"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <Card key={patient.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={patient.avatar} alt={patient.name} />
                          <AvatarFallback>{patient.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{patient.name}</h3>
                          {patient.healthInsurance && (
                            <p className="text-sm text-muted-foreground">
                              {patient.healthInsurance}
                            </p>
                          )}
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditPatient(patient.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDeleteConfirm(patient.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Remover
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center text-sm">
                        <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{patient.email}</span>
                      </div>
                      {patient.phone && (
                        <div className="flex items-center text-sm">
                          <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{patient.phone}</span>
                        </div>
                      )}
                      {patient.dateOfBirth && (
                        <div className="flex items-center text-sm">
                          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>Nascimento: {patient.dateOfBirth}</span>
                        </div>
                      )}
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button variant="outline" className="flex-1" size="sm">
                        <User className="mr-2 h-4 w-4" />
                        Prontuário
                      </Button>
                      <Button className="flex-1" size="sm">
                        <Calendar className="mr-2 h-4 w-4" />
                        Agendar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
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
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{selectedPatient ? "Editar Paciente" : "Adicionar Paciente"}</DialogTitle>
            <DialogDescription>
              {selectedPatient
                ? "Edite as informações do paciente abaixo"
                : "Preencha os dados do novo paciente"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome completo</Label>
              <Input id="name" defaultValue={selectedPatient ? patients.find(p => p.id === selectedPatient)?.name : ""} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue={selectedPatient ? patients.find(p => p.id === selectedPatient)?.email : ""} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input id="phone" defaultValue={selectedPatient ? patients.find(p => p.id === selectedPatient)?.phone : ""} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dateOfBirth">Data de nascimento</Label>
              <Input id="dateOfBirth" type="date" defaultValue={selectedPatient ? patients.find(p => p.id === selectedPatient)?.dateOfBirth : ""} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="healthInsurance">Plano de saúde</Label>
              <Input id="healthInsurance" defaultValue={selectedPatient ? patients.find(p => p.id === selectedPatient)?.healthInsurance : ""} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSavePatient}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir este paciente? Esta ação não pode ser desfeita.
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

export default PatientList;
