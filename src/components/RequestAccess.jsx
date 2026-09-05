import { createContext, useContext, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { API } from "@/lib/api";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const Ctx = createContext({ open: () => {} });
export const useRequestAccess = () => useContext(Ctx);

const ORGS = ["Research institution", "Aerospace / Defense", "Energy", "Life sciences", "Industrial / Robotics", "Other"];

const Field = ({ label, children }) => (
  <label className="block">
    <span className="eyebrow text-dust">{label}</span>
    {children}
  </label>
);

const RequestAccessModal = ({ open, onOpenChange }) => {
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [reference, setReference] = useState("");
  const [form, setForm] = useState({ name: "", email: "", org: ORGS[0], pflops: "", usecase: "" });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const { data } = await axios.post(`${API}/access-requests`, {
        full_name: form.name,
        work_email: form.email,
        organization_type: form.org,
        compute_pflops: form.pflops === "" ? null : Number(form.pflops),
        use_case: form.usecase,
      });
      setReference(data.reference);
      setDone(true);
      toast("Request logged", { description: `Reference ${data.reference}. A systems lead will respond within 48 hours.` });
    } catch {
      toast.error("Transmission failed", { description: "The request could not be recorded. Please try again." });
    } finally {
      setBusy(false);
    }
  };

  const close = (v) => {
    onOpenChange(v);
    if (!v) setTimeout(() => setDone(false), 300);
  };

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent
        data-testid="request-access-modal"
        className="rounded-none border border-white/15 bg-ink-2 text-bone sm:max-w-xl p-0 gap-0 shadow-none"
      >
        <div className="flex items-center justify-between border-b border-white/10 pl-8 pr-14 py-5">
          <DialogTitle className="eyebrow text-dust font-normal">Request Access — Form 01</DialogTitle>
          <span className="flex items-center gap-2 eyebrow text-dust"><span className="h-1.5 w-1.5 bg-copper pulse-dot" />Secure</span>
        </div>
        <DialogDescription className="sr-only">Request access to AURELIS systems</DialogDescription>

        {done ? (
          <div data-testid="modal-success" className="px-8 py-14">
            <div className="font-display text-3xl sm:text-4xl font-semibold uppercase leading-[1.05] tracking-tight">
              Request<br />received.
            </div>
            <p className="mt-6 max-w-sm text-sm text-dust leading-relaxed">
              Reference <span data-testid="modal-reference" className="font-mono text-bone">{reference}</span>. A systems lead will contact {form.email || "you"} within 48 hours.
            </p>
            <button data-testid="modal-close-btn" onClick={() => close(false)} className="btn-ghost mt-10">Close</button>
          </div>
        ) : (
          <form onSubmit={submit} className="px-8 py-8 space-y-7">
            <div className="grid gap-7 sm:grid-cols-2">
              <Field label="Full name">
                <input data-testid="modal-input-name" required className="field" placeholder="Dr. Ada Lind" value={form.name} onChange={set("name")} />
              </Field>
              <Field label="Work email">
                <input data-testid="modal-input-email" required type="email" className="field" placeholder="a.lind@institute.org" value={form.email} onChange={set("email")} />
              </Field>
            </div>
            <div className="grid gap-7 sm:grid-cols-2">
              <Field label="Organisation type">
                <select data-testid="modal-input-org" className="field" value={form.org} onChange={set("org")}>
                  {ORGS.map((o) => <option key={o}>{o}</option>)}
                </select>
              </Field>
              <Field label="Compute requirement (PFLOPS)">
                <input data-testid="modal-input-pflops" type="number" min="0" className="field" placeholder="e.g. 40" value={form.pflops} onChange={set("pflops")} />
              </Field>
            </div>
            <Field label="Primary use case">
              <textarea data-testid="modal-input-usecase" rows={3} className="field resize-none" placeholder="Describe the problem conventional computing cannot solve for you." value={form.usecase} onChange={set("usecase")} />
            </Field>
            <div className="flex items-center justify-between pt-2">
              <span className="eyebrow text-dust hidden sm:block">Reviewed by a human</span>
              <button data-testid="modal-submit-btn" type="submit" disabled={busy} className="btn-primary disabled:opacity-60">{busy ? "Transmitting…" : "Submit request"} <span aria-hidden>→</span></button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export const RequestAccessProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  return (
    <Ctx.Provider value={{ open: () => setOpen(true) }}>
      {children}
      <RequestAccessModal open={open} onOpenChange={setOpen} />
    </Ctx.Provider>
  );
};
