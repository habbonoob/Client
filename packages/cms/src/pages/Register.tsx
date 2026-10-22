import { useMutation } from '@tanstack/react-query';
import { type FormEvent, useState } from 'react';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router';
import { api, ApiError, type RegisterError } from '@/api';
import { useAccount, useSetAccount } from '@/session';
import { Button, Field, Notice, PasswordField, Pixel } from '@/ui';

type FieldName = 'username' | 'password' | 'email' | 'inviteCode';

/** What each refusal means, which field it belongs to, and what the summary calls that field. */
const explanations: Record<RegisterError, { field: FieldName; text: string }> = {
    invite_code: { field: 'inviteCode', text: "That invite code doesn't work. It may be mistyped or already used. Ask your friend for a fresh one." },
    name_too_short: { field: 'username', text: "That's a bit short. Use at least 3 characters." },
    name_too_long: { field: 'username', text: "That won't fit on the door sign. Keep it to 15 characters." },
    name_invalid: { field: 'username', text: 'Only letters, numbers and - = ? ! @ : . , _ please. No spaces.' },
    name_taken: { field: 'username', text: 'Someone already checked in with that name. Try another one.' },
    password: { field: 'password', text: 'Too easy to guess. Use at least 8 characters.' },
    email: { field: 'email', text: "That doesn't look like an email address. Check for a typo." },
};
const fieldNames: Record<FieldName, string> = { username: 'your username', password: 'your password', email: 'your email', inviteCode: 'the invite code' };

/** The characters a name may hold, as the server allows them. */
const nameCharacters = /^[a-zA-Z0-9\-=?!@:.,_]*$/;

/** What is wrong with a name before the server is asked, if anything. */
function nameProblem(name: string): RegisterError | undefined {
    if (!nameCharacters.test(name)) return 'name_invalid';
    if (name.length > 15) return 'name_too_long';
    return undefined;
}

/** Registering with an invite code. A link may carry the code (/register?code=…), so it needn't be typed. */
export function Register() {
    const account = useAccount();
    const setAccount = useSetAccount();
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const [form, setForm] = useState({ username: '', password: '', email: '', inviteCode: params.get('code') ?? '' });
    const [refused, setRefused] = useState<{ field: FieldName; text: string; value: string } | null>(null);
    const register = useMutation({
        mutationFn: () => api.register(form),
        onSuccess: me => {
            setAccount(me);
            navigate('/me');
        },
        onError: error => {
            const explained = error instanceof ApiError && error.error ? explanations[error.error as RegisterError] : undefined;
            setRefused(explained ? { ...explained, value: form[explained.field] } : null);
        },
    });

    if (account) return <Navigate to="/me" replace />;

    const set = (field: FieldName) => (e: { target: { value: string } }) => setForm({ ...form, [field]: e.target.value });
    // a refusal stands until its field changes
    const refusal = refused && form[refused.field] === refused.value ? refused : null;
    const typed = nameProblem(form.username);
    const errorFor = (field: FieldName) =>
        field === 'username' && typed ? explanations[typed].text : refusal?.field === field ? refusal.text : undefined;
    const submit = (e: FormEvent) => {
        e.preventDefault();
        register.mutate();
    };
    const unexplained = register.error && !(register.error instanceof ApiError && register.error.error && register.error.error in explanations);

    return (
        <main className="mx-auto flex w-full max-w-[1200px] flex-wrap items-stretch gap-8 px-4 pb-20 pt-12 sm:px-6">
            <aside className="flex min-w-0 flex-[1_1_420px] flex-col gap-5 overflow-hidden rounded-[28px] bg-plum px-9 pt-10 text-on-plum">
                <span className="lab !text-sun">Check-in desk</span>
                <h1 className="m-0 font-display text-[44px] leading-[48px] font-bold tracking-[-0.02em] text-cream">Got an invite? Come on in.</h1>
                <p className="m-0 max-w-[440px] text-[18px] text-[#E6D6E2]">
                    Pick a name, set a password and paste the code your friend sent you. Your room key is waiting.
                </p>
                <div className="flex flex-col gap-3 text-[15px] text-[#E6D6E2]">
                    <div className="flex items-center gap-3"><Pixel name="invite" width={32} height={30} />Each invite code works once.</div>
                    <div className="flex items-center gap-3"><Pixel name="profile" width={32} height={30} />
                        Your username is how friends find you, so pick one they'll recognise.</div>
                </div>
                <Pixel name="frank-greeting" width={261} height={160} className="mt-auto self-center" />
            </aside>
            <section aria-labelledby="reg-h"
                className="flex min-w-0 flex-[1_1_460px] flex-col gap-6 rounded-[28px] border border-line bg-surface p-6 shadow-lifted sm:p-10">
                <h2 id="reg-h" className="m-0 font-display text-[30px] leading-9 font-bold tracking-[-0.02em]">Create your account</h2>
                {refusal && (
                    <Notice title="One thing to fix before you check in:">
                        <a href={`#reg-${refusal.field}`} className="font-semibold text-ink">{fieldNames[refusal.field]}</a>
                    </Notice>
                )}
                {unexplained && <Notice title="Registering didn't work.">Try again in a moment.</Notice>}
                <form noValidate onSubmit={submit} className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(220px,100%),1fr))]">
                    <div id="reg-username">
                        <Field label="Username" autoComplete="username" value={form.username} onChange={set('username')} required
                            maxLength={30} error={errorFor('username')}
                            ok={form.username.length >= 3 && !errorFor('username') ? 'Looks good' : undefined}
                            hint="3 to 15 characters: letters, numbers and - = ? ! @ : . , _" />
                    </div>
                    <div id="reg-email">
                        <Field label="Email" optional type="email" autoComplete="email" value={form.email} onChange={set('email')}
                            error={errorFor('email')} hint="Only used to reset your password" />
                    </div>
                    <div id="reg-password" className="col-span-full">
                        <PasswordField label="Password" autoComplete="new-password" value={form.password} onChange={set('password')}
                            required strength error={errorFor('password')} hint="At least 8 characters" />
                    </div>
                    <div id="reg-inviteCode" className="col-span-full">
                        <Field label="Invite code" autoComplete="off" spellCheck={false} value={form.inviteCode} onChange={set('inviteCode')}
                            required error={errorFor('inviteCode')} className="mono text-[17px] uppercase tracking-[.06em]" />
                    </div>
                    <div className="col-span-full flex flex-wrap items-center justify-between gap-4 pt-1">
                        <span className="text-[15px] text-ink-2">Already have an account? <Link to="/" className="font-bold">Log in</Link></span>
                        <Button type="submit" busy={register.isPending} disabled={!!typed} className="min-h-[52px] px-7">
                            {register.isPending ? 'Checking you in…' : 'Create my account'}
                        </Button>
                    </div>
                </form>
            </section>
        </main>
    );
}
