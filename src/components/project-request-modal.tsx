"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  Loader2,
  CheckCircle2,
  Briefcase,
  Building2,
  Mail,
  User,
  DollarSign,
} from "lucide-react";
import { submitProjectRequest, ProjectRequestData } from "@/actions/n8n";
import { useTranslations } from "next-intl";

interface ProjectRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectRequestModal({
  isOpen,
  onClose,
}: ProjectRequestModalProps) {
  const t = useTranslations("ProjectRequestModal");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState<ProjectRequestData>({
    name: "",
    email: "",
    company: "",
    projectType: "Web Development",
    budget: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await submitProjectRequest(formData);

    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setFormData({
          name: "",
          email: "",
          company: "",
          projectType: "Web Development",
          budget: "",
          description: "",
        });
      }, 2000);
    } else {
      alert(result.error || "Something went wrong");
    }
    setLoading(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl z-[101] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-800 bg-zinc-900/50">
              <div>
                <h2 className="text-xl font-bold text-white">{t("title")}</h2>
                <p className="text-sm text-zinc-400">{t("subtitle")}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-zinc-800 rounded-full transition-colors text-zinc-500 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {success ? (
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {t("successTitle")}
                  </h3>
                  <p className="text-zinc-400">{t("successMessage")}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-zinc-400 uppercase flex items-center gap-2">
                        <User className="w-3 h-3" /> {t("fields.name")}
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                        placeholder={t("placeholders.name")}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-zinc-400 uppercase flex items-center gap-2">
                        <Mail className="w-3 h-3" /> {t("fields.email")}
                      </label>
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                        placeholder={t("placeholders.email")}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-medium text-zinc-400 uppercase flex items-center gap-2">
                      <Building2 className="w-3 h-3" /> {t("fields.company")}
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          company: e.target.value,
                        }))
                      }
                      className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                      placeholder={t("placeholders.company")}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-zinc-400 uppercase flex items-center gap-2">
                        <Briefcase className="w-3 h-3" /> {t("fields.type")}
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            projectType: e.target.value as any,
                          }))
                        }
                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors appearance-none"
                      >
                        <option value="Web Development">
                          {t("options.web")}
                        </option>
                        <option value="Software Engineering">
                          {t("options.software")}
                        </option>
                        <option value="AI Integration">
                          {t("options.ai")}
                        </option>
                        <option value="Consulting">
                          {t("options.consulting")}
                        </option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-zinc-400 uppercase flex items-center gap-2">
                        <DollarSign className="w-3 h-3" /> {t("fields.budget")}
                      </label>
                      <input
                        type="text"
                        value={formData.budget}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            budget: e.target.value,
                          }))
                        }
                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                        placeholder={t("placeholders.budget")}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-medium text-zinc-400 uppercase">
                      {t("fields.description")}
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.description}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                      placeholder={t("placeholders.description")}
                    />
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex items-center gap-2 px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-black font-bold rounded-lg transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          {t("sending")}
                        </>
                      ) : (
                        <>
                          {t("submit")}
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
