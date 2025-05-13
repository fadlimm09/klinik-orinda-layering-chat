import axios from "axios";
import { useQuery } from "@tanstack/react-query";

// Untuk user biasa yang mengobrol dengan dokter
export const useGetMessage = (name: string, doctor: string) => {
  return useQuery({
    queryKey: ["messages", name, doctor],
    queryFn: async () => {
      const response = await axios.post(`/api/roomchat`, { name, doctor });
      return response.data;
    },
    refetchInterval: 1000, // refetch tiap 1 detik
  });
};

// Untuk dokter yang melihat semua pesan
export const useGetDoctorMessages = (doctor: string) => {
  return useQuery({
    queryKey: ["messages", doctor],
    queryFn: async () => {
      const response = await axios.get(`/api/roomchat/${doctor}`);
      return response.data;
    },
    refetchInterval: 1000, // refetch tiap 1 detik
  });
};
