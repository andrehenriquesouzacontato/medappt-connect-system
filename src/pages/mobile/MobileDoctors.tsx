
import React from 'react';
import { Search, Star } from 'lucide-react';
import MobileLayout from '@/components/layout/MobileLayout';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { doctors } from '@/lib/mockData';

const MobileDoctors: React.FC = () => {
  return (
    <MobileLayout title="Médicos">
      <div className="p-4 space-y-4">
        {/* Barra de pesquisa */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Buscar médicos"
          />
        </div>

        {/* Filtros de especialidade */}
        <div className="flex gap-2 overflow-x-auto py-2 -mx-4 px-4 no-scrollbar">
          <Button variant="outline" size="sm" className="flex-shrink-0 rounded-full border-medappt-primary text-medappt-primary">
            Todos
          </Button>
          <Button variant="outline" size="sm" className="flex-shrink-0 rounded-full">
            Cardiologia
          </Button>
          <Button variant="outline" size="sm" className="flex-shrink-0 rounded-full">
            Dermatologia
          </Button>
          <Button variant="outline" size="sm" className="flex-shrink-0 rounded-full">
            Ortopedia
          </Button>
          <Button variant="outline" size="sm" className="flex-shrink-0 rounded-full">
            Oftalmologia
          </Button>
          <Button variant="outline" size="sm" className="flex-shrink-0 rounded-full">
            Pediatria
          </Button>
        </div>

        {/* Lista de médicos */}
        <div className="space-y-4">
          {doctors.map((doctor) => (
            <Link 
              key={doctor.id}
              to={`/mobile/doctors/${doctor.id}`}
              className="block bg-white p-4 rounded-lg shadow-sm border hover:border-medappt-primary"
            >
              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  <img
                    className="h-16 w-16 rounded-full"
                    src={doctor.avatar}
                    alt={doctor.name}
                  />
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
                    {doctor.bio}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
};

export default MobileDoctors;
