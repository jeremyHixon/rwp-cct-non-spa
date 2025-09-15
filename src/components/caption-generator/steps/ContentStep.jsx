import React, { useState, useRef } from 'react';
import AuthGate from '../../common/AuthGate';

const ContentStep = ({ data, onUpdate }) => {
  const [dragOver, setDragOver] = useState(false);
  const [urlError, setUrlError] = useState('');
  const fileInputRef = useRef(null);

  // Alternative content source validation
  const hasDescription = data.description && data.description.trim().length > 0;
  const hasImage = !!data.image;
  const hasUrl = data.url && data.url.trim().length > 0;

  const hasContent = hasDescription || hasImage || hasUrl;

  // Optional field disabling for better UX
  const disableFields = {
    disableImage: hasDescription || hasUrl,
    disableUrl: hasDescription || hasImage,
    disableDescription: hasImage || hasUrl
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    // Optional: Clear other fields when description is entered
    if (value.trim().length > 0) {
      onUpdate({
        description: value,
        image: null,
        url: ''
      });
    } else {
      onUpdate({ description: value });
    }
  };

  const handleUrlChange = (e) => {
    const value = e.target.value;
    setUrlError('');

    if (value && !isValidUrl(value)) {
      setUrlError('Please enter a valid URL');
    }

    // Optional: Clear other fields when URL is entered
    if (value.trim().length > 0) {
      onUpdate({
        url: value,
        description: '',
        image: null
      });
    } else {
      onUpdate({ url: value });
    }
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleFileSelect = (file) => {
    if (file && file.size <= 10 * 1024 * 1024) { // 10MB limit
      // Optional: Clear other fields when image is selected
      onUpdate({
        image: file,
        description: '',
        url: ''
      });
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    onUpdate({ image: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getImagePreview = () => {
    if (data.image) {
      return URL.createObjectURL(data.image);
    }
    return null;
  };

  const characterCount = data.description?.length || 0;

  return (
    <div className="space-y-6">
      {/* Universal Text Description */}
      <div>
        <label htmlFor="rwp_cct_content_description" className="block text-sm font-medium text-gray-300 mb-2">
          Content Description {hasImage || hasUrl ? '(Optional - using image/URL)' : '*'}
        </label>
        <textarea
          id="rwp_cct_content_description"
          rows={4}
          className={`w-full px-3 py-2 border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent resize-none transition-colors ${
            disableFields.disableDescription
              ? 'bg-gray-700 border-gray-500 text-gray-400 cursor-not-allowed'
              : 'bg-gray-800 border-gray-600 focus:ring-blue-500'
          }`}
          placeholder={disableFields.disableDescription ? 'Using image or URL for content analysis' : 'Describe your content, audience, and key message...'}
          value={data.description || ''}
          onChange={handleDescriptionChange}
          disabled={disableFields.disableDescription}
        />
        {characterCount > 0 && (
          <div className="mt-1 text-xs text-gray-500 text-right">
            {characterCount} characters
          </div>
        )}
      </div>

      {/* Alternative Content Sources */}
      <div className="text-center text-gray-400 text-sm font-medium mb-4">
        — OR —
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Image Upload Field */}
        <div>
          <AuthGate
            requiredRole="rwp_cct_premium"
            fallbackContent={
              <div className="text-center p-4 border border-gray-600 rounded bg-gray-800/50">
                <div className="mb-2">
                  <svg className="w-8 h-8 mx-auto text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-gray-400 text-sm mb-2">Content Image (Premium)</p>
                <p className="text-gray-500 text-xs">Upgrade to Premium for image uploads</p>
              </div>
            }
          >
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Upload Image for Analysis {hasDescription || hasUrl ? '(Disabled - using other source)' : '(Premium)'}
              </label>

              {data.image ? (
                <div className="relative">
                  <div className="border border-gray-600 rounded-md overflow-hidden">
                    <img
                      src={getImagePreview()}
                      alt="Content preview"
                      className="w-full h-32 object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-red-600 hover:bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs transition-colors"
                  >
                    ×
                  </button>
                  <p className="mt-1 text-xs text-gray-500">{data.image.name}</p>
                </div>
              ) : (
                <div
                  className={`
                    border-2 border-dashed rounded-md p-6 text-center transition-colors
                    ${disableFields.disableImage
                      ? 'border-gray-500 bg-gray-700/50 cursor-not-allowed'
                      : dragOver
                      ? 'border-blue-500 bg-blue-500/10 cursor-pointer'
                      : 'border-gray-600 hover:border-gray-500 bg-gray-800/50 cursor-pointer'
                    }
                  `}
                  onDragOver={!disableFields.disableImage ? handleDragOver : undefined}
                  onDragLeave={!disableFields.disableImage ? handleDragLeave : undefined}
                  onDrop={!disableFields.disableImage ? handleDrop : undefined}
                  onClick={!disableFields.disableImage ? triggerFileInput : undefined}
                >
                  <div className="mb-2">
                    <svg className="w-8 h-8 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className={`text-sm mb-1 ${disableFields.disableImage ? 'text-gray-500' : 'text-gray-400'}`}>
                    {disableFields.disableImage ? 'Using other content source' : 'Drop image here or click to browse'}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {disableFields.disableImage ? 'Image upload disabled' : 'JPEG, PNG, WebP up to 10MB'}
                  </p>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleFileInputChange}
                className="hidden"
              />
            </div>
          </AuthGate>
        </div>

        {/* URL Field */}
        <div>
          <AuthGate
            requiredRole="rwp_cct_premium"
            fallbackContent={
              <div className="text-center p-4 border border-gray-600 rounded bg-gray-800/50">
                <div className="mb-2">
                  <svg className="w-8 h-8 mx-auto text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                <p className="text-gray-400 text-sm mb-2">Post URL (Premium)</p>
                <p className="text-gray-500 text-xs">Upgrade to Premium for URL analysis</p>
              </div>
            }
          >
            <div>
              <label htmlFor="rwp_cct_content_url" className="block text-sm font-medium text-gray-300 mb-2">
                Page URL for Content Analysis {hasDescription || hasImage ? '(Disabled - using other source)' : '(Premium)'}
              </label>
              <input
                id="rwp_cct_content_url"
                type="url"
                className={`
                  w-full px-3 py-2 border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-colors
                  ${disableFields.disableUrl
                    ? 'bg-gray-700 border-gray-500 text-gray-400 cursor-not-allowed'
                    : urlError
                    ? 'bg-gray-800 border-red-500 focus:ring-red-500'
                    : 'bg-gray-800 border-gray-600 focus:ring-blue-500'
                  }
                `}
                placeholder={disableFields.disableUrl ? 'Using other content source' : 'https://example.com/post'}
                value={data.url || ''}
                onChange={handleUrlChange}
                disabled={disableFields.disableUrl}
              />
              {urlError && (
                <p className="mt-1 text-xs text-red-400">{urlError}</p>
              )}
            </div>
          </AuthGate>
        </div>
      </div>
    </div>
  );
};

export default ContentStep;