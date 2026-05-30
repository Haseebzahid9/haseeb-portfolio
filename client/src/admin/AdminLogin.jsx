import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const RESEND_SECONDS = 60;

const inputStyle = (focused) => ({
  width: '100%',
  padding: '13px 16px 13px 42px',
  background: 'rgba(255,255,255,0.05)',
  border: `1px solid ${focused ? '#0dcaf0' : 'rgba(255,255,255,0.1)'}`,
  borderRadius: 8,
  color: '#fff',
  fontFamily: 'Open Sans, sans-serif',
  fontSize: '0.92rem',
  outline: 'none',
  transition: 'border-color 0.3s',
  boxSizing: 'border-box',
});

export default function AdminLogin() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [focused, setFocused] = useState('');
  const [resendTimer, setResendTimer] = useState(RESEND_SECONDS);
  const [resendLoading, setResendLoading] = useState(false);
  const otpRef = useRef(null);
  const timerRef = useRef(null);
  const { login, verifyOtp, resendOtp } = useAuth();
  const navigate = useNavigate();

  /* Auto-focus OTP input on step 2 */
  useEffect(() => {
    if (step === 2) {
      setTimeout(() => otpRef.current?.focus(), 100);
      startResendTimer();
    }
    return () => clearInterval(timerRef.current);
  }, [step]);

  /* Auto-submit when 6 digits entered */
  useEffect(() => {
    if (otp.length === 6 && step === 2) handleVerify();
  }, [otp]);

  const startResendTimer = () => {
    setResendTimer(RESEND_SECONDS);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setResendTimer(t => {
        if (t <= 1) { clearInterval(timerRef.current); return 0; }
        return t - 1;
      });
    }, 1000);
  };

  /* Step 1 — credentials */
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await login(email, password);
      if (data.step === 'otp_required') {
        setStep(2);
        toast.info('Verification code sent to your email');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  /* Step 2 — verify OTP */
  const handleVerify = async () => {
    if (otp.length !== 6) { setError('Enter the 6-digit code'); return; }
    setError('');
    setLoading(true);
    try {
      await verifyOtp(email, otp);
      toast.success('Welcome back, Haseeb!');
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid code');
      setOtp('');
      otpRef.current?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendLoading(true);
    setError('');
    try {
      await resendOtp(email);
      toast.success('New code sent!');
      startResendTimer();
      setOtp('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend');
    } finally {
      setResendLoading(false);
    }
  };

  const cardStyle = {
    background: '#1a1a2e',
    border: '1px solid #0dcaf0',
    borderRadius: 12,
    padding: '40px',
    width: '100%',
    maxWidth: 420,
    boxShadow: '0 16px 48px rgba(13,202,240,0.1)',
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0d1117',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      fontFamily: 'Poppins, sans-serif',
    }}>
      <div style={cardStyle}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{
            width: 56, height: 56, borderRadius: '50%',
            background: 'linear-gradient(135deg, #0dcaf0, #0891b2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 14px',
            boxShadow: '0 0 24px rgba(13,202,240,0.35)',
          }}>
            <i className={`fas fa-${step === 1 ? 'lock' : 'shield-alt'}`} style={{ color: '#fff', fontSize: '1.3rem' }} />
          </div>
          <h1 style={{ color: '#fff', fontWeight: 700, fontSize: '1.4rem', marginBottom: 4 }}>
            {step === 1 ? 'Admin Portal' : 'Check Your Email'}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem' }}>
            {step === 1 ? 'Haseeb Portfolio Management' : `Code sent to haseebzahid1370@gmail.com`}
          </p>
        </div>

        {/* ── STEP 1: Credentials ── */}
        {step === 1 && (
          <form onSubmit={handleLogin}>
            {/* Email */}
            <div style={{ position: 'relative', marginBottom: 16 }}>
              <i className="fas fa-envelope" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: focused === 'email' ? '#0dcaf0' : 'rgba(255,255,255,0.3)', fontSize: '0.85rem', transition: 'color 0.3s' }} />
              <input
                type="email"
                placeholder="University email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={inputStyle(focused === 'email')}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused('')}
                required
              />
            </div>

            {/* Password */}
            <div style={{ position: 'relative', marginBottom: 20 }}>
              <i className="fas fa-key" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: focused === 'pass' ? '#0dcaf0' : 'rgba(255,255,255,0.3)', fontSize: '0.85rem', transition: 'color 0.3s' }} />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={inputStyle(focused === 'pass')}
                onFocus={() => setFocused('pass')}
                onBlur={() => setFocused('')}
                required
              />
            </div>

            {error && <ErrorBox message={error} />}

            <button type="submit" disabled={loading} style={primaryBtn(loading)}>
              {loading ? <><i className="fas fa-spinner fa-spin" /> Signing in…</> : 'Login'}
            </button>
          </form>
        )}

        {/* ── STEP 2: OTP ── */}
        {step === 2 && (
          <div>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.85rem', textAlign: 'center', marginBottom: 22, lineHeight: 1.7 }}>
              Enter the <strong style={{ color: '#0dcaf0' }}>6-digit code</strong> from your email to complete login.
            </p>

            {/* OTP input */}
            <input
              ref={otpRef}
              type="text"
              inputMode="numeric"
              maxLength={6}
              placeholder="000000"
              value={otp}
              onChange={e => { setError(''); setOtp(e.target.value.replace(/\D/g, '').slice(0, 6)); }}
              style={{
                width: '100%',
                padding: '16px',
                background: 'rgba(255,255,255,0.05)',
                border: `2px solid ${error ? '#ef4444' : otp.length === 6 ? '#0dcaf0' : 'rgba(255,255,255,0.15)'}`,
                borderRadius: 10,
                color: '#fff',
                fontSize: '28px',
                fontWeight: 700,
                letterSpacing: '10px',
                textAlign: 'center',
                outline: 'none',
                transition: 'border-color 0.3s',
                boxSizing: 'border-box',
                marginBottom: 16,
                fontFamily: 'Poppins, monospace',
              }}
              onFocus={e => { if (!error) e.target.style.borderColor = '#0dcaf0'; }}
              onBlur={e => { if (!error && otp.length < 6) e.target.style.borderColor = 'rgba(255,255,255,0.15)'; }}
            />

            {error && <ErrorBox message={error} />}

            {/* Verify button */}
            <button onClick={handleVerify} disabled={loading || otp.length !== 6} style={primaryBtn(loading || otp.length !== 6)}>
              {loading ? <><i className="fas fa-spinner fa-spin" /> Verifying…</> : 'Verify Code'}
            </button>

            {/* Resend */}
            <div style={{ textAlign: 'center', marginTop: 18 }}>
              {resendTimer > 0 ? (
                <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.82rem' }}>
                  Resend in <strong style={{ color: 'rgba(255,255,255,0.5)' }}>{resendTimer}s</strong>
                </span>
              ) : (
                <button onClick={handleResend} disabled={resendLoading} style={{
                  background: 'none', border: 'none', color: '#0dcaf0',
                  cursor: 'pointer', fontSize: '0.85rem', fontFamily: 'Poppins',
                  fontWeight: 600, transition: 'opacity 0.3s',
                  opacity: resendLoading ? 0.5 : 1,
                }}>
                  {resendLoading ? 'Sending…' : 'Resend Code'}
                </button>
              )}
            </div>

            {/* Back */}
            <div style={{ textAlign: 'center', marginTop: 16 }}>
              <button onClick={() => { setStep(1); setOtp(''); setError(''); clearInterval(timerRef.current); }} style={{
                background: 'none', border: 'none', color: 'rgba(255,255,255,0.35)',
                cursor: 'pointer', fontSize: '0.8rem', fontFamily: 'Poppins',
                transition: 'color 0.3s',
              }}
                onMouseEnter={e => { e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.35)'; }}
              >
                ← Back to Login
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ErrorBox({ message }) {
  return (
    <div style={{
      background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
      borderRadius: 8, padding: '10px 14px', marginBottom: 16,
      color: '#fca5a5', fontSize: '0.83rem', display: 'flex', alignItems: 'center', gap: 8,
    }}>
      <i className="fas fa-exclamation-circle" style={{ flexShrink: 0 }} />
      {message}
    </div>
  );
}

function primaryBtn(disabled) {
  return {
    width: '100%', padding: '13px',
    background: disabled ? 'rgba(13,202,240,0.3)' : '#0dcaf0',
    border: 'none', borderRadius: 8,
    color: disabled ? 'rgba(0,0,0,0.4)' : '#000',
    fontFamily: 'Poppins', fontWeight: 700, fontSize: '0.95rem',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
  };
}
