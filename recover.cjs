const fs = require('fs');
const readline = require('readline');
const path = require('path');

const logPath = 'C:/Users/rajbh/.gemini/antigravity-ide/brain/980e0df2-b58a-4b39-81ce-62ea71c4c4fc/.system_generated/logs/transcript.jsonl';

async function recover() {
  const fileStream = fs.createReadStream(logPath);
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });
  const files = {}; 

  for await (const line of rl) {
    if (!line.trim()) continue;
    try {
      const step = JSON.parse(line);
      const calls = step.tool_calls || step.toolCalls || (step.message && step.message.tool_calls) || [];
      for (const call of calls) {
        const name = call.function?.name || call.name;
        if (name === 'default_api:write_to_file' || name === 'write_to_file') {
           let args = call.function?.arguments || call.arguments || call.args;
           if (typeof args === 'string') args = JSON.parse(args);
           
           if (args && args.TargetFile && args.CodeContent) {
              // TargetFile and CodeContent might be stringified JSON
              let targetFile = args.TargetFile;
              if (targetFile.startsWith('"')) targetFile = JSON.parse(targetFile);
              
              let codeContent = args.CodeContent;
              if (codeContent.startsWith('"') && codeContent.endsWith('"')) {
                  try { codeContent = JSON.parse(codeContent); } catch(e) {}
              }

              let isArtifact = args.IsArtifact;
              if (typeof isArtifact === 'string') isArtifact = isArtifact === 'true';

              if (isArtifact) continue;
              const key = targetFile.replace(/\\/g, '/');
              files[key] = codeContent;
           }
        }
      }
    } catch(e) {}
  }
  
  for (let [filepath, content] of Object.entries(files)) {
     if (filepath.includes('src/') || filepath.includes('tailwind') || filepath.includes('package.json') || filepath.includes('vite.config') || filepath.includes('index.html')) {
        const dir = path.dirname(filepath);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(filepath, content);
        console.log("Recovered:", filepath);
     }
  }
}
recover();
