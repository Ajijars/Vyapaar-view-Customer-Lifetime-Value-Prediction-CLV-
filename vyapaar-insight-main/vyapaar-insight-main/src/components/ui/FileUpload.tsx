import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, UploadCloud, CheckCircle2 } from "lucide-react";

export function FileUploadModal({ onClose }: { onClose: () => void }) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-lg bg-card rounded-2xl border border-border shadow-2xl overflow-hidden"
        >
          <div className="flex items-center justify-between p-6 border-b border-border/50 bg-background/50">
            <div>
              <h3 className="font-display font-bold text-2xl text-foreground">Import Dataset</h3>
              <p className="text-sm text-muted-foreground mt-1">Upload your latest Tally or Excel export.</p>
            </div>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-muted transition-colors">
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          <div className="p-6">
            <div 
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`
                relative flex flex-col items-center justify-center py-16 px-6 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300
                ${isDragging ? "border-foreground bg-muted scale-[1.02]" : "border-border hover:border-foreground/50 hover:bg-muted/50"}
              `}
            >
              <input 
                type="file" 
                className="hidden" 
                ref={fileInputRef} 
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                onChange={(e) => e.target.files && setFile(e.target.files[0])}
              />
              
              {file ? (
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8 text-success" />
                  </div>
                  <p className="font-sans font-bold text-lg text-foreground mb-1">{file.name}</p>
                  <p className="text-sm text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB • Ready to analyze</p>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center text-center pointer-events-none">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-6">
                    <UploadCloud className="w-8 h-8 text-foreground" />
                  </div>
                  <p className="font-sans font-bold text-xl text-foreground mb-2">Click or drag file to this area to upload</p>
                  <p className="text-sm text-muted-foreground max-w-[250px] mx-auto leading-relaxed">
                    Support for a single or bulk upload. (.xlsx, .csv up to 50MB)
                  </p>
                </div>
              )}
            </div>
            
            <div className="mt-8 flex justify-end gap-3">
              <button onClick={onClose} className="px-5 py-2.5 font-semibold text-sm rounded-lg hover:bg-muted transition-colors text-muted-foreground">Cancel</button>
              <button 
                disabled={!file}
                className="px-6 py-2.5 bg-foreground text-background font-bold text-sm rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-all"
              >
                Analyze Data
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
