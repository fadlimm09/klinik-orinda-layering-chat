// components/Modal.tsx
import { useModalStore } from "@/app/store/useModalDoctorStore";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import dokterAgah from "../../public/dokterAgah.svg";
import dokterDesy from "../../public/dokterDesy.svg";
import dokterOno from "../../public/dokterOno.svg";
import Image from "next/image";

export default function Modal() {
  const { isOpen, closeModal, setDoctor } = useModalStore();

  const dataDoctor = [
    { id: 1, name: "dr. H. Agah Nugraha, M.k.M", specialty: "Dokter Umum", image: dokterAgah },
    { id: 2, name: "dr. Hj. Dessy Susanti, M.K.M", specialty: "Dokter Umum", image: dokterDesy },
    { id: 3, name: "drg. Ono Sumarno", specialty: "Dokter Gigi", image: dokterOno },
  ];

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="max-w-md bg-amber-50" onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Select a Doctor</DialogTitle>
          <DialogDescription>Please choose a doctor to start the conversation:</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {dataDoctor.map((doctor) => (
            <div
              key={doctor.id}
              onClick={() => {
                // Handle doctor selection
                console.log(`Selected doctor: ${doctor.name}`);
                setDoctor(doctor.name);
                closeModal();
              }}
              className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 borderborder-green-200"
            >
              <div className="flex items-center space-x-4 w-full">
                <Image src={doctor.image} alt={doctor.name} className="w-16 h-16 rounded-full border-2 border-green-300 " />
                <div className="flex">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{doctor.name}</h3>
                    <p className="text-sm text-gray-500 italic">{doctor.specialty}</p>
                    <p className="text-xs text-gray-400 mt-1">⭐ 4.9 | 100+ Pasien</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
