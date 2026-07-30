"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const DialogContext = React.createContext({
  open: false,
  setOpen: () => {},
});

function Dialog({ open: controlledOpen, onOpenChange, children }) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
  const open = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;

  const setOpen = React.useCallback(
    (value) => {
      if (onOpenChange) onOpenChange(value);
      setUncontrolledOpen(value);
    },
    [onOpenChange]
  );

  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      {children}
    </DialogContext.Provider>
  );
}

function DialogTrigger({ children, asChild, ...props }) {
  const { setOpen } = React.useContext(DialogContext);

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onClick: (e) => {
        if (children.props.onClick) children.props.onClick(e);
        setOpen(true);
      },
    });
  }

  return (
    <button type="button" onClick={() => setOpen(true)} {...props}>
      {children}
    </button>
  );
}

function DialogContent({ className, children, ...props }) {
  const { open, setOpen } = React.useContext(DialogContext);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in-0 duration-200">
      <div
        className={cn(
          "relative w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-2xl animate-in zoom-in-95 duration-200",
          className
        )}
        {...props}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
          <span className="sr-only">Close</span>
        </button>
        {children}
      </div>
    </div>
  );
}

function DialogHeader({ className, ...props }) {
  return <div className={cn("flex flex-col space-y-2 text-center", className)} {...props} />;
}

function DialogTitle({ className, ...props }) {
  return <h2 className={cn("text-lg font-bold tracking-tight text-white", className)} {...props} />;
}

function DialogDescription({ className, ...props }) {
  return <p className={cn("text-sm text-slate-400", className)} {...props} />;
}

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
};
