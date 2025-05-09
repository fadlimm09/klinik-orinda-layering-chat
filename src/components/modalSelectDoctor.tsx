// components/Modal.tsx
import { useModalStore } from "@/app/store/useModalDoctorStore";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "./ui/button";

export default function Modal() {
  const { isOpen, closeModal } = useModalStore();

  const dataDoctor = [
    { id: 1, name: "Dr. John Doe", specialty: "Cardiologist" },
    { id: 2, name: "Dr. Jane Smith", specialty: "Neurologist" },
    { id: 3, name: "Dr. Emily Davis", specialty: "Pediatrician" },
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
            <>
              <div key={doctor.id} className="p-4 bg-white rounded-lg shadow-md">
                <div className="flex items-center space-x-4 w-full">
                  <img src={`/images/doctors/${doctor.id}.jpg`} alt={doctor.name} className="w-16 h-16 rounded-full border-2 border-blue-500 shadow-lg" />
                  <div className="flex">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{doctor.name}</h3>
                      <p className="text-sm text-gray-500 italic">{doctor.specialty}</p>
                      <p className="text-xs text-gray-400 mt-1">⭐ 4.9 | 100+ consultations</p>
                    </div>
                    <div className="flex flex-col flex-end items-end justify-center ml-auto">
                      <Button
                        onClick={() => {
                          // Handle doctor selection
                          console.log(`Selected doctor: ${doctor.name}`);
                          closeModal();
                        }}
                        className="btn-primary mt-2"
                      >
                        Start Chat
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
