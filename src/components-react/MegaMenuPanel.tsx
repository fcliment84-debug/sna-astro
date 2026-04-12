import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface MegaMenuPanelProps {
  children: ReactNode;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const MegaMenuPanel = ({ children, onMouseEnter, onMouseLeave }: MegaMenuPanelProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute top-full left-0 right-0 bg-sna-dark z-50 border-t border-white/10"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        {children}
      </div>
    </motion.div>
  );
};

export default MegaMenuPanel;
