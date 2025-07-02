"use client";

import React, { useRef } from "react";
import { TbCloudUpload } from "react-icons/tb";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { useUploadProfilePhoto } from "../_hooks/upload-profile-photo";

export default function ProfilePhoto({
  onFileSelected,
  imageProfile,
}: {
  onFileSelected?: () => void;
  imageProfile: string;
}) {

  // Variables
  const inputRef = useRef<HTMLInputElement>(null);

  // Mutation
  const { isPending, error, uploadPhoto } = useUploadProfilePhoto();

  // Functions
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await uploadPhoto(file);
      onFileSelected?.();
    }
  };

  return (
    <FormItem className="flex flex-col space-y-1.5 items-center">
      <FormLabel> </FormLabel>

      <div className="relative">
        {/* Profile image */}
        <Image
          src={imageProfile}
          className="rounded-full object-contain border-4 w-[150px] h-[150px] border-gray-300 shadow-md"
          width={150}
          height={150}
          alt="Profile"
        />
        
        {/* Upload icon button */}
        <div
          onClick={() => inputRef.current?.click()}
          className={`cursor-pointer hover:bg-pink-600 p-2 rounded-full absolute bottom-3 right-3 transform translate-x-1/2 translate-y-1/2  ${isPending ? "bg-gray-500" : "bg-pink-900  border-2 border-white"}`}
        >
          {isPending ? (
            <Loader2 className="animate-spin text-white" size={24} />
          ) : (
            <TbCloudUpload className="text-white  " size={24} />
          )}
        </div>
      </div>

      {/* Hidden file input */}
      <FormControl>
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </FormControl>

      {/* Error message */}
      {error && <FormMessage>{error.message}</FormMessage>}
    </FormItem>
  );
}
