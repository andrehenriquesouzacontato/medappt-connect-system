
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Doctor } from "@/lib/types";
import { mapDoctorRowToDoctor } from "@/lib/supabaseTypes";
import { useToast } from "@/hooks/use-toast";

/**
 * Hook for fetching doctors, optionally filtered by specialty
 * @param specialty Optional specialty ID to filter doctors by
 * @returns Object containing doctors, loading state, and error state
 */
export function useDoctors(specialty?: string) {
  const { toast } = useToast();

  const { data: allDoctors = [], isLoading, error } = useQuery({
    queryKey: ["doctors", { specialty }],
    queryFn: async () => {
      try {
        let query = supabase.from("doctors").select("*");
        
        // Only filter by specialty if one is provided
        if (specialty) {
          query = query.eq("specialty", specialty);
        }
        
        const { data, error: supabaseError } = await query;
        
        if (supabaseError) {
          throw new Error(supabaseError.message);
        }
        
        return data.map(mapDoctorRowToDoctor);
      } catch (err) {
        console.error("Error fetching doctors:", err);
        toast({
          title: "Erro ao carregar médicos",
          description: err instanceof Error ? err.message : "Ocorreu um erro ao carregar os médicos",
          variant: "destructive",
        });
        throw err;
      }
    },
  });

  // Filter doctors by specialty if provided
  const doctors = specialty 
    ? allDoctors.filter(doctor => doctor.specialty === specialty)
    : allDoctors;

  return {
    doctors,
    allDoctors,
    isLoading,
    error,
    isError: !!error
  };
}
