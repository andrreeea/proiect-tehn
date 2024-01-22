import React, { useState } from "react";
import axios from "axios";

const UploadFilePage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadMessage, setUploadMessage] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setFile(selectedFile || null);
  };

  const handleUpload = async () => {
    try {
      if (!file) {
        setUploadMessage("Selectați un fișier pentru încărcare.");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      // Trimite fișierul către server pentru procesare
      const response = await axios.post("http://localhost:9000/api/upload", formData);

      if (response.data && response.data.success) {
        setUploadMessage("Fișierul a fost încărcat cu succes.");
      } else {
        setUploadMessage("Eroare la încărcarea fișierului.");
      }
    } catch (error:any) {
      console.error("Eroare la încărcarea fișierului:", error.message);
      setUploadMessage("Eroare necunoscută la încărcarea fișierului.");
    }
  };

  return (
    <div>
      <h1>Încarcă Cererea Semnată</h1>
      
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Încarcă Fișier</button>

      {uploadMessage && <p>{uploadMessage}</p>}
    </div>
  );
};

export default UploadFilePage;
