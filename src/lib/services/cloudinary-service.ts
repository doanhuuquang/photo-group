const upLoadPhotosToCloudinary = async (
  folderName: string,
  files: File[]
): Promise<string[]> => {
  if (files.length === 0) [];

  try {
    const timestamp = Math.floor(Date.now() / 1000);

    const sigRes = await fetch("/api/sign-cloudinary-params", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        paramsToSign: {
          folder: folderName,
          timestamp: timestamp,
        },
      }),
    });

    const { signature } = await sigRes.json();

    const uploadedUrls: string[] = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
      formData.append("signature", signature);
      formData.append("timestamp", timestamp.toString());
      formData.append("folder", folderName);

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await uploadRes.json();
      if (data.secure_url) uploadedUrls.push(data.secure_url);
    }

    return uploadedUrls;
  } catch (error) {
    throw error;
  }
};

export { upLoadPhotosToCloudinary };
