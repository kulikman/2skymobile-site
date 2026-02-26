import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Bold, Italic, Heading1, Heading2, Link2, List, ListOrdered, Quote, Code } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '@/lib/utils';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function MarkdownEditor({ 
  value, 
  onChange, 
  placeholder = 'Write your content in Markdown...',
  className 
}: MarkdownEditorProps) {
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');

  const insertMarkdown = (before: string, after: string = '') => {
    const textarea = document.querySelector('textarea[data-markdown-editor]') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    const newValue = 
      value.substring(0, start) + 
      before + selectedText + after + 
      value.substring(end);
    
    onChange(newValue);
    
    // Reset cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + selectedText.length
      );
    }, 0);
  };

  const toolbarButtons = [
    { icon: Bold, action: () => insertMarkdown('**', '**'), title: 'Bold' },
    { icon: Italic, action: () => insertMarkdown('*', '*'), title: 'Italic' },
    { icon: Heading1, action: () => insertMarkdown('# '), title: 'Heading 1' },
    { icon: Heading2, action: () => insertMarkdown('## '), title: 'Heading 2' },
    { icon: Link2, action: () => insertMarkdown('[', '](url)'), title: 'Link' },
    { icon: List, action: () => insertMarkdown('- '), title: 'Bullet List' },
    { icon: ListOrdered, action: () => insertMarkdown('1. '), title: 'Numbered List' },
    { icon: Quote, action: () => insertMarkdown('> '), title: 'Quote' },
    { icon: Code, action: () => insertMarkdown('`', '`'), title: 'Code' },
  ];

  return (
    <div className={cn('border border-border rounded-lg overflow-hidden', className)}>
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'write' | 'preview')}>
        <div className="flex items-center justify-between border-b border-border bg-muted/30 px-2">
          <TabsList className="bg-transparent border-0 h-10">
            <TabsTrigger 
              value="write" 
              className="data-[state=active]:bg-background data-[state=active]:shadow-sm"
            >
              Write
            </TabsTrigger>
            <TabsTrigger 
              value="preview"
              className="data-[state=active]:bg-background data-[state=active]:shadow-sm"
            >
              Preview
            </TabsTrigger>
          </TabsList>
          
          {activeTab === 'write' && (
            <div className="flex items-center gap-0.5">
              {toolbarButtons.map((btn, index) => (
                <Button
                  key={index}
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={btn.action}
                  title={btn.title}
                >
                  <btn.icon className="h-4 w-4" />
                </Button>
              ))}
            </div>
          )}
        </div>
        
        <TabsContent value="write" className="m-0">
          <Textarea
            data-markdown-editor
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="min-h-[400px] border-0 rounded-none resize-none font-mono text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </TabsContent>
        
        <TabsContent value="preview" className="m-0">
          <div className="min-h-[400px] p-4 prose prose-sm dark:prose-invert max-w-none">
            {value ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {value}
              </ReactMarkdown>
            ) : (
              <p className="text-muted-foreground italic">Nothing to preview</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
