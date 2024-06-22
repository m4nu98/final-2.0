/**
 * v0 by Vercel.
 * @see https://v0.dev/t/FJho0I7nBWl
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";
import Link from "next/link"
import { useState } from "react"; // Importamos useState
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import "../globals.css"
export default function Component() {
  const [showForm, setShowForm] = useState(false); // Estado para mostrar/ocultar el formulario

  const handlePublishClick = () => {
    setShowForm(true); // Mostrar el formulario cuando se hace clic en "Publicar"
  };

  const handleCloseForm = () => {
    setShowForm(false); // Ocultar el formulario
  };

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main>
        <section className="centrar py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 grid gap-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Our Services</h1>
                <p className="text-gray-500 md:text-xl">Find the best professionals for your home or business needs.</p>
              </div>
              <div className="relative w-full max-w-md flex items-center">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 dark:text-gray-400" />
                <Input type="search" placeholder="Search services..." className="pl-10 pr-8 w-full" />
                <Button
                  variant="outline"
                  className="ml-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                >
                  <SearchIcon className="h-5 w-5" />
                  <span className="sr-only">Search</span>
                </Button>
                <Button variant="azul"  className="colorazul ml-2" onClick={handlePublishClick}>
                  <PlusIcon className="h-5 w-5 mr-2" />
                  Publicar
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8">
              <div className="bg-white dark:bg-gray rounded-lg shadow-md p-6 flex flex-col gap-6">
                <h3 className="text-xl font-semibold">Filters</h3>
                <Accordion type="single" collapsible>
                  <AccordionItem value="categories">
                    <AccordionTrigger className="text-base">Categories</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid gap-2">
                        <Label className="flex items-center gap-2 font-normal">
                          <Checkbox id="category-cleaning" /> Cleaning
                        </Label>
                        <Label className="flex items-center gap-2 font-normal">
                          <Checkbox id="category-electrical" /> Electrical
                        </Label>
                        <Label className="flex items-center gap-2 font-normal">
                          <Checkbox id="category-gardening" /> Gardening
                        </Label>
                        <Label className="flex items-center gap-2 font-normal">
                          <Checkbox id="category-plumbing" /> Plumbing
                        </Label>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="provinces">
                    <AccordionTrigger className="text-base">Provinces</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid gap-2">
                        <Label className="flex items-center gap-2 font-normal">
                          <Checkbox id="province-ontario" /> Tucuman
                        </Label>
                        <Label className="flex items-center gap-2 font-normal">
                          <Checkbox id="province-quebec" /> Santa Fe
                        </Label>
                        <Label className="flex items-center gap-2 font-normal">
                          <Checkbox id="province-british-columbia" /> Cordoba
                        </Label>
                        <Label className="flex items-center gap-2 font-normal">
                          <Checkbox id="province-alberta" /> San luis
                        </Label>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray rounded-lg shadow-md p-6 flex flex-col items-center gap-4">
                  <BrushIcon className="h-12 w-12 text-gray-900 dark:text-gray" />
                  <h3 className="text-xl font-semibold">Cleaning</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-center">
                    Our professional cleaners will make your home or office spotless.
                  </p>
                </div>
                <div className="bg-white dark:bg-gray rounded-lg shadow-md p-6 flex flex-col items-center gap-4">
                  <BoltIcon className="h-12 w-12 text-gray-900 dark:text-gray" />
                  <h3 className="text-xl font-semibold">Electrical</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-center">
                    Our licensed electricians can handle any electrical job, big or small.
                  </p>
                </div>
                <div className="bg-white dark:bg-gray rounded-lg shadow-md p-6 flex flex-col items-center gap-4">
                  <LeafIcon className="h-12 w-12 text-gray-900 dark:text-gray" />
                  <h3 className="text-xl font-semibold">Gardening</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-center">
                    Our expert gardeners will keep your outdoor space looking beautiful.
                  </p>
                </div>
                <div className="bg-white dark:bg-gray rounded-lg shadow-md p-6 flex flex-col items-center gap-4">
                  <PipetteIcon className="h-12 w-12 text-gray-900 dark:text-gray" />
                  <h3 className="text-xl font-semibold">Plumbing</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-center">
                    Our skilled plumbers can handle any plumbing issue, big or small.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {showForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white dark:bg-gray rounded-lg shadow-md p-6 w-full max-w-md">
              <h2 className="text-2xl font-semibold mb-4">Create Job Posting</h2>
              <form>
                {/* Aquí van los campos del formulario */}
                <div className="grid grid-cols-1 gap-4">
                  <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">
                    Nombre y Apellido
                  </label>
                  <input
                    type="text"
                    id="Nombre y apellido"
                    name="Nombre y apellido"
                    className="border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 block w-full sm:text-sm border p-2"
                    placeholder="Nombre y apellido"
                  />
                  {/* Más campos según necesidad */}
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">
                    DNI
                  </label>
                  <input
                    type="text"
                    id="Dni"
                    name="Dni"
                    className="border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 block w-full sm:text-sm border p-2"
                    placeholder="Dni"
                  />
                  {/* Más campos según necesidad */}
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">
                    Direccion
                  </label>
                  <input
                    type="text"
                    id="Direccion"
                    name="Direccion"
                    className="border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 block w-full sm:text-sm border p-2"
                    placeholder="Direccion"
                  />
                  {/* Más campos según necesidad */}
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">
                    Numero de telefono
                  </label>
                  <input
                    type="text"
                    id="Nro de telefono"
                    name="Nro de telefono"
                    className="border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 block w-full sm:text-sm border p-2"
                    placeholder="Nro de telefono"
                  />
                  {/* Más campos según necesidad */}
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">
                    servicio
                  </label>
                  <input
                    type="text"
                    id="servicio"
                    name="servicio"
                    className="border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 block w-full sm:text-sm border p-2"
                    placeholder="servicio"
                  />
                  {/* Más campos según necesidad */}
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">
                    Codigo Postal
                  </label>
                  <input
                    type="text"
                    id="jobTitle"
                    name="Codigo postal"
                    className="border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 block w-full sm:text-sm border p-2"
                    placeholder="Codigo postal"
                  />
                  {/* Más campos según necesidad */}
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring focus:ring-gray-300 disabled:opacity-50"
                    onClick={handleCloseForm}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-white uppercase tracking-widest hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:border-blue-900 focus:ring focus:ring-blue-300 disabled:opacity-50 ml-2"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

function BoltIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  )
}

function BrushIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08" />
      <path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z" />
    </svg>
  )
}

function LeafIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  )
}

function MapPinIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}

function PhoneIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function PipetteIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m2 22 1-1h3l9-9" />
      <path d="M3 21v-3l9-9" />
      <path d="m15 6 3.4-3.4a2.1 2.1 0 1 1 3 3L18 9l.4.4a2.1 2.1 0 1 1-3 3l-3.8-3.8a2.1 2.1 0 1 1 3-3l.4.4Z" />
    </svg>
  )
}

function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}
