import React from "react";

const BestFoodOptions = () => {
  const foodItems = [
    {
      name: "Pizza",
      image: "https://imgs.search.brave.com/ipX3MqW17Z6SC8vZ0810L2u7K9PV93eAdA0rEMiywUU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/c2VyaW91c2VhdHMu/Y29tL3RobWIvaGlj/NXgzQUpBODNZc3dV/WFl4VmFjQXY3bkZj/PS8zNzV4MjUwL2Zp/bHRlcnM6bm9fdXBz/Y2FsZSgpOm1heF9i/eXRlcygxNTAwMDAp/OnN0cmlwX2ljYygp/L19fb3B0X19hYm91/dGNvbV9fY29ldXNf/X3Jlc291cmNlc19f/Y29udGVudF9taWdy/YXRpb25fX3Nlcmlv/dXNfZWF0c19fc2Vy/aW91c2VhdHMuY29t/X19yZWNpcGVzX19p/bWFnZXNfXzIwMTNf/XzA5X18yMDEzMDkw/OS1yYW1lbi1oYWNr/cy1waXp6YS0wMC02/MTBweC04YTBiMmEz/ZTRjM2M0M2JhOThm/ZDllZGZlNmE4Njli/Mi5qcGc",
    },
    {
      name: "Burger",
      image: "https://imgs.search.brave.com/yZ-tLAAh_akJCYWEam_EFHtIXluW53FGX9V40p-qBBA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNDcx/NDU2MDYxL3Bob3Rv/L2hhbWJ1cmdlci5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/SjJEV2R4TU51M1A5/NkJEQ2J1TWRJM0R1/TG8zMjRzNEJBaVZD/dXExUDQzZz0",
    },
    {
      name: "Dosa",
      image:"https://imgs.search.brave.com/bBUnTT4ry_NgzlPUgQiq4YhSBdqpycnRnXg1cqoU1uM/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMwMS5ueXQuY29t/L2ltYWdlcy8yMDE1/LzAxLzI4L2Rpbmlu/Zy8yOEtJVENIRU4x/LzI4S0lUQ0hFTjEt/anVtYm8uanBn",   
    },
    {
      name: "Ice Cream",
      image: "https://imgs.search.brave.com/t8ww_3e7qnYaZlQ-geg0iaryzI-EVE7CJPRUB8tNYZo/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9hbWFu/ZGFzY29va2luLmNv/bS93cC1jb250ZW50/L3VwbG9hZHMvMjAy/My8wNy9XaGl0ZS1D/aG9jb2xhdGUtSWNl/LUNyZWFtLVUtVjAz/LTExMDB4MTY0OC5q/cGc",
    },
    {
      name: "Vada Pav",
      image: "https://imgs.search.brave.com/xiTJqye8hL5qMUdCwDNXIrKPjDrcQQsRKSmCr6l-9zU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Y29va2luZ2FuZG1l/LmNvbS93cC1jb250/ZW50L3VwbG9hZHMv/MjAyMC8wNC8xNDIz/MjQ0OTk0M18zYmMz/MDNjN2Q5X3oud2Vi/cA",
    },
    {
      name: "Shawarma",
      image: "https://imgs.search.brave.com/Zrn6vyeXYaJn42t3FTqDxS07TyOQOHG2k4b_zonDSgY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1LzczLzE4LzQx/LzM2MF9GXzU3MzE4/NDExMl9UZ0JXV3ha/QUdOQ2tJVE1iRmc3/U3phRmxESGg1STZO/Wi5qcGc",
    },
    {
      name: "Samosa",
      image: "https://imgs.search.brave.com/gAI1U7dpaOO1ryx1U_2epxsXW91pKSeWj8yEb1Fi3Tk/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA4Lzg2Lzc3LzEz/LzM2MF9GXzg4Njc3/MTM0Nl9EeTRuQ0t1/a2NpS0E5cEFsZkIx/aDU1V3B3TWtnc3Nr/cS5qcGc",
    },
    {
      name: "Pav Bhaji",
      image: "https://imgs.search.brave.com/rCVZ8408QkTRUS1AK23KrmiI3BKoeroCKhd8qXmshxk/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Y29va3dpdGhtYW5h/bGkuY29tL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDE4LzA1L0Jl/c3QtUGF2LUJoYWpp/LVJlY2lwZS0xMjAw/eDE4MTguanBn",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-4">
      <div className="max-w-full mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Our Best Food Options
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
          {foodItems.map((food, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 w-48 h-40"
            >
              <div className="relative h-32">
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-300 hover:bg-opacity-0" />
              </div>
              <div className="p-0">
                <h2 className="text-xl font-semibold text-gray-800 text-center">
                  {food.name}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestFoodOptions;