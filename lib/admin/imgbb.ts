/**
 * ImgBB Image Upload Service for Albion Online Platform
 * Uploads user selected files directly to ImgBB using the provided API Key.
 */

export interface ImgBBUploadResponse {
  success: boolean;
  url?: string;
  displayUrl?: string;
  thumbUrl?: string;
  deleteUrl?: string;
  error?: string;
}

export async function uploadToImgBB(file: File, customApiKey?: string): Promise<ImgBBUploadResponse> {
  const apiKey = customApiKey || process.env.NEXT_PUBLIC_IMGBB_API_KEY || '843b40bc51c5486b108d8990aa8a7e01';

  if (!apiKey) {
    return {
      success: false,
      error: 'ImgBB API key is missing. Please configure NEXT_PUBLIC_IMGBB_API_KEY in .env.',
    };
  }

  try {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('key', apiKey);

    const response = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (data.success && data.data) {
      return {
        success: true,
        url: data.data.url,
        displayUrl: data.data.display_url,
        thumbUrl: data.data.thumb?.url || data.data.url,
        deleteUrl: data.data.delete_url,
      };
    } else {
      return {
        success: false,
        error: data.error?.message || 'Failed to upload image to ImgBB.',
      };
    }
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || 'Network error occurred while uploading to ImgBB.',
    };
  }
}
