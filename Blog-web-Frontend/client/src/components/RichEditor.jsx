import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

export default function RichEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: "Write your blog content here..." }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    if ((value || "") !== current) editor.commands.setContent(value || "");
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="border rounded">
      <div className="p-2 border-bottom d-flex flex-wrap gap-2">
        <button type="button" className="btn btn-sm btn-outline-dark" onClick={() => editor.chain().focus().toggleBold().run()}>
          Bold
        </button>
        <button type="button" className="btn btn-sm btn-outline-dark" onClick={() => editor.chain().focus().toggleItalic().run()}>
          Italic
        </button>
        <button type="button" className="btn btn-sm btn-outline-dark" onClick={() => editor.chain().focus().toggleBulletList().run()}>
          Bullets
        </button>
        <button type="button" className="btn btn-sm btn-outline-dark" onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          1..2..
        </button>
        <button type="button" className="btn btn-sm btn-outline-dark" onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          Quote
        </button>
        <button type="button" className="btn btn-sm btn-outline-dark" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          H2
        </button>
        <button type="button" className="btn btn-sm btn-outline-dark" onClick={() => editor.chain().focus().setParagraph().run()}>
          P
        </button>
      </div>

      <div className="p-3" style={{ minHeight: 220 }}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
