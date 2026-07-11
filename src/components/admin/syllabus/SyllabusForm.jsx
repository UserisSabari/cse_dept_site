"use client";

import React from "react";
import SubmitButton from "@/components/admin/SubmitButton";
import Input from "@/components/admin/Input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadButton } from "@/components/uploadthing";
import { useMutation } from "@tanstack/react-query";
import { createSyllabus } from "@/actions/syllabus.action";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const PROGRAMMES = ["BTech", "MTech", "PhD"];
const SEMESTERS = ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"];

const syllabusFormSchema = z.object({
  course: z.string().min(1, { message: "Course is required" }),
  programme: z.enum(["BTech", "MTech", "PhD"], {
    required_error: "Programme is required",
  }),
  sem: z.enum(["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"], {
    required_error: "Semester is required",
  }),
  yearOfScheme: z
    .string()
    .refine((val) => /^\d+$/.test(val), {
      message: "Year of Scheme must be an integer",
    })
    .refine((val) => val.length === 4, {
      message: "Year of Scheme must be a 4-digit year",
    }),
  pdfUrl: z.string().min(1, { message: "PDF is required" }),
});

const SyllabusForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(syllabusFormSchema),
    defaultValues: {
      pdfUrl: "",
      programme: "",
      sem: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data) => {
      await createSyllabus(data);
    },
    onSuccess: () => {
      router.refresh();
      reset();
      toast({ description: "Syllabus saved successfully" });
    },
    onError: (error) => {
      toast({ description: `Cannot create: ${error.message}` });
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  const pdfUrl = watch("pdfUrl");

  return (
    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Course (ObjectId or name)"
        type="text"
        placeholder="eg. Computer Science"
        name="course"
        {...register("course")}
        error={errors?.course}
      />

      {/* Programme select */}
      <div className="space-y-2">
        <h3 className="font-medium capitalize text-2xl">Programme</h3>
        <select
          {...register("programme")}
          className="w-full border border-gray-300 rounded px-3 py-2 text-black"
        >
          <option value="">Select programme…</option>
          {PROGRAMMES.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        {errors?.programme && (
          <p className="text-red-500">{errors.programme.message}</p>
        )}
      </div>

      {/* Semester select */}
      <div className="space-y-2">
        <h3 className="font-medium capitalize text-2xl">Semester</h3>
        <select
          {...register("sem")}
          className="w-full border border-gray-300 rounded px-3 py-2 text-black"
        >
          <option value="">Select semester…</option>
          {SEMESTERS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {errors?.sem && (
          <p className="text-red-500">{errors.sem.message}</p>
        )}
      </div>

      <Input
        label="Year of Scheme"
        type="text"
        placeholder="eg. 2024"
        name="yearOfScheme"
        {...register("yearOfScheme")}
        error={errors?.yearOfScheme}
      />

      <div className="space-y-2">
        <h3 className="font-medium capitalize text-2xl">PDF Upload</h3>
        {pdfUrl === "" ? (
          <>
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                setValue("pdfUrl", res[0].url);
              }}
              onUploadError={(error) => {
                alert(`Upload error: ${error.message}`);
              }}
            />
            {errors?.pdfUrl && (
              <p className="text-red-500">{errors.pdfUrl.message}</p>
            )}
          </>
        ) : (
          <div className="flex items-center gap-4">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700"
            >
              View uploaded PDF
            </a>
            <button
              type="button"
              onClick={() => setValue("pdfUrl", "")}
              className="text-sm text-red-400 underline"
            >
              Remove
            </button>
          </div>
        )}
      </div>

      <SubmitButton disabled={mutation.isPending} label="Save Syllabus" type="submit" />
    </form>
  );
};

export default SyllabusForm;

