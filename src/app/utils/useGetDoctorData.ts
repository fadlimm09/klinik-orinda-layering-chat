import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetDoctorData = (doctor) => {
  return useQuery({
    queryKey: ["doctorData", doctor],
    queryFn: async () => {
      const response = await axios.post(`/api/doctordata/`, { doctor });
      console.log("Doctor data response:", response);
      return response.data;
    },
  });
};

