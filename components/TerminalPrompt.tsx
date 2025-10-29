interface TerminalPromptProps {
  path: string;
  command?: string;
}

export default function TerminalPrompt({ path, command }: TerminalPromptProps) {
  return (
    <div className="font-mono text-sm mb-6">
      <span className="text-terminal-green">user@dontKillMyVibe</span>
      <span className="text-[#e0e0e0]">:</span>
      <span className="text-terminal-cyan">{path}</span>
      <span className="text-[#e0e0e0]">$ </span>
      {command && (
        <span className="text-terminal-amber">{command}</span>
      )}
    </div>
  );
}
