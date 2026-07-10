const { mdToPdf } = require('md-to-pdf');
const fs = require('fs');
const path = require('path');

const indexFile = path.join(__dirname, 'index.md');

// Order matches nav_order
const fileOrder = [
  indexFile,
  'docs/getting-started/getting-started.md',
  'docs/getting-started/prerequisites.md',
  'docs/features/features.md',
  'docs/features/xtendm3-crud-generator.md',
  'docs/features/event-hub-formatter.md',
  'docs/features/custom-list-checker.md',
  'docs/features/mec-mapping-viewer.md',
  'docs/features/custom-bod-generator.md',
  'docs/features/kiro-chat.md',
  'docs/features/dataflow-list.md',
  'docs/features/genai-chat.md',
  'docs/features/generators.md',
  'docs/features/mec-variable-validations.md',
  'docs/features/object-schema-editor.md',
  'docs/features/log-configuration.md',
  'docs/features/export-configurations.md',
  'docs/features/session-cache.md',
  'docs/features/mec-map-download.md',
  'docs/architecture/architecture.md',
  'docs/architecture/project-structure.md',
  'docs/architecture/services.md',
  'docs/configuration/configuration.md',
  'docs/configuration/odin-json.md',
  'docs/configuration/kiro-chat-setup.md',
  'docs/changelog.md',
];

function stripFrontMatter(content) {
  return content.replace(/^---[\s\S]*?---\n*/m, '');
}

function stripJekyllMarkup(content) {
  // Remove Jekyll/Kramdown classes like {: .fs-9 } {: .no_toc }
  content = content.replace(/\{:.*?\}/g, '');
  content = content.replace(/\n1\. TOC\n/g, '');

  // Convert markdown links with Liquid {% link %} hrefs to plain text (keep label only)
  // e.g. [**Feature Name**]({% link docs/features/something.md %}) → **Feature Name**
  content = content.replace(/\[([^\]]*)\]\(\{%.*?%\}\)/g, '$1');

  // Convert remaining relative markdown links to plain text (avoid localhost navigation)
  // e.g. [Label](/docs/something) or [Label](docs/something) → Label
  content = content.replace(/\[([^\]]*)\]\((?!https?:\/\/)([^)]*)\)/g, '$1');

  // Remove any remaining Liquid tags like {% ... %} and {{ site.baseurl }}
  content = content.replace(/\{%.*?%\}/g, '');
  content = content.replace(/\{\{.*?\}\}/g, '');
  return content;
}

async function generate() {
  let combined = '';

  for (const file of fileOrder) {
    const filePath = path.isAbsolute(file) ? file : path.join(__dirname, file);
    if (!fs.existsSync(filePath)) continue;
    const raw = fs.readFileSync(filePath, 'utf-8');
    const clean = stripJekyllMarkup(stripFrontMatter(raw));
    combined += clean + '\n\n---\n\n';
  }

  const pdf = await mdToPdf(
    { content: combined },
    {
      pdf_options: {
        format: 'A4',
        margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' },
        printBackground: true,
      },
      css: `
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; font-size: 14px; }
        h1 { color: #1a1a1a; border-bottom: 2px solid #0066cc; padding-bottom: 6px; }
        h2 { color: #333; }
        table { border-collapse: collapse; width: 100%; margin: 12px 0; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background: #f5f5f5; }
        code { background: #f4f4f4; padding: 2px 4px; border-radius: 3px; font-size: 13px; }
        pre { background: #f4f4f4; padding: 12px; border-radius: 4px; overflow-x: auto; }
        hr { border: none; border-top: 1px solid #eee; margin: 30px 0; }
      `,
    }
  );

  if (pdf) {
    const outPath = path.join(__dirname, 'reusable-assets-docs.pdf');
    fs.writeFileSync(outPath, pdf.content);
    console.log(`PDF generated: ${outPath}`);
  }
}

generate().catch(console.error);
