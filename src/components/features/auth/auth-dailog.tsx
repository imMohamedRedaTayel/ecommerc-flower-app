"use client";

import { Dispatch, SetStateAction, useState } from "react";
import dynamic from "next/dynamic";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

// Types
type FormNames = "login" | "register" | "forgot-password" | "verify-otp" | "set-password";

export type FormNameTypes = {
  setFormState: Dispatch<SetStateAction<FormNames>>;
};

// Loading component
const WithCustomLoading = () => (
  <div className="flex justify-center items-center">
    <Loader2 className="animate-spin text-gray-500" size={24} />
  </div>
);

// Forms components
const LoginForm = dynamic(() => import("./components/login-form"), {
  ssr: false,
  loading: () => <WithCustomLoading />,
});
const RegisterForm = dynamic(() => import("./components/register-form"), {
  ssr: false,
  loading: () => <WithCustomLoading />
});
const ForgotPasswordForm = dynamic(() => import("./components/forgot-password-form"), {
  ssr: false,
  loading: () => <WithCustomLoading />
});
const VerifyOtpForm = dynamic(() => import("./components/verify-otp-form"), {
  ssr: false,
  loading: () => <WithCustomLoading />
});
const SetPasswordForm = dynamic(() => import("./components/set-password-form"), {
  ssr: false,
  loading: () => <WithCustomLoading />
});


export function AuthDialog({ children }: { children: React.ReactNode }) {

  // States
  const [formState, setFormState] = useState<FormNames>("login");
  const [open, setOpen] = useState(false);

  // Functions
  function handleOpenChange(isOpen: boolean) {
    if (!isOpen) {
      setTimeout(() => {
        setFormState("login");
      }, 500);
    }
    setOpen(isOpen);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {/* Login button */}
         {children}
      </DialogTrigger>

      <DialogContent>
        {/* Forms dialog */}
        {formState === "login" && <LoginForm setFormState={setFormState} />}
        {formState === "register" && <RegisterForm setFormState={setFormState} />}
        {formState === "forgot-password" && <ForgotPasswordForm setFormState={setFormState} />}
        {formState === "verify-otp" && <VerifyOtpForm setFormState={setFormState} />}
        {formState === "set-password" && <SetPasswordForm setFormState={setFormState} />}
      </DialogContent>
    </Dialog>
  );
}
