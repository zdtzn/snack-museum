"use client";

import { AboutUs } from "@/components/home/AboutUs";
import { Brands } from "@/components/home/Brands";
import { Stores } from "@/components/home/Stores";
import { Cooperation } from "@/components/home/Cooperation";
import { Testimonials } from "@/components/home/Testimonials";

export function AboutClient() {
  return (
    <div className="pt-8 pb-16">
      <AboutUs />
      <Brands />
      <Cooperation />
      <Testimonials />
      <Stores />
    </div>
  );
}
