"use client";

import { useState } from "react";
import { CustomerService } from "./CustomerService";
import { MessageCircle } from "lucide-react";

export function CustomerServiceButton() {
  const [show, setShow] = useState(false);

  return (
    <>
      <button
        onClick={() => setShow(true)}
        className="w-full flex items-center justify-center gap-2 px-6 py-4 
          bg-gradient-to-r from-primary to-accent text-white font-bold rounded-xl
          shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30
          transition-all hover:scale-[1.01] active:scale-95 text-lg mb-6"
      >
        <MessageCircle size={22} />
        咨询客服拿货
      </button>
      {show && <CustomerService onClose={() => setShow(false)} />}
    </>
  );
}
