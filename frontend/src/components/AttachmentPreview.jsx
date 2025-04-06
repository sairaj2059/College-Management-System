
import React, { useState, useEffect } from 'react';
import ChatService from "../services/DiscussionService"

const AttachmentPreview = ({ attachmentFileId, attachmentName }) => {
  const [url, setUrl] = useState('');

  useEffect(() => {
    async function fetchAttachment() {
      const blob = await ChatService.getAttachment(attachmentFileId);
      if (blob) {
        const objectURL = URL.createObjectURL(blob);
        setUrl(objectURL);
      }
    }
    fetchAttachment();

    // Cleanup: revoke object URL when component unmounts or URL changes
    return () => {
      if (url) {
        URL.revokeObjectURL(url);
      }
    };
  }, [attachmentFileId]);

  if (!url) return <div>Loading attachment...</div>;

  return (
    <img
      src={url}
      alt={attachmentName || "attachment"}
      style={{ maxWidth: "200px", borderRadius: "8px" }}
    />
  );
};

export default AttachmentPreview;

