/**
 * PreviewFrame Component
 * 
 * Design: Warm Minimalism
 * - Full-width iframe with 65vh height
 * - Renders generated HTML using srcdoc attribute
 * - Light grey background while loading
 */

interface PreviewFrameProps {
  html: string;
}

export default function PreviewFrame({ html }: PreviewFrameProps) {
  return (
    <div className="w-full">
      <iframe
        srcDoc={html}
        className="w-full block border-none"
        style={{
          height: '65vh',
          backgroundColor: '#f5f5f5',
        }}
        sandbox="allow-scripts"
        title="Generated Preview"
      />
    </div>
  );
}
