
import React, { useState } from 'react';
import { Search, Star } from 'lucide-react';
import MobileLayout from '@/components/layout/MobileLayout';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { mapDoctorRowToDoctor } from '@/lib/supabaseTypes';
import { Skeleton } from '@/components/ui/skeleton';

const MobileDoctors: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeSpecialty, setActiveSpecialty] = useState<string>('all');
  
  // Fetch doctors from Supabase
  const { data: doctors = [], isLoading } = useQuery({
    queryKey: ["mobile-doctors"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("doctors")
        .select("*");
      
      if (error) {
        console.error("Error fetching doctors:", error);
        return [];
      }
      
      return data.map(mapDoctorRowToDoctor);
    }
  });
  
  // Get unique specialties
  const specialties = [...new Set(doctors.map(doctor => doctor.specialty))];
  
  // Filter doctors based on search term and specialty
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = searchTerm === '' || 
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesSpecialty = activeSpecialty === 'all' || doctor.specialty === activeSpecialty;
    
    return matchesSearch && matchesSpecialty;
  });
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleSpecialtyClick = (specialty: string) => {
    setActiveSpecialty(specialty === activeSpecialty ? 'all' : specialty);
  };

  return (
    <MobileLayout title="Médicos">
      <div className="p-4 space-y-4">
        {/* Barra de pesquisa */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Buscar médicos"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        {/* Filtros de especialidade */}
        <div className="flex gap-2 overflow-x-auto py-2 -mx-4 px-4 no-scrollbar">
          <Button 
            variant={activeSpecialty === 'all' ? "default" : "outline"} 
            size="sm" 
            className="flex-shrink-0 rounded-full"
            onClick={() => setActiveSpecialty('all')}
          >
            Todos
          </Button>
          
          {isLoading ? (
            Array(5).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-9 w-24 rounded-full flex-shrink-0" />
            ))
          ) : (
            specialties.map((specialty) => (
              <Button 
                key={specialty} 
                variant={activeSpecialty === specialty ? "default" : "outline"} 
                size="sm" 
                className="flex-shrink-0 rounded-full"
                onClick={() => handleSpecialtyClick(specialty)}
              >
                {specialty}
              </Button>
            ))
          )}
        </div>

        {/* Lista de médicos */}
        <div className="space-y-4">
          {isLoading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="flex bg-white p-4 rounded-lg shadow-sm border">
                <Skeleton className="h-16 w-16 rounded-full mr-4" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-3 w-1/4" />
                  <Skeleton className="h-3 w-full" />
                </div>
              </div>
            ))
          ) : filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <Link 
                key={doctor.id}
                to={`/mobile/doctors/${doctor.id}`}
                className="block bg-white p-4 rounded-lg shadow-sm border hover:border-medappt-primary"
              >
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    {doctor.avatar ? (
                      <img
                        className="h-16 w-16 rounded-full object-cover"
                        src={doctor.avatar}
                        alt={doctor.name}
                      />
                    ) : (
                      <div className="h-16 w-16 rounded-full bg-medappt-light flex items-center justify-center text-medappt-primary font-medium">
                        {doctor.name.substring(0, 2).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{doctor.name}</h4>
                    <p className="text-sm text-medappt-primary">{doctor.specialty}</p>
                    <div className="flex items-center mt-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <span className="text-xs ml-1 text-gray-500">(24 avaliações)</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {doctor.bio || "Este médico ainda não possui uma biografia."}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Nenhum médico encontrado
            </div>
          )}
        </div>
      </div>
    </MobileLayout>
  );
};

export default MobileDoctors;
