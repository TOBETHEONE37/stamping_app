import { useEffect, useState } from "react";

interface StampTourSelectProps {
  storeId: number | null;
  selectedTourId: number | null;
  setSelectedTourId: (id: number) => void;
}

const StampTourSelect = ({ storeId, selectedTourId, setSelectedTourId }: StampTourSelectProps) => {
  const [tourList, setTourList] = useState<{ id: number; name: string }[]>([]);

  // ⚠️ 나중에 API 연동할 부분 – 지금은 mock 데이터
  useEffect(() => {
    if (!storeId) return;

    // TODO: 실제 API 요청으로 대체 예정
    setTourList([
      { id: 1, name: "성심당 시내점 스탬프 투어" },
      { id: 2, name: "전국 빵투어 시즌2" },
      { id: 3, name: "대전 지역 빵로드" },
    ]);
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
          <option key={tour.id} value={tour.id}>
            {tour.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StampTourSelect;