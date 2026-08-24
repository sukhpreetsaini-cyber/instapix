import { useState } from 'react';
import { Mail, AlertCircle } from 'lucide-react';
import { AuthLayout } from '../components/AuthLayout';

interface Props {
  onNavigate: (page: string) => void;
  onClose?: () => void;
}

const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export function ForgotPasswordPage({ onNavigate, onClose }: Props) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) setError('Informe seu e-mail.');
    else if (!isValidEmail(email)) setError('Informe um e-mail válido.');
    else {
      setError(undefined);
      setSent(true);
    }
  };

  return (
    <AuthLayout onGoHome={() => onNavigate('home')} onClose={onClose}>
      <div className="px-6 sm:px-8 py-8">
        <h1 className="text-[#58B0B1] font-extrabold text-2xl mb-6">Esqueceu sua senha?</h1>

        {sent ? (
          <div className="text-center py-4">
            <div className="w-14 h-14 rounded-full bg-[#58B0B1]/10 border border-[#58B0B1]/30 flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-[#58B0B1]" />
            </div>
            <p className="text-black text-sm mb-1">Link enviado!</p>
            <p className="text-gray-600 text-xs mb-6">
              Verifique sua caixa de entrada em <span className="text-black">{email}</span> para redefinir sua senha.
            </p>
            <button
              onClick={() => onNavigate('login')}
              className="text-[#58B0B1] text-xs hover:text-[#404040] transition-colors"
            >
              « Voltar ao Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label className="text-gray-600 text-xs font-semibold uppercase tracking-wide mb-2 block">E-mail</label>
              <input
                type="email"
                placeholder="seuemail@example.com"
                value={email}
                onChange={e => { setEmail(e.target.value); if (error) setError(undefined); }}
                className={`w-full bg-white border rounded-xl px-4 py-3 text-black text-sm focus:outline-none transition-colors placeholder-black/30 ${
                  error ? 'border-red-500 focus:border-red-500' : 'border-black/10 focus:border-[#58B0B1]'
                }`}
              />
              {error && (
                <p className="flex items-center gap-1.5 text-red-400 text-xs mt-1.5">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  {error}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() => onNavigate('login')}
              className="text-[#58B0B1] text-xs hover:text-[#404040] transition-colors"
            >
              « Voltar ao Login
            </button>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-bold text-white text-sm transition-opacity hover:opacity-90 bg-[#58B0B1]"
            >
              Continuar
            </button>
          </form>
        )}
      </div>
    </AuthLayout>
  );
}
