import { useState } from "react";
import useAuthState from "../../hooks/useAuthState";
import { motion } from "framer-motion";
import CompanyAccountForm from "./CompanyAccountForm";
import StudentAccountForm from "./StudentAccountForm";
import SecurityForm from "./SecurityForm";
import CompanyForm from "./CompanyForm";

const Edit = () => {
  const { user } = useAuthState();
  const [mode, setMode] = useState("account");

  const handleMode = (mode: string) => {
    setMode(mode);
  };

  const getForm = () => {
    switch (mode) {
      case "account":
        return user?.type === "company" ? (
          <CompanyAccountForm />
        ) : (
          <StudentAccountForm user={user} />
        );
      case "security":
        return <SecurityForm />;
      case "company":
        return <CompanyForm />;
    }
  };

  return (
    <div className="flex flex-col justify-center gap-4">
      <div className="flex justify-center gap-4">
        <div className="relative">
          <button
            onClick={() => handleMode("account")}
            className="relative z-10 rounded-xl p-2 text-primary"
          >
            Account
          </button>
          {mode === "account" && (
            <motion.div
              transition={{ type: "tween", duration: 0.15 }}
              layoutId="edit-highlight"
              className="absolute inset-0 rounded-xl bg-white"
            />
          )}
        </div>
        {user?.company && (
          <div className="relative">
            <button
              onClick={() => handleMode("company")}
              className="relative z-10 rounded-xl p-2 text-primary"
            >
              Company
            </button>
            {mode === "company" && (
              <motion.div
                transition={{ type: "tween", duration: 0.15 }}
                layoutId="edit-highlight"
                className="absolute inset-0 rounded-xl bg-white"
              />
            )}
          </div>
        )}
        <div className="relative">
          <button
            onClick={() => handleMode("security")}
            className="relative z-10 rounded-xl p-2 text-primary"
          >
            Security
          </button>
          {mode === "security" && (
            <motion.div
              transition={{ type: "tween", duration: 0.15 }}
              layoutId="edit-highlight"
              className="absolute inset-0 rounded-xl bg-white"
            />
          )}
        </div>
      </div>
      {getForm()}
    </div>
  );
};

export default Edit;
