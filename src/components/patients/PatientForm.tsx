
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

export type PatientFormData = z.infer<typeof patientFormSchema>;

interface PatientFormProps {
  isEditing: boolean;
  defaultValues: PatientFormData;
  onSubmit: (data: PatientFormData) => void;
  onCancel: () => void;
}

const PatientForm = ({ isEditing, defaultValues, onSubmit, onCancel }: PatientFormProps) => {
  // Inicializa o formulário
  const form = useForm<PatientFormData>({
    resolver: zodResolver(patientFormSchema),
    defaultValues
  });

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

  const handleFormSubmit = form.handleSubmit(onSubmit);

  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>{isEditing ? "Editar Paciente" : "Adicionar Paciente"}</DialogTitle>
        <DialogDescription>
          {isEditing
            ? "Edite as informações do paciente abaixo"
            : "Preencha os dados do novo paciente"}
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={handleFormSubmit} className="space-y-4">
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
            <Button variant="outline" type="button" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default PatientForm;
