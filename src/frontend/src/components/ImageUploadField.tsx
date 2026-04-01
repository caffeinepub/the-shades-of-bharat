import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { loadConfig } from "@/config";
import { StorageClient } from "@/utils/StorageClient";
import { HttpAgent } from "@icp-sdk/core/agent";
import { ImageIcon, Loader2, UploadCloud, X } from "lucide-react";
import { useRef, useState } from "react";

interface ImageUploadFieldProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export function ImageUploadField({
  value,
  onChange,
  label = "Image",
}: ImageUploadFieldProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setError("");
    setUploading(true);
    setProgress(0);
    try {
      const config = await loadConfig();
      const agent = new HttpAgent({ host: config.backend_host });
      const storageClient = new StorageClient(
        config.bucket_name,
        config.storage_gateway_url,
        config.backend_canister_id,
        config.project_id,
        agent,
      );
      const bytes = new Uint8Array(await file.arrayBuffer());
      const { hash } = await storageClient.putFile(bytes, (pct) =>
        setProgress(pct),
      );
      const url = await storageClient.getDirectURL(hash);
      onChange(url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      {/* Preview */}
      {value && !uploading && (
        <div className="relative w-full h-36 rounded-lg overflow-hidden border border-border bg-muted">
          <img
            src={value}
            alt="preview"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full p-1 transition-colors"
            aria-label="Remove image"
          >
            <X size={12} />
          </button>
        </div>
      )}

      {/* Upload button */}
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-2"
          data-ocid="admin.upload_button"
        >
          {uploading ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <UploadCloud size={14} />
          )}
          {uploading ? "Uploading..." : "Upload Photo"}
        </Button>
        {!value && (
          <span className="flex items-center text-xs text-muted-foreground gap-1">
            <ImageIcon size={12} />
            JPG, PNG, WEBP, GIF
          </span>
        )}
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />

      {/* Progress */}
      {uploading && (
        <Progress
          value={progress}
          className="h-1.5"
          data-ocid="admin.loading_state"
        />
      )}

      {/* Error */}
      {error && (
        <p className="text-xs text-destructive" data-ocid="admin.error_state">
          {error}
        </p>
      )}

      {/* Manual URL fallback */}
      <div>
        <p className="text-xs text-muted-foreground mb-1">
          Or paste image URL directly:
        </p>
        <Input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://..."
          className="text-xs"
          data-ocid="admin.input"
        />
      </div>
    </div>
  );
}
