import apiClient from "@/api/client";
import { useEffect, useState } from "react";

interface StampTourSelectProps {
  storeId: number | null;
  selectedTourId: number | null;
  setSelectedTourId: (id: number) => void;
}

interface TourDto {
  stampRallyId: number;
  name: string;
}

const StampTourSelect = ({ storeId, selectedTourId, setSelectedTourId }: StampTourSelectProps) => {
  const [tourList, setTourList] = useState<TourDto[]>([]);

  useEffect(() => {
    if (!storeId) return;

    const fetchTours = async () => {
      try {
        const res = await apiClient.get<TourDto[]>("/api/stamp/rally/byStoreId", {
          params: { storeId },
        });
        setTourList(res.data);
      } catch (error) {
        console.error("투어 목록 불러오기 실패:", error);
      }
    }

    fetchTours();
  }, [storeId]);

  return (
    <div className="select-row">
      <select
        id="tour-select"
        value={selectedTourId ?? ""}
        onChange={(e) => setSelectedTourId(Number(e.target.value))}
      >
        <option value="" disabled>
          투어를 선택하세요
        </option>
        {tourList.map((tour) => (
          <option key={tour.stampRallyId} value={tour.stampRallyId}>
            {tour.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StampTourSelect;