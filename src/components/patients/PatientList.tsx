
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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Esquema de validação para o formulário de paciente
const patientFormSchema = z.object({
  name: z.string().min(3, { message: "Nome deve ter pelo menos 3 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  phone: z.string().optional(),
  cpf: z.string()
    .min(11, { message: "CPF deve ter 11 dígitos" })
    .max(14, { message: "CPF inválido" })
    .refine((cpf) => {
      // Remove caracteres não numéricos
      const numbers = cpf.replace(/[^\d]/g, '');
      // Verifica se tem 11 dígitos
      return numbers.length === 11;
    }, { message: "CPF inválido" }),
  dateOfBirth: z.string().optional(),
  healthInsurance: z.string().optional(),
});

type PatientFormData = z.infer<typeof patientFormSchema>;

const PatientList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>(patients);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const { toast } = useToast();

  // Inicializa o formulário
  const form = useForm<PatientFormData>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      cpf: "",
      dateOfBirth: "",
      healthInsurance: "",
    }
  });

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
    form.reset({
      name: "",
      email: "",
      phone: "",
      cpf: "",
      dateOfBirth: "",
      healthInsurance: "",
    });
    setIsDialogOpen(true);
  };

  const handleEditPatient = (id: string) => {
    setSelectedPatient(id);
    const patient = patients.find(p => p.id === id);
    if (patient) {
      form.reset({
        name: patient.name || "",
        email: patient.email || "",
        phone: patient.phone || "",
        cpf: patient.cpf || "",
        dateOfBirth: patient.dateOfBirth || "",
        healthInsurance: patient.healthInsurance || "",
      });
    }
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
    // Formata o CPF para exibição (xxx.xxx.xxx-xx)
    const formattedCpf = data.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    
    setIsDialogOpen(false);
    
    toast({
      title: selectedPatient ? "Paciente atualizado" : "Paciente adicionado",
      description: selectedPatient
        ? "As informações do paciente foram atualizadas com sucesso"
        : "O novo paciente foi adicionado com sucesso",
    });
  };

  // Função para formatar CPF automaticamente
  const formatCPF = (value: string) => {
    // Remove caracteres não numéricos
    const numbers = value.replace(/\D/g, '');
    // Limita a 11 dígitos
    const cpf = numbers.slice(0, 11);
    
    // Adiciona pontuação conforme digita
    if (cpf.length <= 3) {
      return cpf;
    } else if (cpf.length <= 6) {
      return `${cpf.slice(0, 3)}.${cpf.slice(3)}`;
    } else if (cpf.length <= 9) {
      return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6)}`;
    } else {
      return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9)}`;
    }
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
                          {patient.cpf && (
                            <p className="text-xs text-muted-foreground">
                              CPF: {patient.cpf}
                            </p>
                          )}
                          {patient.healthInsurance && (
                            <p className="text-xs text-muted-foreground">
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome completo</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CPF</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder="000.000.000-00"
                        onChange={(e) => {
                          const formattedValue = formatCPF(e.target.value);
                          field.onChange(formattedValue);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data de nascimento</FormLabel>
                    <FormControl>
                      <Input {...field} type="date" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="healthInsurance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Plano de saúde</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">Salvar</Button>
              </DialogFooter>
            </form>
          </Form>
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
