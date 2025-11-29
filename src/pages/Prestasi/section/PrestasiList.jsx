import React from "react";
import MotionReveal from "@/components/common/MotionReveal";
import ReadMoreButton from "@/components/common/ReadMore";
import { stripHtml } from "@/utils/formatting";

const PrestasiList = ({ prestasi }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {prestasi.length > 0 ? (
        prestasi.map((item) => (
          <MotionReveal
            animation="fade-up"
            key={item.id}
            delay={0.07}              
          >
            <div className="bg-white rounded-xl shadow-card flex flex-col h-full overflow-hidden">
              <div className="h-40 w-full overflow-hidden relative">
                <img
                  src={item.bukti_url}
                  alt={item.nama}
                  className="w-full h-full object-cover"
                />

                <div className="absolute left-2 bottom-2 bg-primary-light text-primary-dark text-[10px] px-2 py-1 rounded">
                  {item.kategori?.name}
                </div>
              </div>

              <div className="p-4 flex flex-col flex-1">
                <h4 className="font-bold text-base line-clamp-2 mb-2">
                  {item.nama}
                </h4>

                <p className="text-xs text-gray-500">{item.tahun}</p>

                <p className="text-xs text-gray-600 line-clamp-3 my-2">
                  {stripHtml(item.deskripsi).substring(0, 120)}
                </p>

                <div className="mt-auto pt-2 flex">
                  <ReadMoreButton
                    to={`/prestasi/${item.id}`}
                    label="Selengkapnya"
                    newTab={false}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </MotionReveal>
        ))
      ) : (
        <div className="col-span-full text-center py-6 text-gray-500">
          Tidak ada prestasi ditemukan
        </div>
      )}
    </div>
  );
};

export default PrestasiList;
