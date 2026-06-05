"use client";

import { useState, useEffect } from "react";
import { AboutUs } from "@/components/home/AboutUs";
import { Brands } from "@/components/home/Brands";
import { Stores } from "@/components/home/Stores";
import { Cooperation } from "@/components/home/Cooperation";
import { Testimonials } from "@/components/home/Testimonials";
import { CustomerService } from "@/components/snack/CustomerService";

export function AboutClient() {
  const [showCustomerService, setShowCustomerService] = useState(false);

  useEffect(() => {
    const handler = () => setShowCustomerService(true);
    window.addEventListener("open-customer-service", handler);
    return () => window.removeEventListener("open-customer-service", handler);
  }, []);

  return (
    <div className="pt-8 pb-16">
      <AboutUs />
      <Brands />
      <Cooperation />
      <Testimonials />
      <Stores />
      {showCustomerService && <CustomerService onClose={() => setShowCustomerService(false)} />}
    </div>
  );
}
