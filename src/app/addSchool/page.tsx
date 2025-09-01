"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import FileUpload from "../../ui/FileUpload";
import { BiSolidSchool } from "react-icons/bi";
import {
  MdLocalPhone,
  MdOutlineLocationOn,
  MdOutlineMail,
} from "react-icons/md";
import { LuMap } from "react-icons/lu";
import { BsPinMap } from "react-icons/bs";
import Link from "next/link";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.email("Invalid email address"),
  address: z.string().min(2, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  contact: z
    .string()
    .min(10, "Contact is required")
    .max(15, "Contact too long"),
  image: z.any().refine((file) => file instanceof File, "Image is required"),
});

export default function Home() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  interface FileUploadHandler {
    (file: File | null): void;
  }

  const handleFileUpload: FileUploadHandler = (file) => {
    setImageFile(file);
    setValue("image", file, { shouldValidate: true });
  };
  const handleFileRemove = () => {
    setImageFile(null);
    setValue("image", undefined);
  };

  const onSubmit = async (data: z.infer<typeof schema>) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("address", data.address);
    formData.append("city", data.city);
    formData.append("state", data.state);
    formData.append("contact", data.contact);
    formData.append("image", data.image);
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/addSchool", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        reset();
        setImageFile(null);
        toast.success("School added successfully!");
      } else {
        toast.error("Failed to add school.");
      }
    } catch {
      toast.error("Error submitting form.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex lg:flex-row flex-col items-center justify-end bg-gradient-to-br from-[var(--primary)]/5 to-[var(--secondary)]/20 p-4 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="lg:w-[40%] w-full md:h-full h-[20rem] gap-5 flex flex-col lg:items-start items-center justify-center"
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.h1
          className="text-5xl lg:text-7xl pl-0 md:pl-8 font-extrabold font-[Poppins] tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <span className="text-[var(--text)]">Edu</span>
          <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">
            Connect
          </span>
        </motion.h1>
        <motion.p
          className="text-[var(--text)]/80 w-[85%] text-center lg:text-left lg:w-full px-0 lg:px-8 text-lg lg:text-xl leading-relaxed font-[Montserrat] mt-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          A platform designed to help you add, discover, and connect with
          schools and institutions — making educational data{" "}
          <span className="font-semibold text-[var(--primary)]">
            accessible
          </span>{" "}
          and
          <span className="font-semibold text-[var(--accent)]"> organized</span>
          .
        </motion.p>
        <motion.div
          className="w-full mt-10 pb-10 lg:pb-0 flex items-center lg:justify-start px-0 lg:px-8 justify-center font-[Montserrat]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          <Link
            href="/showSchools"
            className="lg:text-xl text-lg px-8 py-3 rounded-xl 
             bg-[var(--primary)] text-white 
             hover:bg-[var(--text)] hover:shadow-lg
             hover:ring-1 hover:ring-offset-2 hover:ring-[var(--primary)] 
             transition-all duration-300 ease-in-out 
             font-semibold shadow-md"
          >
            Discover Schools
          </Link>
        </motion.div>
      </motion.div>
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[var(--background)] shadow-2xl rounded-2xl w-full max-w-4xl p-8 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 border border-[var(--secondary)]"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* image upload area */}
        <motion.div
          className="flex flex-col items-center justify-center md:h-[95%] sm:h-[24rem] h-[24rem]"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <FileUpload
            file={imageFile}
            setFile={handleFileUpload}
            onUpload={handleFileUpload}
            onRemove={handleFileRemove}
            className="w-full h-full"
          />
          <AnimatePresence>
            {errors.image && (
              <motion.p
                className="text-lg text-[var(--accent)] mt-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
              >
                {errors.image.message as string}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* right side for input fields */}
        <motion.div
          className="flex flex-col gap-6 justify-center"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.12 },
            },
          }}
        >
          <motion.div
            className="text-2xl font-bold text-[var(--primary)] mb-2 font-[Montserrat] tracking-wide"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            School Details
          </motion.div>
          {/* name field */}
          <motion.div
            className="mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
          >
            <div className="relative flex items-center">
              <span className="absolute left-3 text-[var(--primary)]">
                <BiSolidSchool size={22} />
              </span>
              <input
                type="text"
                {...register("name")}
                className={`pl-11 pr-3 py-3 w-full rounded-xl border border-[var(--secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition shadow-sm bg-[var(--background)] font-[Poppins] text-[var(--text)] placeholder:text-[var(--text)]/60 peer ${
                  errors.name ? "border-[var(--accent)]" : ""
                }`}
                placeholder="School Name"
                autoComplete="off"
              />
            </div>
            <AnimatePresence>
              {errors.name && (
                <motion.p
                  className="text-sm text-red-500 mt-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  {errors.name.message}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
          {/* email field */}
          <motion.div
            className="mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
          >
            <div className="relative flex items-center">
              <span className="absolute top-1/2 -translate-y-1/2 left-3 text-[var(--primary)]">
                <MdOutlineMail size={22} />
              </span>
              <input
                type="email"
                {...register("email")}
                className={`pl-11 pr-3 py-3 w-full rounded-xl border border-[var(--secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition shadow-sm bg-[var(--background)] font-[Poppins] text-[var(--text)] placeholder:text-[var(--text)]/60 peer ${
                  errors.email ? "border-[var(--accent)]" : ""
                }`}
                placeholder="Email Address"
                autoComplete="off"
              />
            </div>
            <AnimatePresence>
              {errors.email && (
                <motion.p
                  className="text-sm text-red-500 mt-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  {errors.email.message}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
          {/* Address */}
          <motion.div
            className="mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
          >
            <div className="relative flex items-center">
              <span className="absolute top-1/2 -translate-y-1/2 left-3 text-[var(--primary)]">
                <MdOutlineLocationOn size={22} />
              </span>
              <input
                type="text"
                {...register("address")}
                className={`pl-11 pr-3 py-3 w-full rounded-xl border border-[var(--secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition shadow-sm bg-[var(--background)] font-[Poppins] text-[var(--text)] placeholder:text-[var(--text)]/60 peer ${
                  errors.address ? "border-[var(--accent)]" : ""
                }`}
                placeholder="Address"
                autoComplete="off"
              />
            </div>
            <AnimatePresence>
              {errors.address && (
                <motion.p
                  className="text-sm text-red-500 mt-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  {errors.address.message}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
          {/* city , state */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              className="mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
            >
              <div className="relative flex items-center">
                <span className="absolute top-1/2 -translate-y-1/2 left-3 text-[var(--primary)]">
                  <BsPinMap size={22} />
                </span>
                <input
                  type="text"
                  {...register("city")}
                  className={`pl-11 pr-3 py-3 w-full rounded-xl border border-[var(--secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition shadow-sm bg-[var(--background)] font-[Poppins] text-[var(--text)] placeholder:text-[var(--text)]/60 peer ${
                    errors.city ? "border-[var(--accent)]" : ""
                  }`}
                  placeholder="City"
                  autoComplete="off"
                />
              </div>
              <AnimatePresence>
                {errors.city && (
                  <motion.p
                    className="text-sm text-red-500 mt-1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {errors.city.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
            <motion.div
              className="mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
            >
              <div className="relative flex items-center">
                <span className="absolute top-1/2 -translate-y-1/2 left-3 text-[var(--primary)]">
                  <LuMap size={22} />
                </span>
                <input
                  type="text"
                  {...register("state")}
                  className={`pl-11 pr-3 py-3 w-full rounded-xl border border-[var(--secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition shadow-sm bg-[var(--background)] font-[Poppins] text-[var(--text)] placeholder:text-[var(--text)]/60 peer ${
                    errors.state ? "border-[var(--accent)]" : ""
                  }`}
                  placeholder="State"
                  autoComplete="off"
                />
              </div>
              <AnimatePresence>
                {errors.state && (
                  <motion.p
                    className="text-sm text-red-500 mt-1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {errors.state.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
          {/* contact field */}
          <motion.div
            className="mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
          >
            <div className="relative flex items-center">
              <span className="absolute top-1/2 -translate-y-1/2 left-3 text-[var(--primary)]">
                <MdLocalPhone size={22} />
              </span>
              <input
                type="text"
                {...register("contact")}
                className={`pl-11 pr-3 py-3 w-full rounded-xl border border-[var(--secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition shadow-sm bg-[var(--background)] font-[Poppins] text-[var(--text)] placeholder:text-[var(--text)]/60 peer ${
                  errors.contact ? "border-[var(--accent)]" : ""
                }`}
                placeholder="Contact Number"
                autoComplete="off"
              />
            </div>
            <AnimatePresence>
              {errors.contact && (
                <motion.p
                  className="text-sm text-red-500 mt-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  {errors.contact.message}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
          <motion.button
            type="submit"
            className="mt-6 w-full py-3 font-semibold rounded-xl 
        bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white 
        hover:scale-105 hover:shadow-lg
        focus:ring-4 focus:ring-[var(--secondary)] 
        transition-all duration-200 shadow-md flex items-center justify-center gap-2"
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.4 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              "Add School"
            )}
          </motion.button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
}
