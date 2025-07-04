import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  BoldItalicUnderlineToggles,
  toolbarPlugin,
  UndoRedo,
  BlockTypeSelect,
  CodeToggle,
  CreateLink,
  InsertImage,
  ListsToggle,
  Separator,
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';
import { useState } from 'react';
import DownloadPdfButton from '../common/DownloadPdfButton';

interface LessonEditorProps {
  initialContent: string;
  onSave?: (markdown: string) => void;
  fileName: string;
}

const LessonEditor: React.FC<LessonEditorProps> = ({
  initialContent,
  onSave,
  fileName,
}) => {
  const [markdown, setMarkdown] = useState<string>(initialContent);

  const handleSave = () => {
    if (onSave) onSave(markdown);
  };

  return (
    <div className="p-4 bg-white rounded-xl border shadow-md">
      <div className="border rounded-lg overflow-hidden">
        <MDXEditor
          markdown={markdown}
          onChange={setMarkdown}
          plugins={[
            toolbarPlugin({
              toolbarContents: () => (
                <>
                  <UndoRedo />
                  <Separator />
                  <BoldItalicUnderlineToggles />
                  <CodeToggle />
                  <Separator />
                  <ListsToggle />
                  <Separator />
                  <BlockTypeSelect />
                  <Separator />
                  <CreateLink />
                  <InsertImage />
                </>
              ),
            }),
            headingsPlugin(),
            listsPlugin(),
            quotePlugin(),
            thematicBreakPlugin(),
            markdownShortcutPlugin(),
          ]}
          contentEditableClassName="prose max-w-none p-4 min-h-[400px] focus:outline-none "
        />
      </div>

      <div className="flex justify-end mt-4 gap-4">
        <DownloadPdfButton markdown={markdown} fileName={fileName} />
        <button
          onClick={handleSave}
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          Save Lesson
        </button>
      </div>
    </div>
  );
};

export default LessonEditor;
