import { useState } from "react";
import uploadReceipt from "../../api/deliveryApi/uploadReceipt";

function DeliReciept({ selectedOrder, refreshOrders, receipt }) {
  const [formData, setFormData] = useState({
    images: [],
  });
  const [dragActive, setDragActive] = useState(false);

  const handleImageUpload = (files) => {
    const validFiles = Array.from(files).filter((file) => {
      const isValidType = file.type.startsWith("image/");
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB limit
      return isValidType && isValidSize;
    });

    if (validFiles.length > 0) {
      const newImages = validFiles.map((file) => ({
        file,
        id: Date.now() + Math.random(),
        preview: URL.createObjectURL(file),
        name: file.name,
        size: file.size,
      }));

      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...newImages].slice(0, 5), // Max 5 images
      }));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const removeImage = (imageId) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img.id !== imageId),
    }));
  };

  const handleConfirm = async () => {
    const data = new FormData();
    data.append("deliveryReceiptImage", formData.images[0].file);
    const response = await uploadReceipt({ data: data, id: selectedOrder });
    console.log(response);
    if (response.code === 201) {
      refreshOrders();
    }
    // refreshOrders();
  };

  return (
    <div className="mx-5 h-[calc(100vh-190px)] overflow-y-auto">
      <div className="flex items-center justify-between">
        <h1 className="header">Upload Reciept</h1>
      </div>

      {receipt.length === 0 && (
        <div className="mt-10">
          {/* Upload Area */}
          {formData.images.length === 0 && (
            <div
              className={`
                  relative flex items-center justify-center border-2 h-[200px] border-dashed rounded-lg p-6 text-center transition-colors
                  ${
                    dragActive
                      ? "border-orange-400 bg-orange-50"
                      : "border-gray-300 hover:border-gray-400"
                  }
                `}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e.target.files)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />

              <div className="space-y-2">
                <div className="mx-auto w-12 h-12 text-gray-400">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 48 48">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    />
                  </svg>
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium text-orange-600">
                    Click to upload
                  </span>{" "}
                  or drag and drop
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 5MB (Max 5 images)
                </p>
              </div>
            </div>
          )}

          {/* Image Previews */}
          {formData.images.length > 0 && (
            <div className="mt-4 w-[350px] mx-auto">
              {formData.images.map((image) => (
                <div key={image.id} className="relative group">
                  <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={image.preview || "/placeholder.svg"}
                      alt={image.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => removeImage(image.id)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                  >
                    ×
                  </button>

                  {/* Image Info */}
                  <div className="mt-1 text-xs text-gray-500 truncate">
                    {image.name}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {receipt && (
        <div>
          <img
            src={receipt[0]?.deliveryReceiptImage?.deliveryImageUrl}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {receipt.length === 0 && (
        <div className="flex items-center justify-end gap-5 mt-10">
          <button
            className="button flex items-center justify-center"
            onClick={() => handleConfirm()}
          >
            Confirm
          </button>
        </div>
      )}
    </div>
  );
}

export default DeliReciept;
