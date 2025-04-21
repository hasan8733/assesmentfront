"use client";

import React, { useState } from "react";
import Modal from "@/Components/Modal/Modal";

const page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const handleOpen = (title) => {
    setSelectedNote(title);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedNote(null);
  };
  return (
    <div className="w-screen h-screen flex flex-col overflow-x-hidden">
      <div className="w-full bg-white border-b border-b-blue-600 shadow-2xl px-10 py-6">
        <h1 className="text-3xl text-black font-semibold">MY NOTES</h1>
      </div>

      <div className="relative grid grid-cols-5 gap-6 px-10 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 py-10">
        {Array.from({ length: 32 }).map((_, index) => {
          const title = `Note ${index + 1}`;
          return (
            <div
              key={`notes${index}`}
              onClick={() => handleOpen(title)}
              className="rounded-3xl border border-blue-600 p-4 flex flex-col cursor-pointer hover:bg-blue-50 transition"
            >
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-semibold text-black">{title}</h2>
                <div className="flex items-center justify-between">
                  <p className="text-base font-medium text-gray-500">30/23</p>
                  <p className="text-base font-medium text-gray-500">
                    Created By: John Doe
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {isOpen && selectedNote && (
        <Modal title={selectedNote} onClose={handleClose} />
      )}
    </div>
  );
};

export default page;
