import {EditorContent, useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {useEffect, useState} from "react";

type Props = {
  name: string;
  defaultValue?: string;
};

export default function RichTextEditor({name, defaultValue}: Props) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const editor = useEditor({
    extensions: [StarterKit], // always include StarterKit so schema has 'doc'
    content: defaultValue || "",
    immediatelyRender: false,
  });

  if (!isClient) {
    // Only render fallback hidden textarea on server
    return <textarea name={name} defaultValue={defaultValue} hidden />;
  }

  return (
    <div className="border rounded p-2">
      {editor && <EditorContent editor={editor} />}
      {/* Hidden field to submit HTML content */}
      <textarea name={name} value={editor?.getHTML() || ""} readOnly hidden />
    </div>
  );
}
