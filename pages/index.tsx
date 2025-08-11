import React, { useEffect, useState } from "react";

export default function WhatsAppPortal() {
  const [whReachable, setWhReachable] = useState<null | boolean>(null);
  const [copied, setCopied] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "https://web.whatsapp.com/favicon.ico?t=" + Date.now();
    img.onload = () => setWhReachable(true);
    img.onerror = () => setWhReachable(false);
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, []);

  const emailTemplate = `Prezados responsáveis pela TI,

Solicito a liberação do domínio https://web.whatsapp.com para uso comercial pela equipe de atendimento. Motivo: atendimento a clientes e suporte direto via WhatsApp, essencial para nossos processos operacionais.

Por favor, liberar acesso apenas para os endereços IP da rede corporativa e/ou durante o horário comercial. Caso seja necessário, posso fornecer justificativa detalhada do fluxo de atendimento.

Obrigado,
[SEU NOME]
[SEU SETOR]`;

  async function copyTemplate() {
    try {
      await navigator.clipboard.writeText(emailTemplate);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      alert("Não foi possível copiar automaticamente. Selecione e copie manualmente.");
    }
  }

  function openMailto() {
    const subject = encodeURIComponent("Solicitação de liberação: web.whatsapp.com");
    const body = encodeURIComponent(emailTemplate);
    window.location.href = `mailto:ti@empresa.com?subject=${subject}&body=${body}`;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg p-6">
        <header className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Portal WhatsApp — Vercel</h1>
            <p className="text-sm text-slate-500 mt-1">Central de atalhos e instruções para usar WhatsApp no ambiente corporativo.</p>
          </div>
          <div className="text-right text-sm">
            <div className="inline-flex items-center gap-2">
              <span className="font-medium">Status:</span>
              {whReachable === null ? (
                <span className="text-amber-600">Verificando…</span>
              ) : whReachable ? (
                <span className="text-emerald-600">web.whatsapp.com acessível</span>
              ) : (
                <span className="text-rose-600">Bloqueado / inacessível</span>
              )}
            </div>
            <div className="text-xs text-slate-400 mt-1">(verificação básica via favicon)</div>
          </div>
        </header>

        <main className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <section className="p-4 rounded-xl border border-slate-100 bg-slate-50">
            <h2 className="font-semibold">Ações rápidas</h2>
            <p className="text-sm text-slate-500 mt-2">Abra o WhatsApp oficial ou baixe o aplicativo Desktop.</p>

            <div className="mt-4 flex flex-col gap-3">
              <a
                className="inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 bg-green-600 text-white font-medium hover:opacity-95"
                href="https://web.whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Abrir WhatsApp Web
              </a>

              <a
                className="inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 border border-slate-200 bg-white hover:bg-slate-50"
                href="https://www.whatsapp.com/download"
                target="_blank"
                rel="noopener noreferrer"
              >
                Baixar WhatsApp Desktop
              </a>

              <button
                onClick={() => setShowGuide((v) => !v)}
                className="inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 border border-slate-200 bg-white hover:bg-slate-50"
              >
                Guia: Espelhar celular / alternativas
              </button>
            </div>
          </section>

          <section className="p-4 rounded-xl border border-slate-100 bg-white">
            <h2 className="font-semibold">Solicitar liberação ao TI</h2>
            <p className="text-sm text-slate-500 mt-2">Use o modelo abaixo — copie ou abra seu cliente de e-mail com o texto pronto.</p>

            <div className="mt-3 flex flex-col gap-2">
              <textarea
                readOnly
                value={emailTemplate}
                className="w-full h-36 p-3 rounded-md border border-slate-100 text-sm bg-slate-50 resize-none"
              />

              <div className="flex gap-2">
                <button
                  onClick={copyTemplate}
                  className="rounded-md px-3 py-2 bg-sky-600 text-white font-medium hover:opacity-95"
                >
                  {copied ? "Copiado!" : "Copiar modelo"}
                </button>

                <button
                  onClick={openMailto}
                  className="rounded-md px-3 py-2 border border-slate-200 bg-white hover:bg-slate-50"
                >
                  Abrir no e-mail
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}