"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FiSearch } from "react-icons/fi";
import { MdLocationOn } from "react-icons/md";
import { toast } from "react-hot-toast";

interface School {
  id: string;
  name: string;
  city: string;
  address: string;
  image?: string;
}

export default function Home() {
  const [schools, setSchools] = useState<School[]>([]);
  const [filteredSchools, setFilteredSchools] = useState<School[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // ...existing code...
  useEffect(() => {
    async function fetchSchools() {
      setLoading(true);
      try {
        const res = await fetch("/api/showSchool");
        if (!res.ok) throw new Error("Failed to fetch schools");
        const data = await res.json();
        setSchools(Array.isArray(data) ? data[0] : []);
        console.log(data);
      } catch (err) {
        toast.error("Error loading schools!");
      } finally {
        setLoading(false);
      }
    }
    fetchSchools();
  }, []);

  useEffect(() => {
    if (!search) {
      setFilteredSchools(schools);
    } else {
      setFilteredSchools(
        schools.filter(
          (school: School) =>
            school.name.toLowerCase().includes(search.toLowerCase()) ||
            school.city.toLowerCase().includes(search.toLowerCase()) ||
            school.address.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, schools]);

  return (
    <motion.div
      className="bg-[var(--background)]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* hero section */}
      <motion.div
        className="relative w-full h-[28rem] flex flex-col items-center justify-center bg-[var(--secondary)]"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <Image
          src="/schoolbg.jpg"
          alt="Schools Hero"
          fill
          className="absolute inset-0 w-full h-full object-cover opacity-80"
          priority={true}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--text)]/80 to-transparent" />
        <motion.h1
          className="text-[var(--background)] z-10 text-5xl leading-tight tracking-wider lg:text-5xl font-black font-[Poppins]  text-center mb-12 lg:w-1/2 w-full"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          DISCOVER YOUR PERFECT{" "}
          <span className="bg-[var(--primary)]">SCHOOL</span>
        </motion.h1>
        <motion.p
          className="text-[var(--background)] z-10 text-xl lg:text-2xl font-medium font-[Poppins]  text-center mb-12 lg:w-1/2 w-full"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          Explore, Search, and Find the Best Fit
        </motion.p>
        <motion.div
          className="absolute bottom-0 left-0 z-10 -mb-8 w-full flex justify-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          <motion.div
            className="flex items-center bg-white rounded-xl shadow-lg px-6 py-4 w-[90%] max-w-2xl border border-[var(--primary)]"
            whileFocus={{ scale: 1.03 }}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            }}
          >
            <FiSearch className="text-[var(--primary)] mr-2" size={22} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent outline-none text-[var(--text)] font-[Poppins] placeholder:text-[var(--text)]/60 text-lg lg:text-xl"
              placeholder="Search schools by name, city, or address..."
            />
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="mx-auto mt-12 flex md:flex-row gap-4 px-8 justify-end items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        <motion.button
          className="px-4 py-2 rounded-lg bg-[var(--primary)]/20 text-black border border-[var(--primary)] font-semibold shadow hover:bg-[var(--primary)] hover:text-white transition"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            const sorted = [...filteredSchools].sort((a, b) =>
              a.name.localeCompare(b.name)
            );
            setFilteredSchools(sorted);
          }}
        >
          Sort by Name
        </motion.button>
        <motion.button
          className="px-4 py-2 rounded-lg bg-[var(--primary)]/20 text-black border border-[var(--primary)] font-semibold shadow hover:bg-[var(--primary)] hover:text-white transition"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            const sorted = [...filteredSchools].sort((a, b) =>
              a.city.localeCompare(b.city)
            );
            setFilteredSchools(sorted);
          }}
        >
          Sort by City
        </motion.button>
      </motion.div>

      {/* school card area */}
      <div className="w-full">
        <motion.div
          className="mx-auto px-12 mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 place-items-center pb-16"
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
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                className="animate-pulse bg-[var(--secondary)] rounded-2xl shadow-lg p-6 flex flex-col gap-4 min-w-[260px] max-w-[350px] w-full"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <div className="h-40 w-full bg-[var(--background)] rounded-xl" />
                <div className="h-6 w-2/3 bg-[var(--background)] rounded" />
                <div className="h-4 w-1/2 bg-[var(--background)] rounded" />
              </motion.div>
            ))
          ) : filteredSchools.length === 0 ? (
            <motion.div
              className="w-full col-span-4 text-center text-[var(--text)]/70 font-semibold text-lg py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              No schools found.
            </motion.div>
          ) : (
            <AnimatePresence>
              {filteredSchools.map((school: School, idx: number) => (
                <motion.div
                  key={school.id}
                  className="bg-white rounded-2xl shadow-lg flex flex-col border border-[var(--secondary)] hover:shadow-xl transition relative min-w-[260px] max-w-[350px] w-full"
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 30, scale: 0.95 }}
                  transition={{ delay: idx * 0.08, duration: 0.5 }}
                  whileHover={{
                    scale: 1.04,
                    boxShadow: "0 8px 32px rgba(0,0,0,0.14)",
                  }}
                >
                  <motion.div
                    className="w-full h-44 rounded-t-xl overflow-hidden bg-[var(--secondary)] flex items-center justify-center relative"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <Image
                      src={
                        school.image
                          ? `${school.image}`
                          : "/school-placeholder.png"
                      }
                      alt={school.name}
                      className="object-cover"
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      priority={true}
                    />
                  </motion.div>
                  <div className="p-4 flex flex-col gap-2 flex-grow">
                    <motion.div
                      className="font-bold text-xl text-[var(--primary)] font-[Montserrat] truncate"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                    >
                      {school.name}
                    </motion.div>
                    <motion.div
                      className="flex items-center gap-2 text-[var(--text)]/80 font-[Poppins]"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35, duration: 0.4 }}
                    >
                      <MdLocationOn
                        className="text-[var(--accent)]"
                        size={18}
                      />
                      <span className="truncate">
                        {school.address}, {school.city}
                      </span>
                    </motion.div>
                    <motion.button
                      className="mt-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white font-semibold shadow hover:scale-105 transition"
                      whileHover={{ scale: 1.07 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() =>
                        toast.success(`Viewing details for ${school.name}`)
                      }
                    >
                      View Details
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
